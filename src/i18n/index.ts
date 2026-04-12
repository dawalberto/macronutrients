import { useStore } from '@nanostores/react'
import { $locale, type Locale } from '@store/locale'
import { en, type Translations } from './locales/en'
import { zh } from './locales/zh'
import { hi } from './locales/hi'
import { es } from './locales/es'
import { fr } from './locales/fr'

const localeMap: Record<Locale, Translations> = { en, zh, hi, es, fr }

/** React hook — reactive, re-renders the component on locale change */
export function useTranslations(): Translations {
	const locale = useStore($locale)
	return localeMap[locale]
}

/** Vanilla JS helper — reads current locale at call time (use inside $locale.listen for reactivity) */
export function getTranslations(): Translations {
	return localeMap[$locale.get()]
}
