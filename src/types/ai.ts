export enum AIWorkerInbound {
	CHECK_AVAILABILITY = 'CHECK_AVAILABILITY',
	GENERATE_MENU = 'GENERATE_MENU',
}

export enum AIWorkerOutbound {
	STATUS = 'STATUS',
	DOWNLOADING = 'DOWNLOADING',
	TOKEN = 'TOKEN',
	DONE = 'DONE',
	ERROR = 'ERROR',
}

export type AIDevice = 'webgpu' | 'wasm'

export type AIInboundMessage = { type: AIWorkerInbound.CHECK_AVAILABILITY } | { type: AIWorkerInbound.GENERATE_MENU; prompt: string; systemPrompt?: string }

export type AIOutboundMessage =
	| { type: AIWorkerOutbound.STATUS; model: string; device: AIDevice }
	| { type: AIWorkerOutbound.DOWNLOADING; file: string; progress: number }
	| { type: AIWorkerOutbound.TOKEN; token: string }
	| { type: AIWorkerOutbound.DONE }
	| { type: AIWorkerOutbound.ERROR; error: string }
