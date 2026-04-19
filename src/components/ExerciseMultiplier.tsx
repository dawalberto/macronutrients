import { defaultExerciseMultiplier } from '@lib/defaults'
import { useTranslations } from '@i18n/index'
import { calculateAndUpdateBMR } from '@utils/bmr-functions'
import { ExerciseMultiplier as EM } from 'src/types'

export const ExerciseMultiplier = () => {
	const t = useTranslations()

	const handleExerciseMultiplierChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const exerciseMultiplier = event.target.value as EM
		calculateAndUpdateBMR({ exerciseMultiplier })
	}

	return (
		<div className='w-full space-y-2'>
			<label htmlFor='exerciseMultiplier' className='select-label'>
				{t.exercise_multiplier}
			</label>
			<select
				id='exerciseMultiplier'
				name='exerciseMultiplier'
				defaultValue={defaultExerciseMultiplier}
				onChange={handleExerciseMultiplierChange}
				className='form-select'
			>
				<option value={EM.SEDENTARY}>{t.exercise_sedentary}</option>
				<option value={EM.LIGHTLY_ACTIVE}>{t.exercise_lightly}</option>
				<option value={EM.MODERATELY_ACTIVE}>{t.exercise_moderately}</option>
				<option value={EM.VERY_ACTIVE}>{t.exercise_very}</option>
				<option value={EM.EXTREMELY_ACTIVE}>{t.exercise_extremely}</option>
			</select>
		</div>
	)
}
