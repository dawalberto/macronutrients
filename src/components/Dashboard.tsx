import { useStore } from '@nanostores/react'
import { $userAttributes, updateUserAge, updateUserGenre, updateUserHeight, updateUserLBM, updateUserWeight } from '@store/user-attributes'
import '@styles/dashboard.css'
import { calculateLBM } from '@utils/functions'
import React, { useCallback } from 'react'
import type { Genre } from 'src/types'

const Dashboard = () => {
	const { weight, height, age, genre, lbm } = useStore($userAttributes)

	const handleWeightChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const value = parseInt(event.target.value)
			updateUserWeight(value)
			calculateLBM({ height, weight, genre, LBMFormulaSelected: lbm.formula, callbackWithLBMCalculated: updateUserLBM })
		},
		[height, weight, genre, lbm]
	)

	const handleHeightChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const value = parseInt(event.target.value)
			updateUserHeight(value)
			calculateLBM({ height, weight, genre, LBMFormulaSelected: lbm.formula, callbackWithLBMCalculated: updateUserLBM })
		},
		[height, weight, genre, lbm]
	)

	const handleAgeChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const value = parseInt(event.target.value)
			updateUserAge(value)
			calculateLBM({ height, weight, genre, LBMFormulaSelected: lbm.formula, callbackWithLBMCalculated: updateUserLBM })
		},
		[height, weight, genre, lbm]
	)

	const handleGenreChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const value = event.target.value as Genre
			updateUserGenre(value)
			calculateLBM({ height, weight, genre, LBMFormulaSelected: lbm.formula, callbackWithLBMCalculated: updateUserLBM })
		},
		[height, weight, genre, lbm]
	)

	return (
		<div className='mx-auto flex w-full flex-col items-center justify-center gap-6 text-sm font-medium text-amber-900'>
			<div className='flex w-full justify-center gap-6'>
				<label className='radio-button'>
					<input type='radio' name='genre' value='male' checked={genre === 'male'} onChange={handleGenreChange} />
					🙋‍♂️ Male
					<span />
				</label>
				<label className='radio-button'>
					<input type='radio' name='genre' value='female' checked={genre === 'female'} onChange={handleGenreChange} />
					🙋‍♀️ Female
					<span />
				</label>
			</div>
			<div className='flex w-full flex-col items-start gap-3'>
				<label htmlFor='weightRangeInput'>
					Weight: <span className='font-bold text-amber-600'>{weight}</span> kg
				</label>
				<input type='range' value={weight} min='0' max='200' onChange={handleWeightChange} />
			</div>
			<div className='flex w-full flex-col items-start gap-3'>
				<label htmlFor='heightRangeInput'>
					Height: <span className='font-bold text-amber-600'>{height}</span> cm
				</label>
				<input type='range' value={height} min='0' max='250' onChange={handleHeightChange} />
			</div>
			<div className='flex w-full flex-col items-start gap-3'>
				<label htmlFor='ageRangeInput'>
					Age: <span className='font-bold text-amber-600'>{age}</span>
				</label>
				<input type='range' value={age} min='0' max='100' onChange={handleAgeChange} />
			</div>
		</div>
	)
}

export default Dashboard
