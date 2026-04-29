import { useTranslations } from '@i18n/index'
import { useStore } from '@nanostores/react'
import { $updateUserAge, $updateUserGenre, $updateUserHeight, $updateUserWeight, $userAttributes } from '@store/user-attributes'
import { clsx } from 'clsx'
import { useCallback } from 'react'
import { Genre, UserAttributesNamesDashboard } from 'src/types'

export const Dashboard = () => {
	const { weight, height, age, genre } = useStore($userAttributes)
	const t = useTranslations()

	const handleUserAttributeChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		const attribute = event.target.name as UserAttributesNamesDashboard
		const value = parseInt(event.target.value)

		switch (attribute) {
			case UserAttributesNamesDashboard.WEIGHT:
				$updateUserWeight(value)
				return
			case UserAttributesNamesDashboard.HEIGHT:
				$updateUserHeight(value)
				return
			case UserAttributesNamesDashboard.AGE:
				$updateUserAge(value)
				return
		}
	}, [])

	return (
		<div className='flex w-full flex-col gap-8'>
			{/* Gender toggle */}
			<div className='flex w-full gap-2 rounded-md p-1' style={{ background: '#f6f5f4', border: '1px solid rgba(0,0,0,0.08)' }}>
				<button
					onClick={() => $updateUserGenre(Genre.MALE)}
					className={clsx('flex flex-1 items-center justify-center gap-1.5 rounded py-2 text-sm font-medium transition-[background-color,box-shadow,color]', {
						'bg-white text-[rgba(0,0,0,0.95)] shadow-sm': genre === Genre.MALE,
						'text-warm-gray-500 hover:text-[rgba(0,0,0,0.95)]': genre !== Genre.MALE,
					})}
					style={genre === Genre.MALE ? { boxShadow: '0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)' } : {}}
				>
					{t.male}
				</button>
				<button
					onClick={() => $updateUserGenre(Genre.FEMALE)}
					className={clsx('flex flex-1 items-center justify-center gap-1.5 rounded py-2 text-sm font-medium transition-[background-color,box-shadow,color]', {
						'bg-white text-[rgba(0,0,0,0.95)] shadow-sm': genre === Genre.FEMALE,
						'text-warm-gray-500 hover:text-[rgba(0,0,0,0.95)]': genre !== Genre.FEMALE,
					})}
					style={genre === Genre.FEMALE ? { boxShadow: '0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)' } : {}}
				>
					{t.female}
				</button>
			</div>

			{/* Weight */}
			<div className='space-y-3'>
				<div className='flex items-center justify-between'>
					<span className='select-label mb-0'>{t.weight_kg}</span>
					<input
						type='number'
						name='weight'
						value={weight}
						min='0'
						max='200'
						onChange={handleUserAttributeChange}
						className='w-20 [appearance:textfield] rounded text-right text-sm font-mono font-medium text-[rgba(0,0,0,0.9)] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
						style={{ border: '1px solid #dddddd', padding: '4px 8px', background: '#fff', outline: 'none' }}
					/>
				</div>
				<input type='range' id='weight' name='weight' value={weight} min='0' max='200' onChange={handleUserAttributeChange} />
			</div>

			{/* Height */}
			<div className='space-y-3'>
				<div className='flex items-center justify-between'>
					<span className='select-label mb-0'>{t.height_cm}</span>
					<input
						type='number'
						name='height'
						value={height}
						min='0'
						max='250'
						onChange={handleUserAttributeChange}
						className='w-20 [appearance:textfield] rounded text-right text-sm font-mono font-medium text-[rgba(0,0,0,0.9)] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
						style={{ border: '1px solid #dddddd', padding: '4px 8px', background: '#fff', outline: 'none' }}
					/>
				</div>
				<input type='range' id='height' name='height' value={height} min='0' max='250' onChange={handleUserAttributeChange} />
			</div>

			{/* Age */}
			<div className='space-y-3'>
				<div className='flex items-center justify-between'>
					<span className='select-label mb-0'>{t.age_yrs}</span>
					<input
						type='number'
						name='age'
						value={age}
						min='0'
						max='100'
						onChange={handleUserAttributeChange}
						className='w-20 [appearance:textfield] rounded text-right text-sm font-mono font-medium text-[rgba(0,0,0,0.9)] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
						style={{ border: '1px solid #dddddd', padding: '4px 8px', background: '#fff', outline: 'none' }}
					/>
				</div>
				<input type='range' id='age' name='age' value={age} min='0' max='100' onChange={handleUserAttributeChange} />
			</div>
		</div>
	)
}
