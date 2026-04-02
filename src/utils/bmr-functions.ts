import { kcalForDefinition, kcalForSurplus } from '@lib/settings'
import { $updateUserBMRAndExercise, $userAttributes } from '@store/user-attributes'
import { BMREquation, ExerciseMultiplier, Genre } from 'src/types'
import type { BMRAndExercise } from 'src/types'
import { defaultBMRAndExercise } from '../lib/defaults'
import { getExerciseMultiplierValue } from './global-functions'

export const calculateAndUpdateBMR = ({ equation, exerciseMultiplier }: { equation?: BMREquation; exerciseMultiplier?: ExerciseMultiplier }) => {
	const { bmrAndExercise } = $userAttributes.get()
	const updatedEquation = equation ?? bmrAndExercise.equation
	const updatedExerciseMultiplier = exerciseMultiplier ?? bmrAndExercise.exerciseMultiplier
	let bmr: number = defaultBMRAndExercise.kcalPerDay

	switch (updatedEquation) {
		case BMREquation.MIFFLIN_ST_JEOR:
			bmr = calculateBMRMifflin()
			break
		case BMREquation.REVISED_HARRIS_BENEDICT:
			bmr = calculateBMRRevisedHarris()
			break
		case BMREquation.KATCH_MC_ARDLE:
			bmr = calculateBMRKatch()
			break
	}

	const { kcalPerDayToMaintain, kcalPerDayToSurplus, kcalPerDayToDefinition } = getKcalPerDay({
		bmr,
		exerciseMultiplier: updatedExerciseMultiplier,
	})

	$updateUserBMRAndExercise({
		equation: updatedEquation,
		exerciseMultiplier: updatedExerciseMultiplier,
		kcalPerDay: Math.round(bmr),
		kcalPerDayToMaintain: Math.round(kcalPerDayToMaintain),
		kcalPerDayToSurplus: Math.round(kcalPerDayToSurplus),
		kcalPerDayToDefinition: Math.round(kcalPerDayToDefinition),
	})
}

const calculateBMRMifflin = (): number => {
	const { weight, height, genre, age } = $userAttributes.get()
	let bmr = 0

	if (genre === Genre.MALE) {
		bmr = 10 * weight + 6.25 * height - 5 * age + 5
	} else {
		bmr = 10 * weight + 6.25 * height - 5 * age - 161
	}

	return bmr
}

const calculateBMRRevisedHarris = (): number => {
	const { weight, height, genre, age } = $userAttributes.get()
	let bmr = 0

	if (genre === Genre.MALE) {
		bmr = 13.397 * weight + 4.799 * height - 5.677 * age + 88.362
	} else {
		bmr = 9.247 * weight + 3.098 * height - 4.33 * age + 447.593
	}

	return bmr
}

const calculateBMRKatch = (): number => {
	const { weight, lbm } = $userAttributes.get()
	const bmr = 370 + 21.6 * (1 - lbm.bodyFatPercentage / 100) * weight

	return bmr
}

const getKcalPerDay = ({
	bmr,
	exerciseMultiplier,
}: {
	bmr: number
	exerciseMultiplier: ExerciseMultiplier
}): Pick<BMRAndExercise, 'kcalPerDayToMaintain' | 'kcalPerDayToSurplus' | 'kcalPerDayToDefinition'> => {
	const exerciseMultiplierValue = getExerciseMultiplierValue(exerciseMultiplier)

	return {
		kcalPerDayToMaintain: bmr * exerciseMultiplierValue,
		kcalPerDayToSurplus: bmr * exerciseMultiplierValue + kcalForSurplus,
		kcalPerDayToDefinition: bmr * exerciseMultiplierValue - kcalForDefinition,
	}
}
