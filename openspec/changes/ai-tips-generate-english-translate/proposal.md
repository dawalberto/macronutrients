## Why

The `GenerateTipsAI` button (SmolLM2-135M-Instruct) produces coherent output **only in English**. For `es`, `fr`, `zh`, `hi` the same model — prompted in those languages via locale-specific `ai_tips_system_prompt` / `ai_tips_user_prompt` strings — generates nonsensical tips because a 135M-parameter model is not strong enough to follow multilingual instructions. Users on non-English locales currently see garbage output, which is worse than no feature at all.

Rather than adopting a larger (and heavier) multilingual generator, we split the pipeline into two specialized models:

- **Generation** stays in English, always. One high-quality English prompt, one well-behaved English response.
- **Translation** is delegated to an M2M100 model whose entire purpose is multilingual seq2seq translation.

This keeps the generator small (good for mobile / WebGPU) while giving every non-English user a reliable translation of a correct English response.

## What Changes

- **BREAKING** — Remove `ai_tips_system_prompt` and `ai_tips_user_prompt` from every locale file (`en`, `es`, `fr`, `zh`, `hi`). The prompts move out of i18n and become English-only constants co-located with the worker.
- Add a second model to the AI worker: **`Xenova/m2m100_418M`** (a quantized M2M100 translation model), loaded alongside `HuggingFaceTB/SmolLM2-135M-Instruct`.
- The worker always runs a two-stage pipeline on `GENERATE_TIPS`:
  1. Generate the tips in English using SmolLM2 (unchanged inference config).
  2. If current `$locale !== 'en'`, translate the full English output with M2M100 (`src_lang: 'en'`, `tgt_lang: <locale>`) and emit the translated text.
- The `GenerateTips` button's download progress is synchronized across **both** models: the button stays disabled until both models have emitted their `STATUS` (ready) event; the progress bar shows the combined aggregate of file-level progress from both downloads.
- Quantization is enforced for "any device" compatibility: `dtype: 'q4'` on WebGPU and `dtype: 'q8'` on WASM for both models (mobile-safe).
- The `AIMenuModal` gains a brief "translating…" transition state between English streaming completion and the replacement of the content with the translated result (only for non-English locales).

## Capabilities

### New Capabilities

- `ai-tips-generation`: Two-stage English-generate-then-translate pipeline that produces locale-appropriate nutrition tips. Covers the worker protocol (messages in/out), the two-model loading + progress aggregation, and the translation fallthrough for English.

### Modified Capabilities

<!-- No pre-existing specs in openspec/specs/ — nothing to modify. -->

## Impact

- **Files created/modified**
  - `src/workers/ai-worker.ts` — add second pipeline (`translation` task with M2M100), add English prompt constants, orchestrate two-stage run, emit new message types.
  - `src/hooks/useAIWorker.ts` — track per-model readiness and per-model progress, aggregate into a single `downloadProgress`, only flip `available` once both models report STATUS, consume the locale for translation calls.
  - `src/types/ai.ts` — extend `AIWorkerInbound` / `AIWorkerOutbound` with the new events (`MODEL_READY`, `TRANSLATING`, `TRANSLATED`), and add per-model identification to `DOWNLOADING`.
  - `src/components/GenerateTipsAI.tsx` — remove `t.ai_tips_system_prompt` / `t.ai_tips_user_prompt` reads; pass only `goal` and current locale to `generate()`.
  - `src/components/AIMenuModal.tsx` — add a "translating…" transition state; swap streamed English for final translated text; keep `stripPreamble` for the English intermediate text.
  - `src/i18n/locales/{en,es,fr,zh,hi}.ts` — remove `ai_tips_system_prompt` and `ai_tips_user_prompt`; add `translating_tips` label for the modal transition.
  - `src/i18n/index.ts` + `Translations` type — picks up the removals/additions automatically via `typeof en`.

- **Dependencies**: no new npm packages. `@huggingface/transformers` already exposes the `translation` pipeline and loads `Xenova/m2m100_418M` from the Hub. The model is fetched at runtime (IndexedDB cached via `env.useBrowserCache = true`).

- **Bundle / download size**: first-visit cost increases for non-English users by the size of the quantized M2M100 (≈120–180 MB q4 / ≈240 MB q8). Cached after first load. English-locale users can optionally skip the translation model (see design).

- **Behavioral**: the AI modal output no longer streams token-by-token for non-English locales — English streams in, then is replaced by the translated block once translation finishes. English-locale UX is unchanged.

- **Risk**: M2M100 download failure on slow connections or OOM on very low-end mobile WASM devices — mitigated by q8 fallback and an `available: false` path if either model errors.
