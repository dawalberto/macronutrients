import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Localization from 'expo-localization'
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

import { translations, type AppLanguage, type TranslationKey } from './translations'

export type LanguagePreference = AppLanguage | 'system'

export const LANGUAGE_PREFERENCE_KEY = 'macrocalc:languagePreference:v1'

export const LANGUAGES: ReadonlyArray<{ code: AppLanguage; nativeName: string; englishName: string }> = [
	{ code: 'zh', nativeName: '中文（简体）', englishName: 'Chinese (Mandarin)' },
	{ code: 'es', nativeName: 'Español', englishName: 'Spanish' },
	{ code: 'en', nativeName: 'English', englishName: 'English' },
	{ code: 'hi', nativeName: 'हिन्दी', englishName: 'Hindi' },
	{ code: 'bn', nativeName: 'বাংলা', englishName: 'Bengali' },
	{ code: 'fr', nativeName: 'Français', englishName: 'French' },
	{ code: 'nl', nativeName: 'Nederlands', englishName: 'Dutch' },
]

function normalizeToSupportedLanguageTag(input?: string | null): AppLanguage {
	const tag = (input ?? '').toLowerCase().replace('_', '-')
	const base = tag.split('-')[0]

	switch (base) {
		case 'zh':
			return 'zh'
		case 'es':
			return 'es'
		case 'en':
			return 'en'
		case 'hi':
			return 'hi'
		case 'bn':
			return 'bn'
		case 'fr':
			return 'fr'
		case 'nl':
			return 'nl'
		default:
			return 'en'
	}
}

function getDeviceLanguage(): AppLanguage {
	try {
		const locales = Localization.getLocales?.() ?? []
		const tag = locales[0]?.languageTag ?? (globalThis as any)?.navigator?.language
		return normalizeToSupportedLanguageTag(tag)
	} catch {
		return 'en'
	}
}

type I18nContextValue = {
	language: AppLanguage
	preference: LanguagePreference
	setPreference: (pref: LanguagePreference) => void
	t: (key: TranslationKey) => string
}

const I18nContext = createContext<I18nContextValue | null>(null)

export function I18nProvider({ children }: { children: React.ReactNode }) {
	const [preference, setPreferenceState] = useState<LanguagePreference>('system')

	useEffect(() => {
		let alive = true
		void (async () => {
			try {
				const stored = await AsyncStorage.getItem(LANGUAGE_PREFERENCE_KEY)
				if (!alive) return
				if (stored === 'system') {
					setPreferenceState('system')
				} else if (stored && ['en', 'es', 'zh', 'hi', 'bn', 'fr', 'nl'].includes(stored)) {
					setPreferenceState(stored as AppLanguage)
				}
			} finally {
				// no-op
			}
		})()
		return () => {
			alive = false
		}
	}, [])

	const language = useMemo<AppLanguage>(() => {
		if (preference === 'system') return getDeviceLanguage()
		return preference
	}, [preference])

	const setPreference = useCallback((pref: LanguagePreference) => {
		setPreferenceState(pref)
		void AsyncStorage.setItem(LANGUAGE_PREFERENCE_KEY, pref)
	}, [])

	const t = useCallback(
		(key: TranslationKey) => {
			const table = translations[language] ?? translations.en
			return table[key] ?? translations.en[key]
		},
		[language]
	)

	const value = useMemo<I18nContextValue>(
		() => ({
			language,
			preference,
			setPreference,
			t,
		}),
		[language, preference, setPreference, t]
	)

	return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(): I18nContextValue {
	const ctx = useContext(I18nContext)
	if (!ctx) throw new Error('useI18n must be used within I18nProvider')
	return ctx
}
