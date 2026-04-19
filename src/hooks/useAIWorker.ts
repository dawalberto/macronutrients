import { useCallback, useEffect, useRef, useState } from 'react'
import { AIWorkerInbound, AIWorkerOutbound, type AIOutboundMessage } from '../types'

type AIWorkerState = {
	available: boolean | null
	isMobile: boolean
	downloading: boolean
	downloadProgress: number
	generating: boolean
	streamedText: string
	error: string | null
}

const INITIAL_STATE: AIWorkerState = {
	available: null,
	isMobile: false,
	downloading: false,
	downloadProgress: 0,
	generating: false,
	streamedText: '',
	error: null,
}

function isMobileDevice(): boolean {
	return typeof navigator !== 'undefined' && navigator.maxTouchPoints > 0
}

export function useAIWorker() {
	const [state, setState] = useState<AIWorkerState>(INITIAL_STATE)
	const workerRef = useRef<Worker | null>(null)
	const fileProgressRef = useRef<Map<string, number>>(new Map())

	useEffect(() => {
		if (isMobileDevice()) {
			setState((prev) => ({ ...prev, available: false, isMobile: true }))
			return
		}

		const worker = new Worker(new URL('../workers/ai-worker.ts', import.meta.url), { type: 'module' })
		workerRef.current = worker

		worker.onmessage = (e: MessageEvent<AIOutboundMessage>) => {
			const msg = e.data

			switch (msg.type) {
				case AIWorkerOutbound.STATUS:
					setState((prev) => ({ ...prev, available: true, downloading: false, downloadProgress: 100 }))
					break

				case AIWorkerOutbound.DOWNLOADING: {
					fileProgressRef.current.set(msg.file, msg.progress)
					const values = [...fileProgressRef.current.values()]
					const aggregate = Math.round(values.reduce((sum, v) => sum + v, 0) / values.length)
					setState((prev) => ({ ...prev, downloading: true, downloadProgress: aggregate }))
					break
				}

				case AIWorkerOutbound.TOKEN:
					setState((prev) => ({ ...prev, streamedText: prev.streamedText + msg.token }))
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

	const generate = useCallback((systemPrompt: string, userPrompt?: string) => {
		if (!workerRef.current) return
		setState((prev) => ({ ...prev, generating: true, streamedText: '', error: null }))
		workerRef.current.postMessage({ type: AIWorkerInbound.GENERATE_MENU, prompt: userPrompt ?? systemPrompt, systemPrompt: userPrompt ? systemPrompt : undefined })
	}, [])

	return { ...state, generate }
}
