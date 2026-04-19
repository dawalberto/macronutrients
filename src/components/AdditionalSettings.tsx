import { useTranslations } from '@i18n/index'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { BMRSelector } from './BMRSelector'
import { LBMSelector } from './LBMSelector'

export const AdditionalSettings = () => {
	const [showMore, setShowMore] = useState(false)
	const t = useTranslations()

	const handleOnClick = () => {
		const next = !showMore
		setShowMore(next)
		if (next) {
			setTimeout(() => {
				window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' })
			}, 300)
		}
	}

	return (
		<div className='w-full'>
			<button
				onClick={handleOnClick}
				className='flex w-full cursor-pointer items-center justify-between px-0 py-2 transition-colors'
				style={{ borderTop: '1px solid rgba(0,0,0,0.08)' }}
			>
				<span className='text-sm font-medium text-warm-gray-500'>{t.advanced_settings}</span>
				<ChevronDown
					size={15}
					className='text-warm-gray-300 transition-transform duration-300'
					style={{ transform: showMore ? 'rotate(180deg)' : 'rotate(0deg)' }}
				/>
			</button>

			<div style={{ gridTemplateRows: showMore ? '1fr' : '0fr' }} className='grid transition-[grid-template-rows] duration-300 ease-in-out'>
				<div className='overflow-hidden'>
					<div className='mt-6 flex flex-col gap-6'>
						<LBMSelector />
						<BMRSelector />
					</div>
				</div>
			</div>
		</div>
	)
}
