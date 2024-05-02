import { defaultBMREquation, defaultExerciseMultiplier } from '@lib/defaults'
import { selectStyles } from '@styles/selects'
import { calculateAndUpdateBMR } from '@utils/bmr-functions'
import clsx from 'clsx'
import type { BMREquation, ExerciseMultiplier } from 'src/types'

export const BMRSelector = () => {
	const handleBMREquationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const equation: BMREquation = event.target.value as unknown as BMREquation
		calculateAndUpdateBMR({ equation })
	}

	const handleExerciseMultiplierChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const exerciseMultiplier = event.target.value as unknown as ExerciseMultiplier
		calculateAndUpdateBMR({ exerciseMultiplier })
	}

	return (
		<div className='flex w-full flex-col gap-4'>
			<div>
				<label htmlFor='BMREquation' className='mb-2 block text-sm font-medium text-sky-900'>
					BMR equation
				</label>
				<select
					id='BMREquation'
					name='BMREquation'
					defaultValue={defaultBMREquation}
					onChange={handleBMREquationChange}
					className={bmrSelectStyles}
				>
					<option value='Mifflin St Jeor'>Mifflin St Jeor</option>
					<option value='Revised Harris-Benedict'>Revised Harris-Benedict</option>
					<option value='Katch-McArdle'>Katch-McArdle</option>
				</select>
			</div>
			<div>
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
		</div>
	)
}

const bmrSelectStyles = clsx(selectStyles, 'border-sky-300 bg-sky-50 text-sky-900 focus:border-sky-500 focus:ring-sky-500')
