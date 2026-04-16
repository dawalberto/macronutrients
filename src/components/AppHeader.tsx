import { useTranslations } from '@i18n/index'

export const AppHeader = () => {
	const t = useTranslations()

	return (
		<header className='mb-8 border-b-8 border-[#4A4A4A] pb-4'>
			<h1 className='text-4xl leading-none font-extrabold italic'>{t.page_title}</h1>
			<div className='mt-1 flex items-center justify-between'>
				<p className='text-[clamp(10px,1.1vw,12px)] opacity-60'>{t.system_status}</p>
				<div className='flex gap-1'>
					<div className='h-2 w-2 animate-pulse bg-emerald-500'></div>
					<div className='bg-slate-brutalist h-2 w-2'></div>
					<div className='bg-slate-brutalist h-2 w-2'></div>
				</div>
			</div>
		</header>
	)
}
