## 1. Worker message contract

- [x] 1.1 Open `src/types/ai.ts`. Rename enum member `AIWorkerInbound.GENERATE_MENU` to `AIWorkerInbound.GENERATE_TIPS` (string value `'GENERATE_TIPS'`). Update the `AIInboundMessage` discriminated-union variant that carries `{ prompt, systemPrompt }` so its `type` field is `AIWorkerInbound.GENERATE_TIPS`.
- [x] 1.2 Grep the repo for `GENERATE_MENU` — there must be zero matches after step 1.1. Update every match (expect hits in `src/workers/ai-worker.ts` and `src/hooks/useAIWorker.ts`).

## 2. Worker — single smallest model, universal device

- [x] 2.1 In `src/workers/ai-worker.ts`, replace the `MODELS` object with a single constant: `const MODEL = 'onnx-community/SmolLM2-135M-Instruct'`. (If, at implementation time, an even smaller instruction-tuned ONNX community mirror exists, use that ID instead; otherwise keep SmolLM2-135M.)
- [x] 2.2 Delete the `selectModel()` function and the `type Dtype = ...` alias. Delete the `const memory = ...` / mobile / insufficient-memory branches entirely.
- [x] 2.3 Replace the existing model-loading logic (inside the `CHECK_AVAILABILITY` handler) with: detect device via the existing `detectDevice()` helper; call `pipeline('text-generation', MODEL, { dtype: 'q4', device, progress_callback: ... })`. Keep the existing `progress_callback` that forwards `DOWNLOADING` messages.
- [x] 2.4 Set a module-level `const MAX_NEW_TOKENS = 256`. Delete the mutable `let maxNewTokens = 1024` binding and replace all references with the constant.
- [x] 2.5 Rename the inbound branch from `if (type === AIWorkerInbound.GENERATE_MENU)` to `if (type === AIWorkerInbound.GENERATE_TIPS)`. Leave the internals (streamer, `pipe(messages, {...})`, DONE/ERROR emission) unchanged except for passing `max_new_tokens: MAX_NEW_TOKENS`.
- [x] 2.6 In the `pipe(messages, {...})` options, keep `do_sample: true`, `temperature: 0.4`, `top_p: 0.9`, `repetition_penalty: 1.3` — these tune well for a small model and match existing behavior.
- [x] 2.7 Confirm the worker still uses relative imports only (`'../types'`) per the Vite-worker-bundling constraint; do NOT introduce any `@utils`/`@types`/`src/...` alias imports into this file.

## 3. Hook — re-enable on mobile

- [x] 3.1 In `src/hooks/useAIWorker.ts`, delete the `isMobileDevice()` helper and the `if (isMobileDevice()) { setState(... available: false, isMobile: true ...); return }` early-return block inside `useEffect`.
- [x] 3.2 Delete the `isMobile` field from the `AIWorkerState` type, `INITIAL_STATE`, and the returned object (no consumer will need it anymore; `GenerateTipsAI` does not read it).
- [x] 3.3 In `generate(systemPrompt, userPrompt)`, change the `postMessage` payload `type` from `AIWorkerInbound.GENERATE_MENU` to `AIWorkerInbound.GENERATE_TIPS`. Leave the `prompt` / `systemPrompt` assembly untouched.

## 4. Component rename and prompt simplification

- [x] 4.1 Create `src/components/GenerateTipsAI.tsx` by copying `src/components/InterpretResults.tsx` as the starting point. Export `export const GenerateTipsAI = () => { ... }` (named export — repo convention).
- [x] 4.2 Inside `GenerateTipsAI`, remove the imports and usages of `calculateMacros`, `Goal` enum math, `$userAttributes` destructuring of `genre/age/weight/height/lbm/bmrAndExercise`, and the `maintenanceKcal` / `difference` / `label` calculations. Keep only what's needed to read `goal`.
- [x] 4.3 Replace the prompt construction in `handleClick`:
  - `const systemPrompt = t.ai_tips_system_prompt`
  - `const userPrompt = t.ai_tips_user_prompt(goal)`
  - `generate(systemPrompt, userPrompt)`
- [x] 4.4 Replace the button copy: `buttonText` now uses `t.generate_tips` (idle), `t.generating_tips` (generating), `t.loading_ai(downloadProgress)` (loading). Keep the `Sparkles` icon, disabled logic, background-fill progress bar, and hover transitions exactly as they are.
- [x] 4.5 Keep the `AIMenuModal` usage unchanged in API (`visible`, `streamedText`, `generating`, `onClose`).
- [x] 4.6 Delete `src/components/InterpretResults.tsx`.
- [x] 4.7 In `src/pages/index.astro`, replace the import `InterpretResults` → `GenerateTipsAI` and the JSX tag `<InterpretResults ... />` → `<GenerateTipsAI ... />`. Preserve any existing `client:*` directive unchanged.
- [x] 4.8 Grep the repo for `InterpretResults` — zero matches expected after 4.6 and 4.7.

## 5. Modal label

- [x] 5.1 In `src/components/AIMenuModal.tsx`, change `{t.ai_interpretation}` in the header to `{t.ai_tips_title}`. Change `{t.ai_interpreting}` in the empty-state placeholder to `{t.generating_tips}`. Leave `{t.ai_streaming}` as-is.

## 6. i18n — remove old keys

- [x] 6.1 In `src/i18n/locales/en.ts`, remove the keys: `ai_interpretation`, `ai_interpreting`, `interpret_results`, `interpreting`, `ai_unavailable_mobile`, `ai_interpret_system_prompt`, `ai_interpret_user_prompt`. Keep `loading_ai`, `ai_streaming`. The `Translations` type (derived from `en.ts`) updates automatically.
- [x] 6.2 Repeat 6.1 for `src/i18n/locales/es.ts`, `fr.ts`, `hi.ts`, `zh.ts`. Every locale must have exactly the same key set as `en.ts` (type-check will enforce this).

## 7. i18n — add new keys

- [x] 7.1 In `src/i18n/locales/en.ts`, add the following keys (alongside the existing AI-modal section):
  - `ai_tips_title: 'AI TIPS'`
  - `generate_tips: 'GENERATE TIPS'`
  - `generating_tips: 'GENERATING TIPS...'`
  - `ai_tips_system_prompt`: a single string that reads as an expert nutritionist, requires exactly 5 concise tips, Markdown list, English, no questions, no disclaimers about doctors. Cap at ~80 words.
  - `ai_tips_user_prompt: (goal: Goal) => string` — imports `Goal` from `src/types`, returns a short English message naming the localized/English goal word and asking for 5 tips tailored to it. Example body: `"Goal: ${goal}. Give me 5 short nutrition and fitness tips for this goal, as a Markdown list."`
- [x] 7.2 Add the same 5 keys to `src/i18n/locales/es.ts`, with Spanish translations. The system prompt must be written *in Spanish* (not "respond in Spanish" written in English) to bias the 135M model toward Spanish output. `ai_tips_user_prompt(goal)` formats the goal word in Spanish (e.g. map `Goal.MAINTAIN → "Mantener"`, `Goal.SURPLUS → "Superávit"`, `Goal.DEFINITION → "Definición"`).
- [x] 7.3 Add the same 5 keys to `src/i18n/locales/fr.ts`, in French, with a French-mapped goal label.
- [x] 7.4 Add the same 5 keys to `src/i18n/locales/hi.ts`, in Hindi (Devanagari), with a Hindi-mapped goal label.
- [x] 7.5 Add the same 5 keys to `src/i18n/locales/zh.ts`, in Simplified Chinese, with a Chinese-mapped goal label.
- [x] 7.6 Run `npx tsc --noEmit` (or `npm run build` which first runs `astro check`) and confirm there are zero type errors. Any missing key in a non-English locale will fail the `Translations` shape check.

## 8. Verification

- [x] 8.1 `grep -rn "GENERATE_MENU\|InterpretResults\|ai_interpret\|ai_interpretation\|ai_interpreting\|ai_unavailable_mobile\|interpret_results\|isMobile" src/` must return zero matches.
- [x] 8.2 `grep -rn "Qwen2.5-0.5B\|MODELS.full\|MODELS.lite\|selectModel" src/` must return zero matches.
- [x] 8.3 Run `npm run build`. It must complete with zero type errors and produce a `dist/` build.
- [x] 8.4 Run `npm run dev`. Open the app in a desktop browser:
  - Confirm the button labeled "GENERATE TIPS" appears after the model finishes downloading (or shows "LOADING AI MODEL... N%" during download).
  - Click it; the modal opens with header "AI TIPS", streams Markdown tokens live, and ends with exactly 5 (best-effort) bulleted/numbered tips.
  - Switch locale (via the existing language selector); click again; confirm the output streams in the selected language.
- [x] 8.5 Open the dev server in a mobile browser (or Chrome DevTools mobile emulation with `navigator.maxTouchPoints` > 0). Confirm the button is visible and clickable, and that tapping it produces streaming output on WASM. (If testing a real low-end Android device is impractical, simulate via DevTools; note this limitation in the PR description.)
- [x] 8.6 Run `npx prettier --check .` and fix any formatting deltas.
