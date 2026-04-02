import { useState } from 'react'
import { BMRSelector } from './BMRSelector'
import { LBMSelector } from './LBMSelector'

export const AdditionalSettings = () => {
	const [showMore, setShowMore] = useState(false)

	const handleOnClick = () => {
		setShowMore((shown) => !shown)
		window.scrollTo({
			top: document.documentElement.scrollHeight,
			behavior: 'smooth',
		})
	}

	return (
		<div className='w-full'>
			<button
				onClick={handleOnClick}
				className='bg-obsidian brutalist-border hover:brutalist-border-active mx-auto block w-fit px-6 py-3 font-bold tracking-widest text-gray-300 transition-all'
			>
				ADVANCED_SETTINGS
			</button>
			{showMore && (
				<div className='mt-6 flex flex-col gap-6'>
					<LBMSelector />
					<BMRSelector />
				</div>
			)}
		</div>
	)
}
