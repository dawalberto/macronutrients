import { useStore } from '@nanostores/react'
import { $locale, setLocale, type Locale } from '@store/locale'

const LOCALE_LABELS: Record<Locale, string> = {
	en: 'EN // ENGLISH',
	zh: 'ZH // 中文',
	hi: 'HI // हिन्दी',
	es: 'ES // ESPAÑOL',
	fr: 'FR // FRANÇAIS',
}

export const LanguageSelector = () => {
	const locale = useStore($locale)

	return (
		<div className='chamfered bg-obsidian relative p-0.5'>
			<select
				value={locale}
				onChange={(e) => setLocale(e.target.value as Locale)}
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
