export type UserAttributes = {
	height: number
	weight: number
	age: number
	genre: Genre
	lbm: LBM
	bmrAndExercise: BMRAndExercise
	goal: Goal
}

export type Height = number
export type Weight = number
export type Age = number

export type LBM = {
	formula: LBMFormula
	lbmKg: number
	lbmPercentage: number
	bodyFatPercentage: number
}
export type BMRAndExercise = {
	equation: BMREquation
	exerciseMultiplier: ExerciseMultiplier
	kcalPerDay: number
	kcalPerDayToMaintain: number
	kcalPerDayToSurplus: number
	kcalPerDayToDefinition: number
}

export enum Genre {
	MALE = 'male',
	FEMALE = 'female',
}

export enum LBMFormula {
	BOER = 'Boer',
	JAMES = 'James',
	HUME = 'Hume',
	MANUAL = 'Manual',
}

export enum BMREquation {
	MIFFLIN_ST_JEOR = 'Mifflin St Jeor',
	REVISED_HARRIS_BENEDICT = 'Revised Harris-Benedict',
	KATCH_MC_ARDLE = 'Katch-McArdle',
}

export enum ExerciseMultiplier {
	SEDENTARY = 'Sedentary',
	LIGHTLY_ACTIVE = 'Lightly active',
	MODERATELY_ACTIVE = 'Moderately active',
	VERY_ACTIVE = 'Very active',
	EXTREMELY_ACTIVE = 'Extremely active',
}

export enum Goal {
	MAINTAIN = 'Maintain',
	SURPLUS = 'Surplus',
	DEFINITION = 'Definition',
}

export enum UserAttributesNamesDashboard {
	GENRE = 'genre',
	WEIGHT = 'weight',
	HEIGHT = 'height',
	AGE = 'age',
}
