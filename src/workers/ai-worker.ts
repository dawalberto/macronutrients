/// <reference lib="webworker" />

import { env, pipeline, TextStreamer, type TextGenerationPipeline } from '@huggingface/transformers'
import { AIWorkerInbound, AIWorkerOutbound, type AIDevice, type AIInboundMessage, type AIOutboundMessage } from '../types'

function send(msg: AIOutboundMessage) {
	self.postMessage(msg)
}

const MODELS = {
	large: 'onnx-community/Qwen2.5-1.5B-Instruct',
	full: 'onnx-community/Qwen2.5-0.5B-Instruct',
	lite: 'onnx-community/SmolLM2-135M-Instruct',
} as const

type Dtype = 'q4f16' | 'q4' | 'auto' | 'fp32' | 'fp16' | 'q8' | 'int8' | 'uint8' | 'bnb4'

// Mobile always gets lite; desktop scales by deviceMemory; undefined = API unavailable (assume high-end desktop)
function selectModel(): { model: string; dtype: Dtype; maxNewTokens: number } {
	const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)
	const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory

	if (isMobile) return { model: MODELS.lite, dtype: 'q4', maxNewTokens: 400 }
	if (memory === undefined || memory >= 8) return { model: MODELS.large, dtype: 'q4f16', maxNewTokens: 1024 }
	if (memory >= 4) return { model: MODELS.full, dtype: 'q4f16', maxNewTokens: 1024 }
	if (memory >= 2) return { model: MODELS.lite, dtype: 'q4', maxNewTokens: 400 }
	throw new Error('Insufficient device memory for AI generation.')
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

let pipe: TextGenerationPipeline | null = null
let maxNewTokens = 1024

self.onmessage = async (e: MessageEvent<AIInboundMessage>) => {
	const { type } = e.data

	if (type === AIWorkerInbound.CHECK_AVAILABILITY) {
		try {
			const { model, dtype, maxNewTokens: tokenLimit } = selectModel()
			maxNewTokens = tokenLimit
			const device = await detectDevice()

			pipe = (await pipeline('text-generation', model, {
				dtype,
				device,
				progress_callback: (info: { status: string; file?: string; progress?: number }) => {
					if (info.status === 'progress') {
						send({
							type: AIWorkerOutbound.DOWNLOADING,
							file: info.file ?? '',
							progress: Math.round(info.progress ?? 0),
						})
					}
				},
			})) as TextGenerationPipeline

			send({ type: AIWorkerOutbound.STATUS, model, device })
		} catch (err) {
			send({
				type: AIWorkerOutbound.ERROR,
				error: err instanceof Error ? err.message : String(err),
			})
		}
		return
	}

	if (type === AIWorkerInbound.GENERATE_MENU) {
		const { prompt, systemPrompt } = e.data
		try {
			if (!pipe) {
				send({ type: AIWorkerOutbound.ERROR, error: 'Model is not loaded yet.' })
				return
			}

			const streamer = new TextStreamer(pipe.tokenizer, {
				skip_prompt: true,
				callback_function: (token: string) => {
					send({ type: AIWorkerOutbound.TOKEN, token })
				},
			})

			const messages = systemPrompt
				? [{ role: 'system', content: systemPrompt }, { role: 'user', content: prompt }]
				: [{ role: 'user', content: prompt }]

			await pipe(messages, {
				max_new_tokens: maxNewTokens,
				do_sample: true,
				temperature: 0.7,
				streamer,
			})

			send({ type: AIWorkerOutbound.DONE })
		} catch (err) {
			send({
				type: AIWorkerOutbound.ERROR,
				error: err instanceof Error ? err.message : String(err),
			})
		}
	}
}
