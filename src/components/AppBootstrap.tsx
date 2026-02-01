import { createWebLocalStorage, initUserAttributesPersistence } from '@macronutrients/core'
import { useEffect } from 'react'

export const AppBootstrap = () => {
	useEffect(() => {
		const storage = createWebLocalStorage()
		if (!storage) return

		let dispose: (() => void) | undefined
		void (async () => {
			dispose = await initUserAttributesPersistence({ storage })
		})()

		return () => {
			dispose?.()
		}
	}, [])

	return null
}
