/// <reference lib="webworker" />

import { env, pipeline, TextStreamer, type TextGenerationPipeline, type TranslationPipeline } from '@huggingface/transformers'
import { AIWorkerInbound, AIWorkerOutbound, type AIDevice, type AIInboundMessage, type AIOutboundMessage } from '../types/ai'
import type { Locale } from '../store/locale'

function send(msg: AIOutboundMessage) {
	self.postMessage(msg)
}

const GENERATOR_MODEL = 'HuggingFaceTB/SmolLM2-135M-Instruct'
const MAX_NEW_TOKENS = 256

const GEN_SYSTEM_PROMPT =
	'You are a nutritionist. Output ONLY a numbered list of 5 short tips. Your response MUST start with "1." — no greeting, no introduction, no extra text before or after the list.'

function genUserPrompt(goal: string) {
	return `Goal: ${goal}. List 5 nutrition tips:`
}

// Opus-MT models are monodirectional: one model per language pair.
// Must use Xenova/ prefix — those repos have the ONNX exports transformers.js needs.
// Always use q8 dtype; q4 quantized variants don't exist for these seq2seq models.
const LOCALE_TO_OPUS_MT: Partial<Record<Locale, string>> = {
	es: 'Xenova/opus-mt-en-es',
	fr: 'Xenova/opus-mt-en-fr',
	zh: 'Xenova/opus-mt-en-zh',
	hi: 'Xenova/opus-mt-en-hi',
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
let translatorLocale: Locale | null = null
let currentDevice: AIDevice = 'wasm'

async function ensureTranslator(locale: Locale): Promise<void> {
	if (locale === 'en' || translatorLocale === locale) return

	const modelId = LOCALE_TO_OPUS_MT[locale]
	if (!modelId) return

	translator = null
	translatorLocale = null

	translator = (await pipeline('translation', modelId, {
		dtype: 'q8',
		device: currentDevice,
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
	})) as TranslationPipeline

	translatorLocale = locale
	send({ type: AIWorkerOutbound.MODEL_READY, model: 'translator' })
}

self.onmessage = async (e: MessageEvent<AIInboundMessage>) => {
	const { type } = e.data

	if (type === AIWorkerInbound.CHECK_AVAILABILITY) {
		try {
			const device = await detectDevice()
			const dtype = device === 'webgpu' ? 'q4' : 'q8'
			currentDevice = device

			generator = (await pipeline('text-generation', GENERATOR_MODEL, {
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
			})) as TextGenerationPipeline

			send({ type: AIWorkerOutbound.MODEL_READY, model: 'generator' })
			send({ type: AIWorkerOutbound.STATUS, model: 'SmolLM2-135M-Instruct', device })
		} catch (err) {
			send({ type: AIWorkerOutbound.ERROR, error: err instanceof Error ? err.message : String(err) })
		}
		return
	}

	if (type === AIWorkerInbound.LOAD_TRANSLATOR) {
		const { locale } = e.data
		try {
			await ensureTranslator(locale)
		} catch (err) {
			send({ type: AIWorkerOutbound.ERROR, error: err instanceof Error ? err.message : String(err) })
		}
		return
	}

	if (type === AIWorkerInbound.GENERATE_TIPS) {
		const { goal, locale } = e.data
		try {
			if (!generator) {
				send({ type: AIWorkerOutbound.ERROR, error: 'Model is not loaded yet.' })
				return
			}

			if (locale !== 'en') await ensureTranslator(locale)

			let generatedText = ''
			const streamer = new TextStreamer(generator.tokenizer, {
				skip_prompt: true,
				callback_function: (token: string) => {
					generatedText += token
					send({ type: AIWorkerOutbound.TOKEN, token })
				},
			})

			await generator(
				[
					{ role: 'system', content: GEN_SYSTEM_PROMPT },
					{ role: 'user', content: genUserPrompt(goal) },
				],
				{ max_new_tokens: MAX_NEW_TOKENS, do_sample: true, temperature: 0.7, top_p: 0.9, repetition_penalty: 1.1, streamer },
			)

			if (locale === 'en' || !translator) {
				send({ type: AIWorkerOutbound.DONE })
				return
			}

			send({ type: AIWorkerOutbound.TRANSLATING })

			const tips = generatedText.split(/\n(?=\d+[.)]\s)/).map((s) => s.trim()).filter(Boolean)
			const translatedParts: string[] = []
			for (const tip of tips) {
				const prefix = tip.match(/^(\d+[.)]\s*)/)?.[1] ?? ''
				const text = tip.slice(prefix.length).trim()
				// Opus-MT is monodirectional — no src_lang/tgt_lang needed
				const out = await translator(text)
				const translated = Array.isArray(out)
					? (out[0] as { translation_text: string }).translation_text
					: (out as { translation_text: string }).translation_text
				translatedParts.push(prefix + translated.trim())
			}

			send({ type: AIWorkerOutbound.TRANSLATED, text: translatedParts.join('\n') })
			send({ type: AIWorkerOutbound.DONE })
		} catch (err) {
			send({ type: AIWorkerOutbound.ERROR, error: err instanceof Error ? err.message : String(err) })
		}
	}
}
