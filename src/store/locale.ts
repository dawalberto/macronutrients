import { atom } from 'nanostores'

export type Locale = 'en' | 'zh' | 'hi' | 'es' | 'fr'

const SUPPORTED: Locale[] = ['en', 'zh', 'hi', 'es', 'fr']
const STORAGE_KEY = 'macrocalc-locale'

function detectLocale(): Locale {
	if (typeof window === 'undefined') return 'en'

	// URL is the source of truth — extract locale from path segment e.g. /macronutrients/es/
	const pathLocale = window.location.pathname.split('/').find((seg) => SUPPORTED.includes(seg as Locale)) as Locale | undefined
	if (pathLocale) return pathLocale

	const stored = localStorage.getItem(STORAGE_KEY) as Locale | null
	if (stored && SUPPORTED.includes(stored)) return stored

	const nav = navigator.language.split('-')[0] as Locale
	if (SUPPORTED.includes(nav)) return nav

	return 'en'
}

export const $locale = atom<Locale>(detectLocale())

if (typeof window !== 'undefined') {
	$locale.subscribe((locale) => localStorage.setItem(STORAGE_KEY, locale))
}

export const setLocale = (locale: Locale) => $locale.set(locale)
