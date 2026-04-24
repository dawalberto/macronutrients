## Context

MacroCalc currently ships a client-side LLM feature (`InterpretResults`) that:

- Loads one of two ONNX models: `onnx-community/Qwen2.5-0.5B-Instruct` (desktop, ≥4GB) or `onnx-community/SmolLM2-135M-Instruct` (mobile / low-mem desktop).
- Is hard-gated off on mobile by `isMobileDevice()` in `src/hooks/useAIWorker.ts` (sets `available: false` before even spawning the worker).
- Builds a dense per-user prompt (bio + TDEE + macros + kcal diff) in `InterpretResults.tsx` via `ai_interpret_system_prompt` / `ai_interpret_user_prompt(...)` in each locale.
- Streams tokens into `AIMenuModal` which renders Markdown with `streamdown`.

The feature works on desktop but is invisible on mobile (the intended broad audience of a free macro calculator), and even on desktop the interpretation is produced by a 0.5B-parameter model whose reliability on a numerically-dense prompt is marginal. Memory (see `feedback_webgpu_prompt_size.md`) has already warned that >~500-token prompts can OOM transformers.js on WebGPU.

A known memory record (`project_ai_feature.md`, 19 days old) references a `GenerateMenu.tsx` component, but the live codebase has `InterpretResults.tsx`. The current rename (`InterpretResults` → `GenerateTipsAI`) reflects the actual filename on `feat/ia`.

## Goals / Non-Goals

**Goals:**

- Make the AI button appear and function on every device class (mobile included).
- Shrink the prompt to a handful of tokens so any 135M-class model can handle it.
- Use a single model for all users — eliminate the desktop/mobile bifurcation.
- Produce a fixed-format output (5 Markdown list items, localized) suitable for the existing `Streamdown` renderer.
- Preserve the existing streaming UX (download progress fill, streamed tokens, dismissible modal).

**Non-Goals:**

- Introducing server-side inference, telemetry, or any backend service.
- Changing macro-calculation logic, the user-attributes store, charts, routing, SEO, or any other non-AI module.
- Supporting additional locales beyond the existing 5 (`en`, `zh`, `hi`, `es`, `fr`).
- Guaranteeing perfect Markdown adherence from a 135M model — we accept best-effort and rely on `Streamdown` to render whatever comes out.
- Adding telemetry, analytics, A/B flags, or model-selection settings surfaced in the UI.

## Decisions

### Decision 1 — Use `onnx-community/SmolLM2-135M-Instruct` as the single model

- **Rationale:** It is the smallest instruction-tuned ONNX model already used in the codebase (as the mobile fallback), has a community ONNX mirror under `onnx-community`, and empirically fits under mobile-WebGPU/WASM memory limits at q4. Dropping the Qwen 0.5B full model removes the selection branch entirely and avoids the ~3x download size.
- **Alternatives considered:**
  - _Keep Qwen2.5-0.5B-Instruct on desktop only_: rejected — the whole point is universal device support and a shared prompt contract; a two-model code path is the thing we want to remove.
  - _Try an even smaller model (e.g. TinyLlama 1.1B is not smaller; distilled SmolLM variants exist but may not have ONNX community mirrors)_: the task allows substituting a smaller community ONNX mirror only if one is published at implementation time; otherwise stick with SmolLM2-135M.
- **Dtype:** `q4` on both WebGPU and WASM. We deliberately drop `q4f16`: it requires WebGPU and is unnecessary for a 135M model where q4 is already small, and keeping one dtype means one code path.

### Decision 2 — Goal-only prompt, no user bio or macros

- **Rationale:** A 135M model cannot reliably reason over numeric TDEE/macro data. Constraining input to a single categorical variable (goal) collapses the task to "produce 5 tips for goal X in language Y" — which small models handle well. This also satisfies the product requirement (generic nutritionist tips).
- **Alternatives considered:**
  - _Include weight/age/etc. as context_: rejected — reopens the reliability issue the move is meant to solve.
  - _Include the goal's kcal delta (+300 / −300 / 0)_: rejected for v1 — adds a number the model may or may not interpret correctly; revisit only if tips feel generic in practice.

### Decision 3 — Component rename, not a new sibling

- **Rationale:** The feature is being re-scoped, not dual-shipped. Keeping `InterpretResults.tsx` alongside a new `GenerateTipsAI.tsx` would create dead code. The task brief explicitly requests a rename.
- **Alternatives considered:**
  - _Feature flag between the two_: rejected — violates CLAUDE.md / repo preference for no feature flags or backwards-compat shims; adds complexity with no user benefit.

### Decision 4 — Rename `GENERATE_MENU` → `GENERATE_TIPS` in the worker enum

- **Rationale:** The inbound message type is part of the worker contract; leaving it as `GENERATE_MENU` is a stale name from a prior product direction. Renaming clarifies intent and keeps grep results accurate.
- **Alternatives considered:**
  - _Leave enum name as-is_: rejected — repo preference (CLAUDE.md) is against leaving misleading names for backwards-compat when nothing external depends on them.

### Decision 5 — Worker imports stay relative

- **Rationale:** `feedback_worker_imports.md` documents that path aliases (`@utils`, `src/types`) fail in Vite worker bundles. The current worker uses `'../types'` — this change keeps that convention. Any new imports added to `ai-worker.ts` (e.g. a shared prompt builder, if we introduce one) MUST use relative paths. In practice we keep the worker self-contained and let the component build the prompt strings from i18n on the main thread.

### Decision 6 — Button loading copy and labels

- Add i18n keys: `generate_tips` (button idle), `generating_tips` (button busy), `ai_tips_title` (modal header). Keep `loading_ai(pct)` and `ai_streaming` (still accurate). Remove `interpret_results`, `interpreting`, `ai_interpretation`, `ai_interpreting`, `ai_unavailable_mobile`, `ai_interpret_system_prompt`, `ai_interpret_user_prompt` from every locale and from the `Translations` type (which is derived from `en.ts` so it updates automatically).

## Risks / Trade-offs

- **[Risk] Mobile-WASM inference may still be slow (>30s first token).** The model is cached on the first run but inference itself is CPU-bound on WASM. → **Mitigation:** the existing modal already shows a pulsing "interpreting..." indicator, which is now `ai_tips_title` + "streaming…". No UX change needed; if latency is unacceptable in practice, revisit by reducing `max_new_tokens` further (e.g. 200) or switching to an even smaller community mirror.
- **[Risk] 135M model may ignore the "exactly 5 tips" instruction and produce 3 or 7.** → **Mitigation:** prompt phrases the constraint strongly ("Respond with exactly 5 short Markdown list items, nothing else."). `Streamdown` renders whatever it gets; content slightly off-spec is acceptable.
- **[Risk] Model may drift off-language** (e.g. output English for `hi` locale) because a 135M model's multilingual fidelity is limited. → **Mitigation:** the system prompt for each locale is authored _in that locale_ (not "respond in Hindi" written in English), which empirically biases output strongly toward that locale. If drift is severe for `hi` or `zh`, document it; do not fix by adding a backend.
- **[Risk] The inbound-enum rename could break a lingering reference if searched incompletely.** → **Mitigation:** grep `GENERATE_MENU` before merging; fail loudly if anything still imports it.
- **[Risk] Removing `isMobileDevice()` could cause OOM on very low-memory Android devices.** → **Mitigation:** accepted trade-off — the product decision is "AI on every device." The worker still throws if `deviceMemory` is reported and insufficient; we keep (but simplify) the throw as the last line of defense, though for a 135M model the threshold is irrelevant in practice and can be removed.
- **[Trade-off] Dropping `deviceMemory`-based model selection removes a safety net but simplifies the code substantially.** Net positive given the single small model.

## Migration Plan

1. Implement changes on a branch off `feat/ia` (current branch).
2. No data migration — the feature is client-only and has no persisted state.
3. Browser-cached model weights from the old `Qwen2.5-0.5B` will remain in the Cache API for users who had it; this is harmless (just stale bytes). They will not be fetched again because the new code never references that model ID. Users can manually clear site data if they want to reclaim space; we do not add code to evict it.
4. Rollback = revert the PR. No infrastructure changes.

## Open Questions

- None that block implementation. If product later wants a "tip-tone" slider (beginner vs. advanced) or a "regenerate" button, those are separate follow-ups.
