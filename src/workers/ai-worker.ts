/// <reference lib="webworker" />

import { env, pipeline, TextStreamer, type TextGenerationPipeline } from '@huggingface/transformers';
import { AIWorkerInbound, AIWorkerOutbound, type AIDevice, type AIInboundMessage, type AIOutboundMessage } from '../types';

function send(msg: AIOutboundMessage) {
	self.postMessage(msg)
}

const MODELS = {
	full: 'onnx-community/Qwen2.5-0.5B-Instruct',
	lite: 'onnx-community/SmolLM2-135M-Instruct',
} as const

type Dtype = 'q4f16' | 'q4' | 'auto' | 'fp32' | 'fp16' | 'q8' | 'int8' | 'uint8' | 'bnb4'

async function detectDevice(): Promise<AIDevice> {
	try {
		const gpu = (navigator as Navigator & { gpu?: { requestAdapter(): Promise<unknown> } }).gpu
		const adapter = await gpu?.requestAdapter()
		return adapter ? 'webgpu' : 'wasm'
	} catch {
		return 'wasm'
	}
}

// Mobile devices use the lite model regardless of reported memory — mobile WebGPU/WASM can't
// handle Qwen 0.5B even when deviceMemory reports 4 GB.
// q4f16 requires WebGPU; always fall back to q4 on WASM to avoid garbled/corrupted output.
function selectModel(): { model: string; dtype: Dtype; maxNewTokens: number } {
	const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory
	const mobile = navigator.maxTouchPoints > 0

	if (mobile) {
		if (memory === undefined || memory >= 2) return { model: MODELS.lite, dtype: 'q4', maxNewTokens: 300 }
		throw new Error('Insufficient device memory for AI generation.')
	}

	if (memory === undefined || memory >= 4) {
		return { model: MODELS.full, dtype: 'q4', maxNewTokens: 1024 }
	}
	if (memory >= 2) return { model: MODELS.lite, dtype: 'q4', maxNewTokens: 400 }
	throw new Error('Insufficient device memory for AI generation.')
}

env.allowLocalModels = false
env.useBrowserCache = true

let pipe: TextGenerationPipeline | null = null
let maxNewTokens = 1024

self.onmessage = async (e: MessageEvent<AIInboundMessage>) => {
	const { type } = e.data

	if (type === AIWorkerInbound.CHECK_AVAILABILITY) {
		try {
			const device = await detectDevice()
			const { model, dtype, maxNewTokens: tokenLimit } = selectModel()
			maxNewTokens = tokenLimit

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
				temperature: 0.4,
				top_p: 0.9,
				repetition_penalty: 1.3,
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
