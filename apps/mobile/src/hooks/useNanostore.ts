import type { ReadableAtom } from 'nanostores'
import { useSyncExternalStore } from 'react'

export const useNanostore = <T>(store: ReadableAtom<T>): T => {
	return useSyncExternalStore(
		(onStoreChange) => store.listen(onStoreChange),
		() => store.get(),
		() => store.get()
	)
}
