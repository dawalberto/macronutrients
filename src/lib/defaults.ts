import { calculateAge, getExerciseMultiplierValue } from '@utils/global-functions'
import type { Age, BMRAndExercise, BMREquation, ExerciseMultiplier, Genre, Goal, Height, LBM, LBMFormula } from 'src/types'
import { gramsOfProteinsInMaintain, kcalForDefinition, kcalForSurplus } from './settings'

export const defaultWeight: Height = 63
export const defaultHeight: Height = 169
export const defaultAge: Age = calculateAge('1997-12-30')
export const defaultGenre: Genre = 'male'

const lbm = 0.407 * defaultWeight + 0.267 * defaultHeight - 19.2 // 'Boer' formula calculation
export const defaultLBMFormula: LBMFormula = 'Boer'
export const defaultLbm: LBM = {
	formula: defaultLBMFormula,
	lbmKg: Number(lbm.toFixed(1)),
	lbmPercentage: Math.round((lbm / defaultWeight) * 100),
	bodyFatPercentage: Math.round(((defaultWeight - lbm) / defaultWeight) * 100),
}

export const defaultExerciseMultiplier: ExerciseMultiplier = 'Moderately active'
export const defaultBMREquation: BMREquation = 'Katch-McArdle'
const kcalPerDay = 370 + 21.6 * (1 - defaultLbm.bodyFatPercentage / 100) * defaultWeight // 'Katch-McArdle' equation calculation

export const defaultBMRAndExercise: BMRAndExercise = {
	equation: defaultBMREquation,
	exerciseMultiplier: defaultExerciseMultiplier,
	kcalPerDay: Math.round(kcalPerDay),
	kcalPerDayToMaintain: Math.round(kcalPerDay * getExerciseMultiplierValue(defaultExerciseMultiplier)),
	kcalPerDayToSurplus: Math.round(kcalPerDay * getExerciseMultiplierValue(defaultExerciseMultiplier) + kcalForSurplus),
	kcalPerDayToDefinition: Math.round(kcalPerDay * getExerciseMultiplierValue(defaultExerciseMultiplier) - kcalForDefinition),
}
export const defaultGoal: Goal = 'Maintain'
// Default macros for Maintain goal
export const defaultProteinsGrams = Math.round(gramsOfProteinsInMaintain * defaultLbm.lbmKg)
export const defaultFatsGrams = Math.round(defaultLbm.lbmKg)
export const defaultCarbsGrams = Math.round((defaultBMRAndExercise.kcalPerDayToMaintain - (defaultProteinsGrams * 4 + defaultFatsGrams * 9)) / 4)
