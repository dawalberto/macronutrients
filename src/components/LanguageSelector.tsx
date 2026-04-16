import { useStore } from '@nanostores/react'
import { $locale, type Locale } from '@store/locale'

const LOCALE_LABELS: Record<Locale, string> = {
	en: 'EN // ENGLISH',
	zh: 'ZH // 中文',
	hi: 'HI // हिन्दी',
	es: 'ES // ESPAÑOL',
	fr: 'FR // FRANÇAIS',
}

const SUPPORTED: Locale[] = ['en', 'es', 'fr', 'zh', 'hi']
const BASE = ''

function navigateToLocale(newLocale: Locale) {
	const path = window.location.pathname
	// Replace the current locale segment with the new one
	const currentLocale = path.split('/').find((seg) => SUPPORTED.includes(seg as Locale))
	const newPath = currentLocale ? path.replace(`/${currentLocale}/`, `/${newLocale}/`) : `${BASE}/${newLocale}/`
	window.location.assign(newPath)
}

export const LanguageSelector = () => {
	const locale = useStore($locale)

	return (
		<div className='chamfered bg-obsidian relative p-0.5'>
			<select
				value={locale}
				onChange={(e) => navigateToLocale(e.target.value as Locale)}
				className='form-select text-[clamp(8px,1vw,10px)]'
				aria-label='Language / Idioma / Langue / 语言 / भाषा'
			>
				{(Object.entries(LOCALE_LABELS) as [Locale, string][]).map(([code, label]) => (
					<option key={code} value={code}>
						{label}
					</option>
				))}
			</select>
		</div>
	)
}
