import { useCallback, useState } from 'react'
import { BMRSelector } from './BMRSelector'
import { LBMSelector } from './LBMSelector'

export const AdditionalSettings = () => {
	const [showMore, setShowMore] = useState(false)

	const handleOnClick = useCallback(() => {
		setShowMore((shown) => !shown)
		window.scrollTo({
			top: document.documentElement.scrollHeight,
			behavior: 'smooth',
		})
	}, [])

	return (
		<div className='w-full'>
			<button
				onClick={handleOnClick}
				className='bg-obsidian brutalist-border hover:brutalist-border-active mx-auto block w-fit px-6 py-3 font-bold tracking-widest text-gray-300 transition-all'
			>
				ADVANCED_SETTINGS
			</button>
			{/* TODO - ANIMATE THIS SHOW/HIDE; USE REACT 19 <ACTIVITY> COMPONENT */}
			{showMore && (
				<div className='mt-6 flex flex-col gap-6'>
					<div>
						<LBMSelector />
					</div>
					<div>
						<BMRSelector />
					</div>
				</div>
			)}
		</div>
	)
}
