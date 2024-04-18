import type { Age, BMRAndExercise, BMREquation, ExerciseMultiplier, Genre, Height, LBM, LBMFormula } from 'src/types'
import { calculateAge, getExerciseMultiplierValue } from './global-functions'

export const defaultWeight: Height = 63
export const defaultHeight: Height = 169
export const defaultAge: Age = calculateAge('1997-12-30')
export const defaultGenre: Genre = 'male'

const lbm = 0.407 * defaultWeight + 0.267 * defaultHeight - 19.2
export const defaultLBMFormula: LBMFormula = 'Boer'
export const defaultLbm: LBM = {
	formula: 'Boer',
	lbmKg: Number(lbm.toFixed(1)),
	lbmPercentage: Math.round((lbm / defaultWeight) * 100),
	bodyFatPercentage: Math.round(((defaultWeight - lbm) / defaultWeight) * 100),
}

export const defaultBMREquation: BMREquation = 'Katch-McArdle'
export const defaultExerciseMultiplier: ExerciseMultiplier = 'Moderately active'
const kcalPerDay = 370 + 21.6 * (1 - defaultLbm.bodyFatPercentage / 100) * defaultWeight
export const defaultBMRAndExercise: BMRAndExercise = {
	equation: defaultBMREquation,
	exerciseMultiplier: defaultExerciseMultiplier,
	kcalPerDay: Math.round(kcalPerDay),
	kcalPerDayMultipliedByExercise: Math.round(kcalPerDay * getExerciseMultiplierValue(defaultExerciseMultiplier)),
}
