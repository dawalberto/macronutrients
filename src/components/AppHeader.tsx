import { useTranslations } from '@i18n/index'

export const AppHeader = () => {
	const t = useTranslations()

	return (
		<header className='mb-10 pb-6' style={{ borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
			<h1
				style={{
					fontSize: '26px',
					fontWeight: 700,
					letterSpacing: '-0.625px',
					lineHeight: '1.23',
					color: 'rgba(0,0,0,0.95)',
				}}
			>
				{t.page_title}
			</h1>
			<div className='mt-2 flex items-center justify-between'>
				<p style={{ fontSize: '14px', color: '#615d59', fontWeight: 400 }}>{t.system_status}</p>
				<div className='flex items-center gap-1.5'>
					<div className='h-2 w-2 rounded-full animate-pulse bg-emerald-500' />
					<div className='h-2 w-2 rounded-full bg-warm-gray-300' />
					<div className='h-2 w-2 rounded-full bg-warm-gray-300' />
				</div>
			</div>
		</header>
	)
}
