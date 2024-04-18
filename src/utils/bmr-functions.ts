import { $updateUserBMRAndExercise, $userAttributes } from '@store/user-attributes'
import type { BMRAndExercise, BMREquation, ExerciseMultiplier } from 'src/types'
import { defaultBMRAndExercise, defaultDeficit, defaultSurplus } from './defaults'
import { getExerciseMultiplierValue } from './global-functions'

export const calculateAndUpdateBMR = ({ equation, exerciseMultiplier }: { equation?: BMREquation; exerciseMultiplier?: ExerciseMultiplier }) => {
	const { bmrAndExercise } = $userAttributes.get()
	let bmr: BMRAndExercise = defaultBMRAndExercise

	switch (equation ?? bmrAndExercise.equation) {
		case 'Mifflin St Jeor':
			bmr = calculateBMRMifflin({ exerciseMultiplier })
			break
		case 'Revised Harris-Benedict':
			bmr = calculateBMRRevisedHarris({ exerciseMultiplier })
			break
		case 'Katch-McArdle':
			bmr = calculateBMRKatch({ exerciseMultiplier })
			break
	}

	$updateUserBMRAndExercise(bmr)
}

const calculateBMRMifflin = ({ exerciseMultiplier }: { exerciseMultiplier?: ExerciseMultiplier | undefined }): BMRAndExercise => {
	const { weight, height, genre, age, bmrAndExercise } = $userAttributes.get()
	const exerciseMultiplierValue = getExerciseMultiplierValue(exerciseMultiplier ?? bmrAndExercise.exerciseMultiplier)
	let bmr = 0

	if (genre === 'male') {
		bmr = 10 * weight + 6.25 * height - 5 * age + 5
	} else {
		bmr = 10 * weight + 6.25 * height - 5 * age - 161
	}

	const kcalPerDayToMaintain = bmr * exerciseMultiplierValue
	const kcalPerDayToSurplus = bmr * exerciseMultiplierValue + defaultSurplus
	const kcalPerDayToDeficit = bmr * exerciseMultiplierValue - defaultDeficit

	return {
		equation: 'Mifflin St Jeor',
		exerciseMultiplier: exerciseMultiplier ?? bmrAndExercise.exerciseMultiplier,
		kcalPerDay: Math.round(bmr),
		kcalPerDayToMaintain: Math.round(kcalPerDayToMaintain),
		kcalPerDayToSurplus: Math.round(kcalPerDayToSurplus),
		kcalPerDayToDeficit: Math.round(kcalPerDayToDeficit),
	}
}

const calculateBMRRevisedHarris = ({ exerciseMultiplier }: { exerciseMultiplier?: ExerciseMultiplier | undefined }): BMRAndExercise => {
	const { weight, height, genre, age, bmrAndExercise } = $userAttributes.get()
	const exerciseMultiplierValue = getExerciseMultiplierValue(exerciseMultiplier ?? bmrAndExercise.exerciseMultiplier)
	let bmr = 0

	if (genre === 'male') {
		bmr = 13.397 * weight + 4.799 * height - 5.677 * age + 88.362
	} else {
		bmr = 9.247 * weight + 3.098 * height - 4.33 * age + 447.593
	}

	const kcalPerDayToMaintain = bmr * exerciseMultiplierValue
	const kcalPerDayToSurplus = bmr * exerciseMultiplierValue + defaultSurplus
	const kcalPerDayToDeficit = bmr * exerciseMultiplierValue - defaultDeficit

	return {
		equation: 'Revised Harris-Benedict',
		exerciseMultiplier: exerciseMultiplier ?? bmrAndExercise.exerciseMultiplier,
		kcalPerDay: Math.round(bmr),
		kcalPerDayToMaintain: Math.round(kcalPerDayToMaintain),
		kcalPerDayToSurplus: Math.round(kcalPerDayToSurplus),
		kcalPerDayToDeficit: Math.round(kcalPerDayToDeficit),
	}
}

const calculateBMRKatch = ({ exerciseMultiplier }: { exerciseMultiplier?: ExerciseMultiplier | undefined }): BMRAndExercise => {
	const { weight, lbm, bmrAndExercise } = $userAttributes.get()
	const exerciseMultiplierValue = getExerciseMultiplierValue(exerciseMultiplier ?? bmrAndExercise.exerciseMultiplier)
	const bmr = 370 + 21.6 * (1 - lbm.bodyFatPercentage / 100) * weight

	const kcalPerDayToMaintain = bmr * exerciseMultiplierValue
	const kcalPerDayToSurplus = bmr * exerciseMultiplierValue + defaultSurplus
	const kcalPerDayToDeficit = bmr * exerciseMultiplierValue - defaultDeficit

	return {
		equation: 'Katch-McArdle',
		exerciseMultiplier: exerciseMultiplier ?? bmrAndExercise.exerciseMultiplier,
		kcalPerDay: Math.round(bmr),
		kcalPerDayToMaintain: Math.round(kcalPerDayToMaintain),
		kcalPerDayToSurplus: Math.round(kcalPerDayToSurplus),
		kcalPerDayToDeficit: Math.round(kcalPerDayToDeficit),
	}
}
