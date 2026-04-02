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
				className='mx-auto block w-fit bg-obsidian px-6 py-3 font-bold tracking-widest text-gray-300 brutalist-border transition-all hover:brutalist-border-active'
			>
				ADVANCED_SETTINGS
			</button>
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
