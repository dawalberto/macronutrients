import type { KeyValueStorage } from './types'

export const createMemoryStorage = (): KeyValueStorage => {
	const data = new Map<string, string>()
	return {
		getItem: (key) => data.get(key) ?? null,
		setItem: (key, value) => {
			data.set(key, value)
		},
		removeItem: (key) => {
			data.delete(key)
		},
	}
}
