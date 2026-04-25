## ADDED Requirements

### Requirement: Two-model AI worker preloads generator and translator

The AI worker SHALL load two `@huggingface/transformers` pipelines on `CHECK_AVAILABILITY`:

- A `text-generation` pipeline for `HuggingFaceTB/SmolLM2-135M-Instruct` (the generator).
- A `translation` pipeline for `Xenova/m2m100_418M` (the translator).

Both pipelines MUST be loaded in parallel. The worker MUST emit a single `STATUS` message only after both pipelines have resolved. If either pipeline fails to load, the worker MUST emit `ERROR` and MUST NOT emit `STATUS`.

#### Scenario: Both models load successfully

- **WHEN** the hook sends `CHECK_AVAILABILITY`
- **AND** both `pipeline('text-generation', ...)` and `pipeline('translation', ...)` resolve without throwing
- **THEN** the worker emits exactly one `STATUS` message with `{ model: 'SmolLM2-135M-Instruct + m2m100_418M', device }`
- **AND** the hook sets `available: true, downloading: false, downloadProgress: 100`

#### Scenario: Generator loads, translator fails

- **WHEN** the generator pipeline resolves but the translator pipeline throws
- **THEN** the worker emits an `ERROR` message with the thrown error string
- **AND** the worker does NOT emit `STATUS`
- **AND** the hook sets `available: false` and the `GenerateTipsAI` button is not rendered

#### Scenario: Translator loads, generator fails

- **WHEN** the translator pipeline resolves but the generator pipeline throws
- **THEN** the worker emits `ERROR` and does NOT emit `STATUS`
- **AND** the hook sets `available: false`

### Requirement: Device-aware quantization for both models

The worker SHALL select `dtype: 'q4'` when `detectDevice()` returns `'webgpu'` and `dtype: 'q8'` when it returns `'wasm'`. The same dtype policy MUST apply to both the generator and the translator.

#### Scenario: WebGPU device

- **WHEN** `navigator.gpu.requestAdapter()` returns a non-null adapter
- **THEN** both pipelines are loaded with `dtype: 'q4'` and `device: 'webgpu'`

#### Scenario: WASM fallback

- **WHEN** WebGPU is unavailable or the adapter request throws
- **THEN** both pipelines are loaded with `dtype: 'q8'` and `device: 'wasm'`

### Requirement: Download progress aggregates both models

The worker SHALL forward every `progress_callback` event from both model downloads to the main thread as `DOWNLOADING { model: 'generator' | 'translator', file: string, progress: number }`. The hook SHALL maintain a single map keyed by `${model}:${file}` and expose `downloadProgress` as the unweighted average of all values in that map, rounded to an integer in `[0, 100]`.

#### Scenario: Only generator files have reported progress

- **WHEN** only generator files have emitted `DOWNLOADING` so far
- **THEN** `downloadProgress` is the average of the generator file progress values
- **AND** `downloading` is `true`

#### Scenario: Both models emit file progress

- **WHEN** both the generator and the translator have emitted `DOWNLOADING` events
- **THEN** `downloadProgress` is the average across all files from both models
- **AND** `downloading` is `true`

#### Scenario: Both models finish downloading

- **WHEN** both pipelines have resolved and the worker has emitted `STATUS`
- **THEN** `downloading` becomes `false`
- **AND** `downloadProgress` is set to `100`

### Requirement: GenerateTips button is disabled until both models are ready

The `GenerateTipsAI` button MUST be disabled while `available` is `null` or while `downloading` is `true`. Clicking the button MUST be a no-op in either of those states. The button MUST become enabled only after the hook's `available` flips to `true`, which in turn requires the worker's single `STATUS` emission (which only happens once both models are ready per the preceding requirement).

#### Scenario: Button disabled during download

- **WHEN** `downloading` is `true`
- **THEN** the button has `disabled` set and displays `loading_ai(downloadProgress)` as its label

#### Scenario: Button enabled after both models ready

- **WHEN** the hook receives `STATUS`
- **THEN** the button is enabled and displays `generate_tips`

#### Scenario: Click during loading is ignored

- **WHEN** the user clicks the button while `downloading` is `true` or `generating` is `true`
- **THEN** no message is posted to the worker
- **AND** the modal does not open

### Requirement: English-only generation prompts live in the worker

The generation system prompt and user-prompt template SHALL be defined exactly once, in English, as module-level constants inside `src/workers/ai-worker.ts`. Locale files MUST NOT contain `ai_tips_system_prompt` or `ai_tips_user_prompt`. The `Translations` type MUST NOT expose these keys.

#### Scenario: Locale files do not contain AI prompts

- **WHEN** any file under `src/i18n/locales/` is grepped for `ai_tips_system_prompt` or `ai_tips_user_prompt`
- **THEN** there are zero matches

#### Scenario: Worker owns the English prompts

- **WHEN** `src/workers/ai-worker.ts` is read
- **THEN** it contains a `GEN_SYSTEM_PROMPT` string constant in English
- **AND** it contains a `genUserPrompt(goal: string)` function that returns an English template referencing `goal`

### Requirement: Two-stage generation pipeline

On `GENERATE_TIPS { goal, locale }` the worker SHALL:

1. Run the generator with the English system prompt and `genUserPrompt(goal)`, streaming tokens back as `TOKEN { token }`.
2. When generation completes:
   - If `locale === 'en'`, emit `DONE` and stop.
   - Otherwise, emit `TRANSLATING`, call `translator(fullGeneratedText, { src_lang: 'en', tgt_lang: <m2m100 code for locale> })`, then emit `TRANSLATED { text }` with the translated string, then emit `DONE`.

The worker MUST NOT stream translated tokens. Translation is a single post-generation call over the complete generated buffer.

#### Scenario: Generation in English

- **WHEN** `GENERATE_TIPS` arrives with `{ goal: 'Maintain', locale: 'en' }`
- **THEN** the worker streams English tokens via `TOKEN`
- **AND** emits `DONE` when streaming finishes
- **AND** does NOT emit `TRANSLATING` or `TRANSLATED`

#### Scenario: Generation in Spanish

- **WHEN** `GENERATE_TIPS` arrives with `{ goal: 'Definition', locale: 'es' }`
- **THEN** the worker streams English tokens via `TOKEN` during generation
- **AND** after generation emits `TRANSLATING`
- **AND** then emits `TRANSLATED { text }` with the Spanish translation of the full generated text
- **AND** finally emits `DONE`

#### Scenario: Translation failure does not crash the worker

- **WHEN** the translator call throws after successful English generation
- **THEN** the worker emits `ERROR` with the thrown error string
- **AND** does NOT emit `TRANSLATED` or `DONE`

### Requirement: Locale-to-M2M100 code mapping

The worker SHALL map each supported `Locale` to the M2M100 language code used for translation. The mapping MUST cover every value of `Locale` and MUST be: `en→en, es→es, fr→fr, zh→zh, hi→hi`.

#### Scenario: All supported locales map to a code

- **WHEN** `GENERATE_TIPS` arrives for any `locale` in `{ 'en', 'es', 'fr', 'zh', 'hi' }`
- **THEN** the worker has a mapping entry and does not throw a "missing mapping" error

### Requirement: Worker message protocol extensions

The `AIWorkerInbound` enum and message union SHALL add a `locale: Locale` field on `GENERATE_TIPS`. The `AIWorkerOutbound` enum and message union SHALL add:

- `MODEL_READY { model: 'generator' | 'translator' }` (optional telemetry; not required for UI logic, the hook may ignore it).
- `TRANSLATING`.
- `TRANSLATED { text: string }`.

The existing `DOWNLOADING` payload SHALL gain a `model: 'generator' | 'translator'` field. No other existing messages change shape.

#### Scenario: GENERATE_TIPS carries a locale

- **WHEN** `useAIWorker.generate()` is called
- **THEN** the posted message is `{ type: 'GENERATE_TIPS', goal, locale }` where `locale` is the value of the `$locale` atom at call time

#### Scenario: DOWNLOADING identifies the model

- **WHEN** the worker emits a `DOWNLOADING` event from either pipeline's `progress_callback`
- **THEN** the payload includes `model: 'generator'` or `model: 'translator'`

### Requirement: Modal renders streaming English then swaps to translated text

`AIMenuModal` SHALL render `streamedText` (post-`stripPreamble`) while the worker is streaming tokens. On receipt of `TRANSLATING` the modal MUST display a translating indicator (new i18n key `translating_tips`). On receipt of `TRANSLATED { text }` the modal MUST replace its main content with `text` (no `stripPreamble` applied to translator output). The close button MUST remain disabled until `DONE`.

#### Scenario: English locale — streaming only

- **WHEN** a generation runs with `locale: 'en'`
- **THEN** the modal shows streaming English tokens throughout
- **AND** never shows the translating indicator

#### Scenario: Non-English locale — stream, then translate, then swap

- **WHEN** a generation runs with a non-English locale
- **THEN** during streaming the modal shows the English tokens
- **AND** upon `TRANSLATING` the modal shows the translating indicator alongside the still-visible English content
- **AND** upon `TRANSLATED { text }` the modal replaces its content with `text`

### Requirement: Locale files expose `translating_tips`

Every locale file (`en`, `es`, `fr`, `zh`, `hi`) SHALL export a `translating_tips: string` key used as the label/pill text while translation is in progress. The removed `ai_tips_system_prompt` and `ai_tips_user_prompt` keys MUST NOT be re-added.

#### Scenario: `translating_tips` present in every locale

- **WHEN** any locale file is imported
- **THEN** `translations.translating_tips` is a non-empty string

#### Scenario: Type safety enforces the change across locales

- **WHEN** `npm run build` runs (which calls `astro check`)
- **THEN** type-checking passes because every locale satisfies the updated `Translations = typeof en` type
