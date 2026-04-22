## Why

The existing "Interpret Results" AI feature is disabled on mobile (DESKTOP ONLY) because the smallest model currently loaded (`SmolLM2-135M-Instruct` at q4) still OOMs on mobile WebGPU/WASM and the interpretation task requires feeding a long, structured prompt (goal, macros, kcal math, user bio) which mid-size models cannot reliably handle client-side. The result is an AI button most users never see.

We want to re-enable the feature on **every device** by radically shrinking both the model and the task: instead of interpreting personalized caloric data, the LLM will produce 5 generic nutrition/fitness tips driven only by the current goal (Maintain / Surplus / Definition) and the user's language. This fits in the memory/compute budget of the smallest viable HF model and removes the need for a detailed prompt.

## What Changes

- **BREAKING**: Rename component `InterpretResults.tsx` → `GenerateTipsAI.tsx`. Rename the exported React component `InterpretResults` → `GenerateTipsAI`. Update all imports in `src/pages/index.astro` (and anywhere else it is mounted).
- **BREAKING**: Remove i18n keys `ai_interpret_system_prompt`, `ai_interpret_user_prompt`, `interpret_results`, `interpreting`, `ai_interpretation`, `ai_interpreting`, `ai_unavailable_mobile` from all 5 locale files (`en.ts`, `es.ts`, `fr.ts`, `hi.ts`, `zh.ts`) and from the `Translations` type (derived from `en.ts`).
- **BREAKING**: Change the worker message contract: rename `AIWorkerInbound.GENERATE_MENU` → `AIWorkerInbound.GENERATE_TIPS` in `src/types/ai.ts` and update all producers/consumers. (If a separate "menu" code path exists elsewhere, this change must audit it — see Impact.)
- Replace the prompt system: new i18n keys `ai_tips_system_prompt` (static string per locale) and `ai_tips_user_prompt(goal: Goal)` (returns the short goal-only user message). No user bio, weight, height, age, macros, or kcal values are passed to the model.
- Swap the model selection in `src/workers/ai-worker.ts` to a single, smallest-available HF model that runs on any device (target: `onnx-community/SmolLM2-135M-Instruct`; fall back to the community mirror if a newer/smaller variant is not ONNX-published). Remove the `full`/`lite` two-model split and the `selectModel()` memory gating throw. Lower `max_new_tokens` to a value sufficient for 5 short tips (~256).
- Re-enable the button on mobile: remove the `isMobileDevice()` early-return in `src/hooks/useAIWorker.ts` that sets `available: false`.
- The modal (`AIMenuModal.tsx`) keeps its streaming markdown rendering but its header label switches from "AI INTERPRETATION" to a new "AI TIPS" label (new i18n key `ai_tips_title`). Streamdown output is expected to be Markdown (bulleted/numbered list of 5 tips).

## Capabilities

### New Capabilities
- `ai-tips-generation`: In-browser generation of 5 goal-based nutrition & fitness tips, streamed as Markdown in the user's locale, running on any device via the smallest viable ONNX-quantized LLM.

### Modified Capabilities
<!-- None. No existing `openspec/specs/` capability covers the prior interpret-results behavior, so this is a clean new capability that fully supersedes the removed InterpretResults component. -->

## Impact

- **Code (removed / renamed)**:
  - `src/components/InterpretResults.tsx` → renamed to `src/components/GenerateTipsAI.tsx` with simplified prompt-building logic.
  - `src/pages/index.astro` — update the import/mount.
  - `src/workers/ai-worker.ts` — remove `MODELS.full`, desktop/mobile branching, and the memory-insufficient throw; use one model + `maxNewTokens: 256`.
  - `src/hooks/useAIWorker.ts` — delete the `isMobileDevice()` mobile-disable branch.
  - `src/types/ai.ts` — rename `GENERATE_MENU` → `GENERATE_TIPS` in `AIWorkerInbound` enum and in the `AIInboundMessage` union; keep outbound protocol unchanged.
- **i18n**: all 5 locales (`en.ts`, `es.ts`, `fr.ts`, `hi.ts`, `zh.ts`) get the old keys replaced by `ai_tips_system_prompt`, `ai_tips_user_prompt`, `ai_tips_title`, `generate_tips`, `generating_tips`, `loading_ai` (kept), `ai_streaming` (kept).
- **Dependencies**: no new npm dependencies. `@huggingface/transformers` and `streamdown` continue to power inference and rendering. Model is downloaded once and cached via browser Cache API (`env.useBrowserCache = true`) — behavior unchanged.
- **UX**: mobile users now see the button. Generation time should drop (shorter prompt, 135M model, 256 tokens). First-load download size drops (no 0.5B fallback model).
- **Not impacted**: macro calculation (`@utils/macro-functions`), the user-attributes store, charting, routing, SEO, and the `Streamdown`/`.ai-content` styling.
- **Out of scope**: adjustments to the Info page, new goal types, telemetry, or any server-side inference path. All inference stays client-side.
