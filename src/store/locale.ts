import { atom } from 'nanostores'

export type Locale = 'en' | 'zh' | 'hi' | 'es' | 'fr'

const SUPPORTED: Locale[] = ['en', 'zh', 'hi', 'es', 'fr']
const STORAGE_KEY = 'macrocalc-locale'

function detectLocale(): Locale {
	const stored = localStorage.getItem(STORAGE_KEY) as Locale | null
	if (stored && SUPPORTED.includes(stored)) return stored

	const nav = navigator.language.split('-')[0] as Locale
	if (SUPPORTED.includes(nav)) return nav

	return 'en'
}

export const $locale = atom<Locale>('en')

if (typeof window !== 'undefined') {
	$locale.set(detectLocale())
	$locale.subscribe((locale) => localStorage.setItem(STORAGE_KEY, locale))
}

export const setLocale = (locale: Locale) => $locale.set(locale)
