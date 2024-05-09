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
		<div className='mt-6 w-full'>
			<button
				onClick={handleOnClick}
				className='mx-auto block w-fit rounded-full bg-amber-400 px-4 py-2 text-center font-semibold text-amber-950 shadow-md transition-all duration-150 hover:scale-105 hover:shadow-lg active:scale-100 active:border-amber-500 active:shadow-none active:ring-amber-500'
			>
				Additional settings
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
