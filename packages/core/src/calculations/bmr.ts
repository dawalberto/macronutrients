import { kcalForDefinition, kcalForSurplus } from '../settings'
import type { BMRAndExercise, BMREquation, ExerciseMultiplier, Genre, UserAttributes, Weight } from '../types'
import { getExerciseMultiplierValue } from '../utils/global'

export const calculateBMRKcalPerDay = ({
	weight,
	height,
	age,
	genre,
	lbmBodyFatPercentage,
	equation,
}: {
	weight: Weight
	height: number
	age: number
	genre: Genre
	lbmBodyFatPercentage: number
	equation: BMREquation
}): number => {
	switch (equation) {
		case 'Mifflin St Jeor':
			return genre === 'male' ? 10 * weight + 6.25 * height - 5 * age + 5 : 10 * weight + 6.25 * height - 5 * age - 161
		case 'Revised Harris-Benedict':
			return genre === 'male' ? 13.397 * weight + 4.799 * height - 5.677 * age + 88.362 : 9.247 * weight + 3.098 * height - 4.33 * age + 447.593
		case 'Katch-McArdle':
			return 370 + 21.6 * (1 - lbmBodyFatPercentage / 100) * weight
	}
}

export const deriveBMRAndExercise = ({
	weight,
	height,
	age,
	genre,
	lbmBodyFatPercentage,
	equation,
	exerciseMultiplier,
}: {
	weight: Weight
	height: number
	age: number
	genre: Genre
	lbmBodyFatPercentage: number
	equation: BMREquation
	exerciseMultiplier: ExerciseMultiplier
}): BMRAndExercise => {
	const bmr = calculateBMRKcalPerDay({ weight, height, age, genre, lbmBodyFatPercentage, equation })
	const multiplier = getExerciseMultiplierValue(exerciseMultiplier)
	return {
		equation,
		exerciseMultiplier,
		kcalPerDay: Math.round(bmr),
		kcalPerDayToMaintain: Math.round(bmr * multiplier),
		kcalPerDayToSurplus: Math.round(bmr * multiplier + kcalForSurplus),
		kcalPerDayToDefinition: Math.round(bmr * multiplier - kcalForDefinition),
	}
}

export const getBMRInputsFromState = (user: UserAttributes) => {
	return {
		weight: user.weight,
		height: user.height,
		age: user.age,
		genre: user.genre,
		lbmBodyFatPercentage: user.lbm.bodyFatPercentage,
		equation: user.bmrAndExercise.equation,
		exerciseMultiplier: user.bmrAndExercise.exerciseMultiplier,
	}
}
