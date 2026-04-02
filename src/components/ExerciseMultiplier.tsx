import { defaultExerciseMultiplier } from '@lib/defaults'
import { selectLabelStyles, selectStyles } from '@styles/forms'
import { calculateAndUpdateBMR } from '@utils/bmr-functions'
import { Activity, ChevronDown } from 'lucide-react'
import type { ExerciseMultiplier as EM } from 'src/types'

export const ExerciseMultiplier = () => {
	const handleExerciseMultiplierChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const exerciseMultiplier = event.target.value as unknown as EM
		calculateAndUpdateBMR({ exerciseMultiplier })
	}

	return (
		<div className='w-full space-y-2'>
			<label htmlFor='exerciseMultiplier' className={selectLabelStyles}>
				<Activity size={10} /> EXERCISE_MULTIPLIER
			</label>
			<div className='relative chamfered bg-obsidian p-0.5'>
				<select
					id='exerciseMultiplier'
					name='exerciseMultiplier'
					defaultValue={defaultExerciseMultiplier}
					onChange={handleExerciseMultiplierChange}
					className={selectStyles}
				>
					<option value='Sedentary'>Sedentary</option>
					<option value='Lightly active'>Lightly active</option>
					<option value='Moderately active'>Moderately active</option>
					<option value='Very active'>Very active</option>
					<option value='Extremely active'>Extremely active</option>
				</select>
				<div className='pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-concrete'>
					<ChevronDown size={20} />
				</div>
			</div>
		</div>
	)
}
