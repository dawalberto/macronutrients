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
export type Genre = 'male' | 'female'
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

export type LBMFormula = 'Boer' | 'James' | 'Hume' | 'Manual'
export type BMREquation = 'Mifflin St Jeor' | 'Revised Harris-Benedict' | 'Katch-McArdle'
export type ExerciseMultiplier = 'Sedentary' | 'Lightly active' | 'Moderately active' | 'Very active' | 'Extremely active'
export type UserAttributesNamesDashboard = 'genre' | 'weight' | 'height' | 'age'
export type Goal = 'Maintain' | 'Surplus' | 'Definition'
