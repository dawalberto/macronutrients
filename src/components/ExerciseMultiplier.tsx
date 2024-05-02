import { defaultExerciseMultiplier } from '@lib/defaults'
import { selectStyles } from '@styles/selects'
import { calculateAndUpdateBMR } from '@utils/bmr-functions'
import clsx from 'clsx'
import type { ExerciseMultiplier as EM } from 'src/types'

export const ExerciseMultiplier = () => {
	const handleExerciseMultiplierChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const exerciseMultiplier = event.target.value as unknown as EM
		calculateAndUpdateBMR({ exerciseMultiplier })
	}

	return (
		<div className='w-full'>
			<label htmlFor='exerciseMultiplier' className='mb-2 block text-sm font-medium text-sky-900'>
				Exercise multiplier
			</label>
			<select
				id='exerciseMultiplier'
				name='exerciseMultiplier'
				defaultValue={defaultExerciseMultiplier}
				onChange={handleExerciseMultiplierChange}
				className={bmrSelectStyles}
			>
				<option value='Sedentary'>🥱 Sedentary</option>
				<option value='Lightly active'>🏃‍♂️ Lightly active</option>
				<option value='Moderately active'>💪 Moderately active</option>
				<option value='Very active'>🏋️‍♀️ Very active</option>
				<option value='Extremely active'>🔥 Extremely active</option>
			</select>
		</div>
	)
}

const bmrSelectStyles = clsx(selectStyles, 'border-sky-300 bg-sky-50 text-sky-900 focus:border-sky-500 focus:ring-sky-500')
