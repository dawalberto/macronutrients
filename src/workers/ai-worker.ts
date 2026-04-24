/// <reference lib="webworker" />

import { env, pipeline, TextStreamer, type TextGenerationPipeline, type TranslationPipeline } from '@huggingface/transformers'
import { AIWorkerInbound, AIWorkerOutbound, type AIDevice, type AIInboundMessage, type AIOutboundMessage } from '../types/ai'
import type { Locale } from '../store/locale'

function send(msg: AIOutboundMessage) {
	self.postMessage(msg)
}

const GENERATOR_MODEL = 'HuggingFaceTB/SmolLM2-135M-Instruct'
const TRANSLATOR_MODEL = 'Xenova/m2m100_418M'

const MAX_NEW_TOKENS = 256

const GEN_SYSTEM_PROMPT =
	'You are a nutritionist. Output ONLY a numbered list of 5 short tips. Your response MUST start with "1." — no greeting, no introduction, no extra text before or after the list.'

function genUserPrompt(goal: string) {
	return `Goal: ${goal}. List 5 nutrition tips:`
}

const LOCALE_TO_M2M100: Record<Locale, string> = {
	en: 'en',
	es: 'es',
	fr: 'fr',
	zh: 'zh',
	hi: 'hi',
}

async function detectDevice(): Promise<AIDevice> {
	try {
		const gpu = (navigator as Navigator & { gpu?: { requestAdapter(): Promise<unknown> } }).gpu
		const adapter = await gpu?.requestAdapter()
		return adapter ? 'webgpu' : 'wasm'
	} catch {
		return 'wasm'
	}
}

env.allowLocalModels = false
env.useBrowserCache = true

let generator: TextGenerationPipeline | null = null
let translator: TranslationPipeline | null = null

self.onmessage = async (e: MessageEvent<AIInboundMessage>) => {
	const { type } = e.data

	if (type === AIWorkerInbound.CHECK_AVAILABILITY) {
		try {
			const device = await detectDevice()
			const dtype = device === 'webgpu' ? 'q4' : 'q8'

			const [gen, trans] = await Promise.all([
				pipeline('text-generation', GENERATOR_MODEL, {
					dtype,
					device,
					progress_callback: (info: { status: string; file?: string; progress?: number }) => {
						if (info.status === 'progress') {
							send({
								type: AIWorkerOutbound.DOWNLOADING,
								model: 'generator',
								file: info.file ?? '',
								progress: Math.round(info.progress ?? 0),
							})
						}
					},
				}).then((p) => {
					send({ type: AIWorkerOutbound.MODEL_READY, model: 'generator' })
					return p
				}),
				pipeline('translation', TRANSLATOR_MODEL, {
					dtype,
					device,
					progress_callback: (info: { status: string; file?: string; progress?: number }) => {
						if (info.status === 'progress') {
							send({
								type: AIWorkerOutbound.DOWNLOADING,
								model: 'translator',
								file: info.file ?? '',
								progress: Math.round(info.progress ?? 0),
							})
						}
					},
				}).then((p) => {
					send({ type: AIWorkerOutbound.MODEL_READY, model: 'translator' })
					return p
				}),
			])

			generator = gen as TextGenerationPipeline
			translator = trans as TranslationPipeline

			send({ type: AIWorkerOutbound.STATUS, model: 'SmolLM2-135M-Instruct + m2m100_418M', device })
		} catch (err) {
			send({
				type: AIWorkerOutbound.ERROR,
				error: err instanceof Error ? err.message : String(err),
			})
		}
		return
	}

	if (type === AIWorkerInbound.GENERATE_TIPS) {
		const { goal, locale } = e.data
		try {
			if (!generator || !translator) {
				send({ type: AIWorkerOutbound.ERROR, error: 'Models are not loaded yet.' })
				return
			}

			let generatedText = ''

			const streamer = new TextStreamer(generator.tokenizer, {
				skip_prompt: true,
				callback_function: (token: string) => {
					generatedText += token
					send({ type: AIWorkerOutbound.TOKEN, token })
				},
			})

			const messages = [
				{ role: 'system', content: GEN_SYSTEM_PROMPT },
				{ role: 'user', content: genUserPrompt(goal) },
			]

			await generator(messages, {
				max_new_tokens: MAX_NEW_TOKENS,
				do_sample: true,
				temperature: 0.7,
				top_p: 0.9,
				repetition_penalty: 1.1,
				streamer,
			})

			if (locale === 'en') {
				send({ type: AIWorkerOutbound.DONE })
				return
			}

			send({ type: AIWorkerOutbound.TRANSLATING })

			const out = await translator(generatedText, {
				src_lang: 'en',
				tgt_lang: LOCALE_TO_M2M100[locale],
			})

			const translated = Array.isArray(out)
				? (out[0] as { translation_text: string }).translation_text
				: (out as { translation_text: string }).translation_text

			send({ type: AIWorkerOutbound.TRANSLATED, text: translated })
			send({ type: AIWorkerOutbound.DONE })
		} catch (err) {
			send({
				type: AIWorkerOutbound.ERROR,
				error: err instanceof Error ? err.message : String(err),
			})
		}
	}
}
