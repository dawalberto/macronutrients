## 1. Types & Worker Protocol

- [x] 1.1 In [src/types/ai.ts](src/types/ai.ts), add `import type { Locale } from '@store/locale'` (worker must still use a relative path at the worker import site; the types file is fine with alias since it's consumed by the main bundle; if needed later, switch to a relative import). Export a new type alias `AIModelKind = 'generator' | 'translator'`.
- [x] 1.2 Extend `AIWorkerOutbound` enum with `MODEL_READY = 'MODEL_READY'`, `TRANSLATING = 'TRANSLATING'`, `TRANSLATED = 'TRANSLATED'`.
- [x] 1.3 Update `AIInboundMessage` union so `GENERATE_TIPS` carries `{ type: AIWorkerInbound.GENERATE_TIPS; goal: string; locale: Locale }`. Remove the old `prompt: string; systemPrompt?: string` shape — the worker owns prompts now.
- [x] 1.4 Update `AIOutboundMessage` union:
  - `DOWNLOADING` gains `model: AIModelKind`.
  - Add `{ type: AIWorkerOutbound.MODEL_READY; model: AIModelKind }`.
  - Add `{ type: AIWorkerOutbound.TRANSLATING }`.
  - Add `{ type: AIWorkerOutbound.TRANSLATED; text: string }`.
- [x] 1.5 Verify `src/types/index.ts` barrel re-exports still compile (it imports everything from `./ai`).

## 2. Worker — Two-Model Loading & Progress

- [x] 2.1 In [src/workers/ai-worker.ts](src/workers/ai-worker.ts), keep `env.allowLocalModels = false` and `env.useBrowserCache = true`. Replace the single `pipe` with two module-level variables: `let generator: TextGenerationPipeline | null = null` and `let translator: TranslationPipeline | null = null` (import `type TranslationPipeline` from `@huggingface/transformers`).
- [x] 2.2 Define model constants: `const GENERATOR_MODEL = 'HuggingFaceTB/SmolLM2-135M-Instruct'` and `const TRANSLATOR_MODEL = 'Xenova/m2m100_418M'`.
- [x] 2.3 Add English prompt constants inside the worker module: `const GEN_SYSTEM_PROMPT = '...'` (copy the English string currently in `src/i18n/locales/en.ts`) and `function genUserPrompt(goal: string) { return \`Goal: ${goal}. List 5 nutrition tips:\` }`.
- [x] 2.4 Rewrite the `CHECK_AVAILABILITY` branch to load both pipelines in parallel with `Promise.all([...])`. Each `pipeline(...)` call's `progress_callback` wraps `send({ type: DOWNLOADING, model, file, progress })` with its own `model: 'generator' | 'translator'` label. Use `dtype: device === 'webgpu' ? 'q4' : 'q8'`. After each individual pipeline resolves, emit `MODEL_READY { model }`. After `Promise.all` resolves, emit a single `STATUS { model: 'SmolLM2-135M-Instruct + m2m100_418M', device }`. On any rejection, emit `ERROR` and do NOT emit `STATUS`.
- [x] 2.5 Add a locale-to-M2M100-code map at module scope: `const LOCALE_TO_M2M100: Record<Locale, string> = { en: 'en', es: 'es', fr: 'fr', zh: 'zh', hi: 'hi' }`. (Import `Locale` via **relative** path `../store/locale` — worker bundles don't resolve `@` aliases per the feedback memory about worker imports.)

## 3. Worker — Two-Stage Generation

- [x] 3.1 Rewrite the `GENERATE_TIPS` branch. Read `{ goal, locale }` from `e.data`. Guard: if `!generator || !translator` emit `ERROR`. Build `messages = [{ role: 'system', content: GEN_SYSTEM_PROMPT }, { role: 'user', content: genUserPrompt(goal) }]`.
- [x] 3.2 Stream generator tokens via `TextStreamer` exactly as today, but also accumulate the full string into a local `let generatedText = ''` inside the `callback_function` (append each token before forwarding via `TOKEN`).
- [x] 3.3 After `await generator(messages, { ...same inference config as today..., streamer })` resolves:
  - If `locale === 'en'`: `send({ type: DONE })` and return.
  - Else: `send({ type: TRANSLATING })`, then `const out = await translator(generatedText, { src_lang: 'en', tgt_lang: LOCALE_TO_M2M100[locale] })`. The transformers.js `translation` pipeline returns `[{ translation_text: string }]`; extract `out[0].translation_text`. Then `send({ type: TRANSLATED, text })` and `send({ type: DONE })`.
- [x] 3.4 Wrap the whole branch in try/catch; on throw emit a single `ERROR` and return (do not emit `DONE` on failure).
- [x] 3.5 Re-check all imports in the worker file use **relative paths** (not `@`-aliases). Run `npm run build` to catch worker bundling issues early.

## 4. Hook — Dual-Model State

- [x] 4.1 In [src/hooks/useAIWorker.ts](src/hooks/useAIWorker.ts), change `fileProgressRef` key scheme from `file` to `${model}:${file}`. Update the `DOWNLOADING` case to `fileProgressRef.current.set(\`${msg.model}:${msg.file}\`, msg.progress)`.
- [x] 4.2 Keep the unweighted average: `values.reduce((sum, v) => sum + v, 0) / values.length`. Round to int. Clamp to `[0, 100]` defensively.
- [x] 4.3 On `MODEL_READY` — no state update needed (optional: log for debugging). The hook relies on the worker's single `STATUS` to flip `available`.
- [x] 4.4 On `STATUS` (unchanged): set `available: true, downloading: false, downloadProgress: 100`.
- [x] 4.5 Add new state fields to `AIWorkerState`: `translating: boolean` (default `false`) and `translatedText: string | null` (default `null`). Expose both from the returned object.
- [x] 4.6 Handle `TRANSLATING`: set `translating: true`. Handle `TRANSLATED`: set `translatedText: msg.text, translating: false`. Handle `DONE`: set `generating: false` (unchanged). On new `generate()` call, reset `translating: false, translatedText: null, streamedText: '', error: null, generating: true`.
- [x] 4.7 Change the `generate` signature from `(systemPrompt, userPrompt?)` to `(goal: string, locale: Locale)`. Post `{ type: AIWorkerInbound.GENERATE_TIPS, goal, locale }`. Import `Locale` from `@store/locale` (this file is in the main bundle — alias is fine).

## 5. Component — GenerateTipsAI

- [x] 5.1 In [src/components/GenerateTipsAI.tsx](src/components/GenerateTipsAI.tsx), import `$locale` from `@store/locale` and subscribe with `useStore($locale)`.
- [x] 5.2 Remove `const systemPrompt = t.ai_tips_system_prompt` and `const userPrompt = t.ai_tips_user_prompt(goal)`.
- [x] 5.3 Update `handleClick` to call `generate(goal, locale)` (new signature). Everything else in the component stays the same.
- [x] 5.4 Pass the hook's new `translating` and `translatedText` values to `<AIMenuModal>` as new props.

## 6. Component — AIMenuModal

- [x] 6.1 In [src/components/AIMenuModal.tsx](src/components/AIMenuModal.tsx), extend `AIMenuModalProps` with `translating: boolean` and `translatedText: string | null`.
- [x] 6.2 Compute `displayText`: if `translatedText !== null`, use it verbatim (do NOT apply `stripPreamble`). Otherwise use `stripPreamble(streamedText)` as today.
- [x] 6.3 Add a translating indicator block: when `translating === true` render a small pill under the streamed text reading `t.translating_tips`, styled the same way as the existing "STREAMING..." footer.
- [x] 6.4 Keep close button disabled while either `generating` or `translating` is true (currently only `generating`). Update the click-outside-to-close guard similarly.
- [x] 6.5 Keep `Streamdown mode={generating ? 'streaming' : 'static'}` behavior; when `translatedText` is set, `generating` is already `false`, so Streamdown renders static — good.

## 7. i18n — Prompts out, new label in

- [x] 7.1 In [src/i18n/locales/en.ts](src/i18n/locales/en.ts), delete `ai_tips_system_prompt` and `ai_tips_user_prompt`. Add `translating_tips: 'TRANSLATING...'`.
- [x] 7.2 In [src/i18n/locales/es.ts](src/i18n/locales/es.ts), delete both AI-prompt keys. Add `translating_tips: 'TRADUCIENDO...'`.
- [x] 7.3 In [src/i18n/locales/fr.ts](src/i18n/locales/fr.ts), delete both. Add `translating_tips: 'TRADUCTION EN COURS...'`.
- [x] 7.4 In [src/i18n/locales/zh.ts](src/i18n/locales/zh.ts), delete both. Add `translating_tips: '翻译中...'`.
- [x] 7.5 In [src/i18n/locales/hi.ts](src/i18n/locales/hi.ts), delete both. Add `translating_tips: 'अनुवाद हो रहा है...'`.
- [x] 7.6 Confirm the `Translations = typeof en` type on `en.ts` picks up the key additions/removals. Run `npx tsc --noEmit` (or `npm run build`) to verify every locale file still satisfies the type.

## 8. Verification

- [x] 8.1 Run `npm run build` — must pass `astro check` and produce a `/dist` build without errors.
- [x] 8.2 Run `npx prettier --check .` — fix formatting if the check fails.
- [ ] 8.3 `npm run dev`. In the browser, with locale set to `en`, click `GENERATE TIPS` and confirm English tips stream in; no translating pill appears.
- [ ] 8.4 Switch locale to `es` and click the button again. Confirm: (a) button was disabled until both models finished downloading on first load, (b) English tokens stream first, (c) the translating pill appears, (d) content is replaced with Spanish translation, (e) modal can be closed afterwards. Repeat spot-check for `fr`, `zh`, `hi`.
- [ ] 8.5 Throttle network to Fast 3G in DevTools and reload with cache disabled. Confirm the download progress bar advances smoothly and reaches 100% only once both models have loaded.
- [ ] 8.6 Disable WebGPU (Chrome: `chrome://flags` → Unsafe WebGPU off) and confirm the app still loads both models via WASM with `dtype: 'q8'` and produces a Spanish translation.
- [x] 8.7 Grep the repo to confirm `ai_tips_system_prompt` and `ai_tips_user_prompt` have zero remaining occurrences: `rg "ai_tips_(system|user)_prompt" src/`.
- [x] 8.8 Grep to confirm the worker file uses only relative imports: `rg "from '@" src/workers/` returns nothing.
