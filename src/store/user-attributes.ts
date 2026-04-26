import { defaultAge, defaultBMRAndExercise, defaultGenre, defaultGoal, defaultHeight, defaultLbm, defaultWeight } from '@lib/defaults'
import { kcalForDefinition, kcalForSurplus } from '@lib/settings'
import { calculateAndUpdateBMR } from '@utils/bmr-functions'
import { getExerciseMultiplierValue } from '@utils/global-functions'
import { calculateAndUpdateLBM } from '@utils/lbm-functions'
import { listenKeys, map } from 'nanostores'
import { BMREquation, ExerciseMultiplier, Genre, Goal, LBMFormula } from 'src/types'
import type { Age, BMRAndExercise, Height, LBM, UserAttributes, Weight } from 'src/types'

const STORAGE_KEY = 'macrocalc-user'

type PersistedInputs = {
	height: Height
	weight: Weight
	age: Age
	genre: Genre
	goal: Goal
	lbmFormula: LBMFormula
	lbmKg: number
	bmrEquation: BMREquation
	exerciseMultiplier: ExerciseMultiplier
}

function isValidPersistedInputs(p: unknown): p is PersistedInputs {
	if (!p || typeof p !== 'object') return false
	const o = p as Record<string, unknown>
	return (
		typeof o.height === 'number' &&
		isFinite(o.height) &&
		typeof o.weight === 'number' &&
		isFinite(o.weight) &&
		typeof o.age === 'number' &&
		isFinite(o.age) &&
		(Object.values(Genre) as unknown[]).includes(o.genre) &&
		(Object.values(Goal) as unknown[]).includes(o.goal) &&
		(Object.values(LBMFormula) as unknown[]).includes(o.lbmFormula) &&
		typeof o.lbmKg === 'number' &&
		isFinite(o.lbmKg) &&
		(Object.values(BMREquation) as unknown[]).includes(o.bmrEquation) &&
		(Object.values(ExerciseMultiplier) as unknown[]).includes(o.exerciseMultiplier)
	)
}

function loadPersistedInputs(): PersistedInputs | null {
	if (typeof window === 'undefined') return null
	try {
		const raw = localStorage.getItem(STORAGE_KEY)
		if (!raw) return null
		const parsed = JSON.parse(raw)
		return isValidPersistedInputs(parsed) ? parsed : null
	} catch {
		return null
	}
}

// Inline LBM/BMR computation to bootstrap initial state without triggering circular-dep issues
function computeLBMFromInputs(p: PersistedInputs): LBM {
	let lbmKg: number
	switch (p.lbmFormula) {
		case LBMFormula.BOER:
			lbmKg =
				p.genre === Genre.MALE
					? 0.407 * p.weight + 0.267 * p.height - 19.2
					: 0.252 * p.weight + 0.473 * p.height - 48.3
			break
		case LBMFormula.JAMES:
			lbmKg =
				p.genre === Genre.MALE
					? 1.1 * p.weight - 128 * (p.weight / p.height) ** 2
					: 1.07 * p.weight - 148 * (p.weight / p.height) ** 2
			break
		case LBMFormula.HUME:
			lbmKg =
				p.genre === Genre.MALE
					? 0.3281 * p.weight + 0.33929 * p.height - 29.5336
					: 0.29569 * p.weight + 0.41813 * p.height - 43.2933
			break
		case LBMFormula.MANUAL:
		default:
			lbmKg = p.lbmKg
			break
	}
	return {
		formula: p.lbmFormula,
		lbmKg: Number(lbmKg.toFixed(1)),
		lbmPercentage: Math.round((lbmKg / p.weight) * 100),
		bodyFatPercentage: Math.round(((p.weight - lbmKg) / p.weight) * 100),
	}
}

function computeBMRFromInputs(p: PersistedInputs, lbm: LBM): BMRAndExercise {
	let kcalPerDay: number
	switch (p.bmrEquation) {
		case BMREquation.MIFFLIN_ST_JEOR:
			kcalPerDay =
				p.genre === Genre.MALE
					? 10 * p.weight + 6.25 * p.height - 5 * p.age + 5
					: 10 * p.weight + 6.25 * p.height - 5 * p.age - 161
			break
		case BMREquation.REVISED_HARRIS_BENEDICT:
			kcalPerDay =
				p.genre === Genre.MALE
					? 13.397 * p.weight + 4.799 * p.height - 5.677 * p.age + 88.362
					: 9.247 * p.weight + 3.098 * p.height - 4.33 * p.age + 447.593
			break
		case BMREquation.KATCH_MC_ARDLE:
		default:
			kcalPerDay = 370 + 21.6 * (1 - lbm.bodyFatPercentage / 100) * p.weight
			break
	}
	const multiplier = getExerciseMultiplierValue(p.exerciseMultiplier)
	return {
		equation: p.bmrEquation,
		exerciseMultiplier: p.exerciseMultiplier,
		kcalPerDay: Math.round(kcalPerDay),
		kcalPerDayToMaintain: Math.round(kcalPerDay * multiplier),
		kcalPerDayToSurplus: Math.round(kcalPerDay * multiplier + kcalForSurplus),
		kcalPerDayToDefinition: Math.round(kcalPerDay * multiplier - kcalForDefinition),
	}
}

function buildInitialState(): UserAttributes {
	const persisted = loadPersistedInputs()
	if (!persisted) {
		return {
			height: defaultHeight,
			weight: defaultWeight,
			age: defaultAge,
			genre: defaultGenre,
			lbm: defaultLbm,
			bmrAndExercise: defaultBMRAndExercise,
			goal: defaultGoal,
		}
	}
	const lbm = computeLBMFromInputs(persisted)
	const bmrAndExercise = computeBMRFromInputs(persisted, lbm)
	return {
		height: persisted.height,
		weight: persisted.weight,
		age: persisted.age,
		genre: persisted.genre,
		lbm,
		bmrAndExercise,
		goal: persisted.goal,
	}
}

export const $userAttributes = map<UserAttributes>(buildInitialState())

export const $updateUserHeight = (height: Height) => {
	$userAttributes.setKey('height', height)
}

export const $updateUserWeight = (weight: Weight) => {
	$userAttributes.setKey('weight', weight)
}

export const $updateUserAge = (age: Age) => {
	$userAttributes.setKey('age', age)
}

export const $updateUserGenre = (genre: Genre) => {
	$userAttributes.setKey('genre', genre)
}

export const $updateUserLBM = (lbm: LBM) => {
	$userAttributes.setKey('lbm', lbm)
}

export const $updateUserGoal = (goal: Goal) => {
	$userAttributes.setKey('goal', goal)
}

export const $updateUserBMRAndExercise = (bmrAndExercise: BMRAndExercise) => {
	$userAttributes.setKey('bmrAndExercise', bmrAndExercise)
}

listenKeys($userAttributes, ['weight', 'height', 'genre'], () => {
	calculateAndUpdateLBM({})
})

// Only listen to 'age' and 'lbm': weight/height/genre changes cascade through LBM first,
// so BMR always reads the fresh lbm value and runs only once per slider event instead of twice.
listenKeys($userAttributes, ['age', 'lbm'], () => {
	calculateAndUpdateBMR({})
})

if (typeof window !== 'undefined') {
	$userAttributes.subscribe((attrs) => {
		const inputs: PersistedInputs = {
			height: attrs.height,
			weight: attrs.weight,
			age: attrs.age,
			genre: attrs.genre,
			goal: attrs.goal,
			lbmFormula: attrs.lbm.formula,
			lbmKg: attrs.lbm.lbmKg,
			bmrEquation: attrs.bmrAndExercise.equation,
			exerciseMultiplier: attrs.bmrAndExercise.exerciseMultiplier,
		}
		localStorage.setItem(STORAGE_KEY, JSON.stringify(inputs))
	})
}
