import { useStore } from '@nanostores/react'
import { $userAttributes } from '@store/user-attributes'
import { selectLabelStyles, selectStyles } from '@styles/forms'
import { calculateAndUpdateBMR } from '@utils/bmr-functions'
import type { BMREquation } from 'src/types'

export const BMRSelector = () => {
	const { bmrAndExercise } = useStore($userAttributes)

	const handleBMREquationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const equation: BMREquation = event.target.value as unknown as BMREquation
		calculateAndUpdateBMR({ equation })
	}

	return (
		<div className='w-full space-y-2'>
			<label title='Basal metabolic rate' htmlFor='BMREquation' className={selectLabelStyles}>
				BMR_EQUATION
			</label>
			<div className='chamfered bg-obsidian relative p-0.5'>
				<select
					id='BMREquation'
					name='BMREquation'
					defaultValue={bmrAndExercise.equation}
					onChange={handleBMREquationChange}
					className={selectStyles}
				>
					<option value='Mifflin St Jeor'>Mifflin St Jeor</option>
					<option value='Revised Harris-Benedict'>Revised Harris-Benedict</option>
					<option value='Katch-McArdle'>Katch-McArdle</option>
				</select>
			</div>
		</div>
	)
}
