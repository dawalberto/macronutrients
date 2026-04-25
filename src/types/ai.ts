import type { Locale } from '@store/locale'

export type AIModelKind = 'generator' | 'translator'

export enum AIWorkerInbound {
	CHECK_AVAILABILITY = 'CHECK_AVAILABILITY',
	GENERATE_TIPS = 'GENERATE_TIPS',
	LOAD_TRANSLATOR = 'LOAD_TRANSLATOR',
}

export enum AIWorkerOutbound {
	STATUS = 'STATUS',
	DOWNLOADING = 'DOWNLOADING',
	MODEL_READY = 'MODEL_READY',
	TOKEN = 'TOKEN',
	TRANSLATING = 'TRANSLATING',
	TRANSLATED = 'TRANSLATED',
	DONE = 'DONE',
	ERROR = 'ERROR',
}

export type AIDevice = 'webgpu' | 'wasm'

export type AIInboundMessage =
	| { type: AIWorkerInbound.CHECK_AVAILABILITY }
	| { type: AIWorkerInbound.GENERATE_TIPS; goal: string; locale: Locale }
	| { type: AIWorkerInbound.LOAD_TRANSLATOR; locale: Locale }

export type AIOutboundMessage =
	| { type: AIWorkerOutbound.STATUS; model: string; device: AIDevice }
	| { type: AIWorkerOutbound.DOWNLOADING; model: AIModelKind; file: string; progress: number }
	| { type: AIWorkerOutbound.MODEL_READY; model: AIModelKind }
	| { type: AIWorkerOutbound.TOKEN; token: string }
	| { type: AIWorkerOutbound.TRANSLATING }
	| { type: AIWorkerOutbound.TRANSLATED; text: string }
	| { type: AIWorkerOutbound.DONE }
	| { type: AIWorkerOutbound.ERROR; error: string }
