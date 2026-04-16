/// <reference lib="webworker" />

import { env, pipeline, TextStreamer, type TextGenerationPipeline } from '@huggingface/transformers'
import { AIWorkerInbound, AIWorkerOutbound, type AIDevice, type AIInboundMessage, type AIOutboundMessage } from '../types'

function send(msg: AIOutboundMessage) {
	self.postMessage(msg)
}

function selectModel(): string {
	const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)
	const deviceMemoryGB = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4

	if (isMobile || deviceMemoryGB < 4) return 'onnx-community/SmolLM2-135M-Instruct'
	if (deviceMemoryGB >= 8) return 'onnx-community/Qwen2.5-1.5B-Instruct'
	return 'onnx-community/Qwen2.5-0.5B-Instruct'
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

self.onmessage = async (e: MessageEvent<AIInboundMessage>) => {
	const { type } = e.data

	if (type === AIWorkerInbound.CHECK_AVAILABILITY) {
		try {
			const model = selectModel()
			const device = await detectDevice()

			pipe = (await pipeline('text-generation', model, {
				dtype: 'q4',
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
				max_new_tokens: 1024,
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
