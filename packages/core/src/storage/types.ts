export type MaybePromise<T> = T | Promise<T>

export type KeyValueStorage = {
	getItem(key: string): MaybePromise<string | null>
	setItem(key: string, value: string): MaybePromise<void>
	removeItem(key: string): MaybePromise<void>
}

export const resolve = async <T>(value: MaybePromise<T>): Promise<T> => {
	return await value
}

export const createJsonStorage = <T>(storage: KeyValueStorage) => {
	return {
		get: async (key: string): Promise<T | null> => {
			const raw = await resolve(storage.getItem(key))
			if (raw == null) return null
			try {
				return JSON.parse(raw) as T
			} catch {
				return null
			}
		},
		set: async (key: string, value: T): Promise<void> => {
			await resolve(storage.setItem(key, JSON.stringify(value)))
		},
		remove: async (key: string): Promise<void> => {
			await resolve(storage.removeItem(key))
		},
	}
}
