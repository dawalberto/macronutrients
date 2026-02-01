import type { KeyValueStorage } from './types'

export const createWebLocalStorage = (): KeyValueStorage | null => {
	if (typeof window === 'undefined') return null
	if (!('localStorage' in window)) return null

	return {
		getItem: (key) => window.localStorage.getItem(key),
		setItem: (key, value) => {
			window.localStorage.setItem(key, value)
		},
		removeItem: (key) => {
			window.localStorage.removeItem(key)
		},
	}
}
