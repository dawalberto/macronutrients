import { useCallback, useEffect, useRef, useState } from 'react'
import { AIWorkerInbound, AIWorkerOutbound, type AIOutboundMessage } from '../types'
import type { Locale } from '@store/locale'

type AIWorkerState = {
	available: boolean | null
	downloading: boolean
	downloadProgress: number
	generating: boolean
	streamedText: string
	translating: boolean
	translatedText: string | null
	error: string | null
}

const INITIAL_STATE: AIWorkerState = {
	available: null,
	downloading: false,
	downloadProgress: 0,
	generating: false,
	streamedText: '',
	translating: false,
	translatedText: null,
	error: null,
}

export function useAIWorker() {
	const [state, setState] = useState<AIWorkerState>(INITIAL_STATE)
	const workerRef = useRef<Worker | null>(null)
	const fileProgressRef = useRef<Map<string, number>>(new Map())

	useEffect(() => {
		const worker = new Worker(new URL('../workers/ai-worker.ts', import.meta.url), { type: 'module' })
		workerRef.current = worker

		worker.onmessage = (e: MessageEvent<AIOutboundMessage>) => {
			const msg = e.data

			switch (msg.type) {
				case AIWorkerOutbound.STATUS:
					setState((prev) => ({ ...prev, available: true, downloading: false, downloadProgress: 100 }))
					break

				case AIWorkerOutbound.DOWNLOADING: {
					fileProgressRef.current.set(`${msg.model}:${msg.file}`, msg.progress)
					const values = [...fileProgressRef.current.values()]
					const aggregate = Math.min(100, Math.max(0, Math.round(values.reduce((sum, v) => sum + v, 0) / values.length)))
					setState((prev) => ({ ...prev, downloading: true, downloadProgress: aggregate }))
					break
				}

				case AIWorkerOutbound.MODEL_READY:
					break

				case AIWorkerOutbound.TOKEN:
					setState((prev) => ({ ...prev, streamedText: prev.streamedText + msg.token }))
					break

				case AIWorkerOutbound.TRANSLATING:
					setState((prev) => ({ ...prev, translating: true }))
					break

				case AIWorkerOutbound.TRANSLATED:
					setState((prev) => ({ ...prev, translatedText: msg.text, translating: false }))
					break

				case AIWorkerOutbound.DONE:
					setState((prev) => ({ ...prev, generating: false }))
					break

				case AIWorkerOutbound.ERROR:
					setState((prev) => ({ ...prev, available: false, generating: false, error: msg.error }))
					break
			}
		}

		worker.onerror = () => {
			setState((prev) => ({ ...prev, available: false, error: 'Worker failed to load.' }))
		}

		worker.postMessage({ type: AIWorkerInbound.CHECK_AVAILABILITY })

		return () => {
			worker.terminate()
			workerRef.current = null
		}
	}, [])

	const generate = useCallback((goal: string, locale: Locale) => {
		if (!workerRef.current) return
		setState((prev) => ({ ...prev, generating: true, translating: false, translatedText: null, streamedText: '', error: null }))
		workerRef.current.postMessage({
			type: AIWorkerInbound.GENERATE_TIPS,
			goal,
			locale,
		})
	}, [])

	return { ...state, generate }
}
