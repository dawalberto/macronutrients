import { useTranslations } from '@i18n/index'

export const AppHeader = () => {
	const t = useTranslations()

	return (
		<header className='mb-10 flex items-center justify-between pb-6' style={{ borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
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
			<div className='flex items-center gap-1.5'>
				<div className='h-2 w-2 animate-pulse rounded-full bg-emerald-500' />
				<div className='bg-warm-gray-300 h-2 w-2 rounded-full' />
				<div className='bg-warm-gray-300 h-2 w-2 rounded-full' />
			</div>
		</header>
	)
}
