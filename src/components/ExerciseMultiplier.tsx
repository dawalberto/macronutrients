import { defaultExerciseMultiplier } from '@lib/defaults'
import { calculateAndUpdateBMR } from '@utils/bmr-functions'
import { Activity } from 'lucide-react'
import { ExerciseMultiplier as EM } from 'src/types'

export const ExerciseMultiplier = () => {
	const handleExerciseMultiplierChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const exerciseMultiplier = event.target.value as EM
		calculateAndUpdateBMR({ exerciseMultiplier })
	}

	return (
		<div className='w-full space-y-2'>
			<label htmlFor='exerciseMultiplier' className='select-label'>
				<Activity size={10} /> EXERCISE_MULTIPLIER
			</label>
			<div className='chamfered bg-obsidian relative p-0.5'>
				<select
					id='exerciseMultiplier'
					name='exerciseMultiplier'
					defaultValue={defaultExerciseMultiplier}
					onChange={handleExerciseMultiplierChange}
					className='form-select'
				>
					<option value={EM.SEDENTARY}>Sedentary</option>
					<option value={EM.LIGHTLY_ACTIVE}>Lightly active</option>
					<option value={EM.MODERATELY_ACTIVE}>Moderately active</option>
					<option value={EM.VERY_ACTIVE}>Very active</option>
					<option value={EM.EXTREMELY_ACTIVE}>Extremely active</option>
				</select>
			</div>
		</div>
	)
}
