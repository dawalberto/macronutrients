## ADDED Requirements

### Requirement: In-browser tip generation

The system SHALL generate exactly 5 nutrition and fitness tips on-device, using a client-side LLM loaded via `@huggingface/transformers` in a Web Worker, with no network calls to any inference backend after the model weights are cached.

#### Scenario: First-time load caches model weights
- **WHEN** the `GenerateTipsAI` component mounts for the first time on a device with network access
- **THEN** the worker SHALL download the selected ONNX model once and store it in the browser Cache API (`env.useBrowserCache = true`), and subsequent reloads SHALL reuse the cached model without re-downloading.

#### Scenario: No backend calls during generation
- **WHEN** the user clicks the tips button after the model is loaded
- **THEN** all token generation SHALL happen inside the Web Worker and no HTTP request SHALL be made for inference.

---

### Requirement: Universal device support

The system SHALL expose the tips-generation UI on every device category (desktop and mobile, WebGPU and WASM), selecting a single smallest-available HF ONNX model that fits the memory budget of mobile browsers.

#### Scenario: Button visible on mobile
- **WHEN** a user opens the app on a mobile browser (`navigator.maxTouchPoints > 0`)
- **THEN** the tips button SHALL be rendered (once the model finishes or starts downloading), and SHALL NOT be hidden by a mobile-only `available = false` branch.

#### Scenario: Button visible on desktop
- **WHEN** a user opens the app on a desktop browser
- **THEN** the tips button SHALL be rendered with the same behavior as on mobile.

#### Scenario: WebGPU preferred, WASM fallback
- **WHEN** the worker initializes
- **THEN** it SHALL call `navigator.gpu.requestAdapter()` and use `device: 'webgpu'` if an adapter is returned, otherwise it SHALL fall back to `device: 'wasm'`. Quantization SHALL be `q4` on both paths (no `q4f16`, which requires WebGPU and is not needed for a 135M model).

---

### Requirement: Single minimal model

The worker SHALL load a single, smallest-available HuggingFace ONNX instruction-tuned model (target: `onnx-community/SmolLM2-135M-Instruct`; substitute a smaller community ONNX mirror only if one exists at implementation time).

#### Scenario: No two-model split
- **WHEN** the worker selects a model
- **THEN** there SHALL be no `full`/`lite` branching and no `deviceMemory`-based throw; exactly one model ID is used for all devices.

#### Scenario: Bounded token budget
- **WHEN** the worker calls `pipe(messages, { max_new_tokens })`
- **THEN** `max_new_tokens` SHALL be set to 256 or less, sufficient for 5 short Markdown list items.

---

### Requirement: Goal-only prompt

The system SHALL build prompts using only the user's current `goal` (`Maintain | Surplus | Definition`) and active locale. No other user attributes (age, weight, height, genre, LBM, BMR, exercise multiplier, kcal, macros) SHALL be included in the system or user prompt.

#### Scenario: Prompt excludes bio and macros
- **WHEN** `GenerateTipsAI` constructs the messages before calling `generate()`
- **THEN** the resulting system and user strings SHALL NOT contain the numeric weight, height, age, kcal, protein, carb, or fat values, nor the genre or exercise-multiplier label.

#### Scenario: System prompt establishes nutritionist role
- **WHEN** the worker receives the generation request
- **THEN** the system prompt SHALL instruct the model to act as an expert nutritionist and to respond with exactly 5 concise tips in Markdown, in the user's language, and SHALL NOT ask clarifying questions.

#### Scenario: User prompt conveys goal only
- **WHEN** the user's goal is `Maintain`, `Surplus`, or `Definition`
- **THEN** the user prompt SHALL name the goal (localized) and request 5 tips tailored to that goal, and SHALL contain no other variables.

---

### Requirement: Localized output

The generated tips SHALL be rendered in the user's currently-selected locale (`en | es | fr | hi | zh`).

#### Scenario: Locale drives prompt text
- **WHEN** the active locale atom `$locale` is set to value `L`
- **THEN** the system and user prompts passed to the worker SHALL be the `ai_tips_system_prompt` and `ai_tips_user_prompt(goal)` of locale `L`.

#### Scenario: Each locale has the prompt pair
- **WHEN** the implementation is complete
- **THEN** all 5 locale modules (`en.ts`, `es.ts`, `fr.ts`, `hi.ts`, `zh.ts`) SHALL export `ai_tips_system_prompt: string` and `ai_tips_user_prompt: (goal: Goal) => string`.

---

### Requirement: Streamed Markdown rendering

The tips output SHALL stream token-by-token into the existing modal and be rendered as Markdown via `streamdown`.

#### Scenario: Tokens stream live
- **WHEN** the worker emits `AIWorkerOutbound.TOKEN` messages
- **THEN** the modal SHALL append them to `streamedText` and render the partial text with `<Streamdown mode="streaming" isAnimating>`.

#### Scenario: Completion switches rendering mode
- **WHEN** the worker emits `AIWorkerOutbound.DONE`
- **THEN** `generating` SHALL become `false` and `<Streamdown>` SHALL switch to `mode="static"`.

#### Scenario: Output format is a Markdown list of 5 items
- **WHEN** generation completes successfully
- **THEN** the streamed Markdown SHALL be 5 list items (bulleted or numbered) each representing one tip, with no unrelated preamble required beyond what the system prompt allows.

---

### Requirement: Component naming

The UI component SHALL be exported as `GenerateTipsAI` from `src/components/GenerateTipsAI.tsx` and replace all usages of the prior `InterpretResults` component.

#### Scenario: File and symbol renamed
- **WHEN** the codebase is searched for the symbol `InterpretResults`
- **THEN** no matches SHALL remain in `src/`, and `src/components/GenerateTipsAI.tsx` SHALL exist exporting `export const GenerateTipsAI = () => { ... }`.

#### Scenario: Page mounts the renamed component
- **WHEN** `src/pages/index.astro` is inspected
- **THEN** it SHALL import and render `GenerateTipsAI` in the location previously occupied by `InterpretResults`.

---

### Requirement: Worker message protocol

The worker inbound enum SHALL use `AIWorkerInbound.GENERATE_TIPS` for the generation request; the outbound protocol (`STATUS`, `DOWNLOADING`, `TOKEN`, `DONE`, `ERROR`) SHALL remain unchanged.

#### Scenario: Inbound rename
- **WHEN** `src/types/ai.ts` is inspected
- **THEN** `AIWorkerInbound.GENERATE_TIPS` SHALL exist and `AIWorkerInbound.GENERATE_MENU` SHALL NOT exist; the `AIInboundMessage` union SHALL use the new name.

#### Scenario: Hook posts the new message
- **WHEN** `useAIWorker.generate(systemPrompt, userPrompt)` is called
- **THEN** the hook SHALL `postMessage` with `{ type: AIWorkerInbound.GENERATE_TIPS, prompt, systemPrompt }`.
