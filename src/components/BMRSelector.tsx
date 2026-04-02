import { useStore } from '@nanostores/react'
import { $userAttributes } from '@store/user-attributes'
import { calculateAndUpdateBMR } from '@utils/bmr-functions'
import { BMREquation } from 'src/types'

export const BMRSelector = () => {
	const { bmrAndExercise } = useStore($userAttributes)

	const handleBMREquationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const equation = event.target.value as BMREquation
		calculateAndUpdateBMR({ equation })
	}

	return (
		<div className='w-full space-y-2'>
			<label title='Basal metabolic rate' htmlFor='BMREquation' className='select-label'>
				BMR_EQUATION
			</label>
			<div className='chamfered bg-obsidian relative p-0.5'>
				<select
					id='BMREquation'
					name='BMREquation'
					defaultValue={bmrAndExercise.equation}
					onChange={handleBMREquationChange}
					className='form-select'
				>
					<option value={BMREquation.MIFFLIN_ST_JEOR}>Mifflin St Jeor</option>
					<option value={BMREquation.REVISED_HARRIS_BENEDICT}>Revised Harris-Benedict</option>
					<option value={BMREquation.KATCH_MC_ARDLE}>Katch-McArdle</option>
				</select>
			</div>
		</div>
	)
}
