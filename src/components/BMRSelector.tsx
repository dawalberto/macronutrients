import { useStore } from '@nanostores/react'
import { $userAttributes } from '@store/user-attributes'
import { selectLabelStyles, selectStyles } from '@styles/forms'
import { calculateAndUpdateBMR } from '@utils/bmr-functions'
import clsx from 'clsx'
import type { BMREquation } from 'src/types'

export const BMRSelector = () => {
	const { bmrAndExercise } = useStore($userAttributes)

	const handleBMREquationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const equation: BMREquation = event.target.value as unknown as BMREquation
		calculateAndUpdateBMR({ equation })
	}

	return (
		<div className='w-full'>
			<label title='Basal metabolic rate' htmlFor='BMREquation' className={clsx(selectLabelStyles, 'text-amber-900')}>
				BMR equation
			</label>
			<select
				id='BMREquation'
				name='BMREquation'
				defaultValue={bmrAndExercise.equation}
				onChange={handleBMREquationChange}
				className={clsx(selectStyles, 'border-amber-300 bg-amber-50 text-amber-900 focus:border-amber-500 focus:ring-amber-500')}
			>
				<option value='Mifflin St Jeor'>Mifflin St Jeor</option>
				<option value='Revised Harris-Benedict'>Revised Harris-Benedict</option>
				<option value='Katch-McArdle'>Katch-McArdle</option>
			</select>
		</div>
	)
}
