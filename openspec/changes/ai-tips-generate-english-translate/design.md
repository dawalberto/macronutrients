## Context

Today, `src/workers/ai-worker.ts` loads a single `text-generation` pipeline (`HuggingFaceTB/SmolLM2-135M-Instruct`, `dtype: q4`) and streams tokens back via `TextStreamer`. The React hook `src/hooks/useAIWorker.ts` tracks one global aggregated `downloadProgress` (averaged across all files emitted via `progress_callback`) and flips `available: true` on the first `STATUS` message. The UI (`GenerateTipsAI.tsx`) pulls the system/user prompt from the active locale file and calls `generate()`; the `AIMenuModal` renders the streamed English markdown.

SmolLM2-135M is strong enough for English nutrition instructions but collapses under non-English prompts. The correct fix is architectural, not prompt-engineering: do inference in the language the model was trained on, then delegate translation to a dedicated model.

Constraints:

- Must run entirely in-browser (no server). The app is a static GitHub Pages build.
- Must work on mobile — implies quantized models (q4/q8) and WASM fallback.
- Worker bundle cannot use `@`-path aliases ([feedback: worker imports fail with path aliases](../../../memory already documents this)) — use relative imports.
- Reactive locale is a nanostores atom (`$locale` from `@store/locale`), already consumed in `useTranslations`.
- `transformers.js` prompts must stay small on WebGPU to avoid ORT OOM (existing constraint, already respected by current prompt length).

## Goals / Non-Goals

**Goals:**

- Every supported locale (`en`, `es`, `fr`, `zh`, `hi`) returns coherent, correctly formatted nutrition tips.
- The AI generator prompt (system + user) is defined exactly once, in English, co-located with the worker. Locale files no longer contain AI prompts.
- The `GenerateTips` button's loading UX reflects the **combined** readiness of the two models: disabled until both are ready, progress bar is the weighted aggregate of both downloads.
- Quantization is explicit and device-aware (`q4` on WebGPU, `q8` on WASM) for both models, so mobile clients can load them.
- Translation is skipped entirely when `$locale === 'en'` (no wasted work, but the M2M100 model is still preloaded so UX stays identical if the user switches locale mid-session).

**Non-Goals:**

- Token-by-token streaming of translated output. M2M100 is seq2seq; we translate the full English text once streaming ends, then swap the modal content. (Per-line translation is considered and rejected below.)
- Swapping SmolLM2 for a bigger multilingual generator.
- Adding new locales. The locale set stays `en | zh | hi | es | fr`.
- Server-side inference or a paid API fallback.
- Re-translation on locale change _after_ a tip has been generated — the result is tied to the locale active at generation time.

## Decisions

### D1. Translation model: `Xenova/m2m100_418M`

**Choice**: Use `Xenova/m2m100_418M` via the `translation` pipeline.

**Why**: It is the smallest M2M100 variant (418M params), all five target languages (`en`, `es`, `fr`, `zh`, `hi`) are among its 100 supported languages, it has an ONNX port on HuggingFace Hub (`Xenova/*` repos are transformers.js-ready), and the `translation` task handles `src_lang` / `tgt_lang` natively.

**Alternatives rejected**:

- `facebook/nllb-200-distilled-600M` (NLLB) — broader language coverage but larger and uses BCP-47-style codes (`spa_Latn`, `zho_Hans`) that complicate our `Locale` type mapping.
- Per-locale MarianMT models — would require loading a different model per locale and re-downloading on locale switch. Breaks the "one model, many targets" simplicity.
- Larger SmolLM / Qwen multilingual generator — doubles generator size and still weaker than a dedicated translator.

### D2. Two-stage pipeline in the worker, not the hook

**Choice**: The worker owns orchestration. `GENERATE_TIPS` triggers: English generation (streamed) → on `DONE`, translate full buffer → emit `TRANSLATED { text }`.

**Why**: Keeps the React hook thin and single-threaded-free. All heavy inference stays off the main thread. The hook only multiplexes incoming events into state.

**Alternatives rejected**: translating in the hook after the worker finishes generation would require loading another transformers.js pipeline on the main thread, blocking React renders.

### D3. Locale codes mapped at the worker boundary

**Choice**: The worker accepts a `Locale` (`'en' | 'es' | 'fr' | 'zh' | 'hi'`) on `GENERATE_TIPS`. Internally it maps to M2M100 codes: `en→en, es→es, fr→fr, zh→zh, hi→hi`. For this locale set the mapping is the identity.

**Why**: Simple today, future-proof — if a new locale is added whose M2M100 code differs, only the worker's `LOCALE_TO_M2M100` map changes.

### D4. English is the authoritative generation language; no translation if `locale === 'en'`

**Choice**: When the inbound `GENERATE_TIPS` locale is `en`, the worker emits tokens via streamer as today, sends `DONE`, and skips M2M100 entirely. When locale is non-English, the worker still streams English tokens (the modal will show English briefly), then on generation-end: emits `TRANSLATING`, runs `translator(text, { src_lang: 'en', tgt_lang })`, emits `TRANSLATED { text }`, then `DONE`.

**Why**: English users get the best UX (streaming), non-English users get correct results with a short post-stream "translating…" beat. Emitting the English stream into the modal for non-English users is acceptable because the modal will replace it — and if the translator errored, they still see _something_.

**Alternatives rejected**:

- **Hide English stream from non-English users and only show translated output**: forces them to wait the full generation+translation time with no feedback. Worse UX than showing the English stream first.
- **Translate per-line as lines complete**: gives pseudo-streaming in the target language, but each of the 5 tips is a small sequence that translates poorly without surrounding context (M2M100 benefits from whole-paragraph context). Also 5× the inference calls.

### D5. Preload both models on mount; do not defer M2M100

**Choice**: On `CHECK_AVAILABILITY`, the worker loads _both_ pipelines in parallel and only emits one `STATUS` message once both resolve. `DOWNLOADING` events carry a new `model: 'generator' | 'translator'` field.

**Why**: Satisfies the requirement that the button stays disabled until both are ready and that the progress bar tracks both. Parallel loading also minimizes wall-clock wait.

**Alternatives rejected**:

- **Lazy-load M2M100 only when a non-English locale is active at click time**: breaks the "single, synchronized progress" requirement in the proposal. Also causes a second long wait on first non-English click.
- **Lazy-load M2M100 only on locale change**: same problem.

### D6. Aggregating progress across two models

**Choice**: The hook keeps `fileProgressRef: Map<string, number>` (already present). We widen the key from `file` to `${model}:${file}` so files from the two models don't collide, and we keep the simple unweighted average across all seen files.

**Why**: Unweighted averaging is acceptable because transformers.js emits files roughly at the granularity of weight shards, and both models have several shards — the aggregate is smooth. Byte-weighted averaging would require knowing total bytes up front, which `progress_callback` does not give us cleanly.

**Trade-off**: Progress can briefly appear to regress as new files start at 0%. This already happens today; no user-visible regression.

### D7. Quantization strategy: q4 on WebGPU, q8 on WASM

**Choice**: Both pipelines are loaded with `dtype: device === 'webgpu' ? 'q4' : 'q8'`.

**Why**: WebGPU has the bandwidth and precision to handle q4 cleanly. On WASM (mobile fallback), q4 ORT kernels are slower and more error-prone than q8; q8 still halves the download vs fp32 and is robust. M2M100 at q4 on WebGPU is ~120 MB, at q8 on WASM ~240 MB.

### D8. Prompts live as English constants in the worker module

**Choice**: Add `GEN_SYSTEM_PROMPT` and `genUserPrompt(goal)` as module-level constants in `src/workers/ai-worker.ts`. Remove `ai_tips_system_prompt` and `ai_tips_user_prompt` from every locale file.

**Why**: The prompts are an implementation detail of the generator, not user-facing copy. Keeping them in locale files caused this whole bug. Single source of truth.

### D9. Modal states: streaming → translating → done

**Choice**: `AIMenuModal` renders the English `streamedText` while `generating` is true. When the worker emits `TRANSLATING`, modal shows a small "translating…" pill (new i18n key `translating_tips`). When `TRANSLATED { text }` arrives, modal replaces its content with the translated text (no `stripPreamble` needed — M2M100 won't emit preambles; but keep `stripPreamble` on the English intermediate stream because SmolLM2 still can).

**Why**: Preserves the existing streaming feel, makes the translation step legible instead of a mysterious hang.

### D10. Locale flow into the worker

**Choice**: `useAIWorker.generate()` gains a `locale: Locale` argument. `GenerateTipsAI` reads `$locale` via `useStore` and passes it through. The worker's `GENERATE_TIPS` inbound message carries `locale`.

**Why**: The locale at generation time is the contract. Reading locale inside the worker would require cross-thread atom sync.

## Risks / Trade-offs

- **[M2M100 download size on cellular]** → First non-English session is a one-time ~120–240 MB download. Mitigation: `env.useBrowserCache = true` already caches to IndexedDB; `dtype: 'q8'` on WASM keeps the floor at ~240 MB.

- **[Either model fails to load on very constrained devices]** → The feature becomes unusable. Mitigation: if `pipeline()` throws for either model, the worker emits `ERROR`; the hook sets `available: false`; the button hides (existing behavior in `GenerateTipsAI` — `if (available === false) return null`). Users get the current "no AI" state, not a broken one.

- **[Translated text loses the numbered-list formatting]** → M2M100 preserves inline tokens including digits and punctuation well, but line breaks can shift. Mitigation: translate the full multi-line English text as a single call (M2M100 handles `\n`); if breaks are lost, downstream Streamdown/markdown still renders the numbered list because "1.", "2." survive. Accept as low risk.

- **[English stream appears briefly for non-English users before being replaced]** → Considered a feature (immediate feedback), not a bug. The `TRANSLATING` state masks it cognitively.

- **[q4 M2M100 output quality on WebGPU]** → Q4 is aggressive; translation quality for short lists is still fine in spot checks but could occasionally produce odd phrasing. Accept.

- **[Progress aggregation jitter]** → As new shard files start at 0% mid-download, the aggregate can dip. Existing behavior; low-severity.

## Migration Plan

This is a client-side-only change to a static app. No data migration, no server coordination.

1. Ship the worker + hook + modal + locale file changes together in one PR. Partial states (new worker with old hook) are broken — deploy atomically.
2. Users with cached SmolLM2 weights keep them (same model ID). M2M100 is a fresh download on first load after deploy.
3. Rollback: revert the PR. The old single-model worker and the locale prompts come back; the cached M2M100 weights remain in IndexedDB but are harmless.

## Open Questions

- Should we expose a "download both models now" toggle in an Advanced Settings panel for users on metered connections who don't want automatic download? **Proposed answer: no, not in scope for this change.** The button is already gated by `available`, so a user can dismiss the page before it loads. Revisit only if we get complaints.
- Should we log translation failures somewhere so we can tune? **Proposed answer: no. Pure client-side; would need telemetry we don't have.** Ship, monitor issues via GitHub.
