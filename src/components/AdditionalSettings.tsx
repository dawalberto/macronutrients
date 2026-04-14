import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { BMRSelector } from './BMRSelector'
import { LBMSelector } from './LBMSelector'

export const AdditionalSettings = () => {
	const [showMore, setShowMore] = useState(false)

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
			<div className='chamfered brutalist-border bg-obsidian p-0.5'>
				<button
					onClick={handleOnClick}
					className='chamfered hover:bg-obsidian relative w-full cursor-pointer bg-[#0A0A0A] px-6 py-4 font-extrabold tracking-tighter transition-all active:shadow-none'
				>
					<span className='flex items-center justify-center gap-2 text-base text-gray-300'>
						ADVANCED_SETTINGS
						<ChevronDown
							size={16}
							className='transition-transform duration-300'
							style={{ transform: showMore ? 'rotate(180deg)' : 'rotate(0deg)' }}
						/>
					</span>
				</button>
			</div>

			<div
				style={{ gridTemplateRows: showMore ? '1fr' : '0fr' }}
				className='grid transition-[grid-template-rows] duration-300 ease-in-out'
			>
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
