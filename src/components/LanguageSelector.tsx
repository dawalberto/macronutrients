import { useStore } from '@nanostores/react'
import { $locale, type Locale } from '@store/locale'

const LOCALE_LABELS: Record<Locale, string> = {
	en: 'English',
	zh: '中文',
	hi: 'हिन्दी',
	es: 'Español',
	fr: 'Français',
}

const SUPPORTED: Locale[] = ['en', 'es', 'fr', 'zh', 'hi']
const BASE = ''

function navigateToLocale(newLocale: Locale) {
	const path = window.location.pathname
	const currentLocale = path.split('/').find((seg) => SUPPORTED.includes(seg as Locale))
	const newPath = currentLocale ? path.replace(`/${currentLocale}/`, `/${newLocale}/`) : `${BASE}/${newLocale}/`
	window.location.assign(newPath)
}

export const LanguageSelector = () => {
	const locale = useStore($locale)

	return (
		<select
			value={locale}
			onChange={(e) => navigateToLocale(e.target.value as Locale)}
			className='form-select w-auto text-xs'
			aria-label='Language / Idioma / Langue / 语言 / भाषा'
		>
			{(Object.entries(LOCALE_LABELS) as [Locale, string][]).map(([code, label]) => (
				<option key={code} value={code}>
					{label}
				</option>
			))}
		</select>
	)
}
