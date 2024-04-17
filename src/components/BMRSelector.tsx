import { useStore } from '@nanostores/react'
import { $userAttributes, updateUserBMRAndExercise } from '@store/user-attributes'
import { defaultExerciseMultiplier } from '@utils/defaults'
import { getExerciseMultiplierValue } from '@utils/functions'
import { useCallback, useState } from 'react'
import type { BMREquation, ExerciseMultiplier } from 'src/types'

export const BMRSelector = () => {
	const { height, weight, genre, age, bmrAndExercise, lbm } = useStore($userAttributes)
	const [exerciseMultiplier, setExerciseMultiplier] = useState({
		label: defaultExerciseMultiplier,
		value: getExerciseMultiplierValue(defaultExerciseMultiplier),
	})

	const handleBMREquationChange = useCallback(
		(event: React.ChangeEvent<HTMLSelectElement>) => {
			const BMREquationSelected: BMREquation = event.target.value as unknown as BMREquation
			let bmr = 0
			switch (BMREquationSelected) {
				case 'Mifflin St Jeor':
					if (genre === 'male') {
						bmr = 10 * weight + 6.25 * height - 5 * age + 5
					} else {
						bmr = 10 * weight + 6.25 * height - 5 * age - 161
					}
					break
				case 'Revised Harris-Benedict':
					if (genre === 'male') {
						bmr = 13.397 * weight + 4.799 * height - 5.677 * age + 88.362
					} else {
						bmr = 9.247 * weight + 3.098 * height - 4.33 * age + 447.593
					}
					break
				case 'Katch-McArdle':
					bmr = 370 + 21.6 * (1 - lbm.bodyFatPercentage / 100) * weight
					break
			}
			updateUserBMRAndExercise({
				equation: BMREquationSelected,
				exerciseMultiplier: exerciseMultiplier.label,
				kcalPerDay: Math.round(bmr),
				kcalPerDayMultipliedByExercise: Math.round(bmr * exerciseMultiplier.value),
			})
		},
		[weight, height, age, lbm, exerciseMultiplier]
	)

	const handleExerciseMultiplierChange = useCallback(
		(event: React.ChangeEvent<HTMLSelectElement>) => {
			const exerciseLabel = event.target.value as unknown as ExerciseMultiplier
			const exerciseValue = getExerciseMultiplierValue(exerciseLabel)
			setExerciseMultiplier({ label: exerciseLabel, value: exerciseValue })
			updateUserBMRAndExercise({ ...bmrAndExercise, kcalPerDayMultipliedByExercise: Math.round(bmrAndExercise.kcalPerDay * exerciseValue) })
		},
		[bmrAndExercise]
	)

	return (
		<div className='flex w-full flex-col gap-4'>
			<div>
				<h1 className='mb-2 block text-sm font-medium text-sky-900'>BMRSelector</h1>
				<select onChange={handleBMREquationChange} id='BMREquation' className='block w-full border border-sky-300 bg-sky-50 p-2.5 text-sm text-sky-900 focus:border-sky-500 focus:ring-sky-500'>
					<option value='Mifflin St Jeor'>Mifflin St Jeor</option>
					<option value='Revised Harris-Benedict'>Revised Harris-Benedict</option>
					<option selected value='Katch-McArdle'>
						Katch-McArdle
					</option>
				</select>
			</div>
			<div>
				<h1 className='mb-2 block text-sm font-medium text-sky-900'>Exercise multiplier</h1>
				<select
					onChange={handleExerciseMultiplierChange}
					id='exerciseMultiplier'
					className='block w-full border border-sky-300 bg-sky-50 p-2.5 text-sm text-sky-900 focus:border-sky-500 focus:ring-sky-500'
				>
					<option value='Sedentary'>Sedentary 🥱</option>
					<option value='Lightly active'>Lightly active 🏃‍♂️</option>
					<option selected value='Moderately active'>
						Moderately active 💪
					</option>
					<option value='Very active'>Very active 🏋️‍♀️</option>
					<option value='Extremely active'>Extremely active 🔥</option>
				</select>
			</div>
		</div>
	)
}
