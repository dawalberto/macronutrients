import { calculateAndUpdateBMR } from '@utils/bmr-functions'
import { defaultBMREquation, defaultExerciseMultiplier } from '@utils/defaults'
import { useCallback } from 'react'
import type { BMREquation, ExerciseMultiplier } from 'src/types'

export const BMRSelector = () => {
	const handleBMREquationChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
		const equation: BMREquation = event.target.value as unknown as BMREquation
		calculateAndUpdateBMR({ equation })
	}, [])

	const handleExerciseMultiplierChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
		const exerciseMultiplier = event.target.value as unknown as ExerciseMultiplier
		calculateAndUpdateBMR({ exerciseMultiplier })
	}, [])

	return (
		<div className='flex w-full flex-col gap-4'>
			<div>
				<h1 className='mb-2 block text-sm font-medium text-sky-900'>BMR equation</h1>
				<select
					defaultValue={defaultBMREquation}
					onChange={handleBMREquationChange}
					className='block w-full border border-sky-300 bg-sky-50 p-2.5 text-sm text-sky-900 focus:border-sky-500 focus:ring-sky-500'
				>
					<option value='Mifflin St Jeor'>Mifflin St Jeor</option>
					<option value='Revised Harris-Benedict'>Revised Harris-Benedict</option>
					<option value='Katch-McArdle'>Katch-McArdle</option>
				</select>
			</div>
			<div>
				<h1 className='mb-2 block text-sm font-medium text-sky-900'>Exercise multiplier</h1>
				<select
					defaultValue={defaultExerciseMultiplier}
					onChange={handleExerciseMultiplierChange}
					className='block w-full border border-sky-300 bg-sky-50 p-2.5 text-sm text-sky-900 focus:border-sky-500 focus:ring-sky-500'
				>
					<option value='Sedentary'>🥱 Sedentary</option>
					<option value='Lightly active'>🏃‍♂️ Lightly active</option>
					<option value='Moderately active'>💪 Moderately active</option>
					<option value='Very active'>🏋️‍♀️ Very active</option>
					<option value='Extremely active'>🔥 Extremely active</option>
				</select>
			</div>
		</div>
	)
}
