import { listenKeys, map } from 'nanostores'
import { deriveBMRAndExercise } from '../calculations/bmr'
import { deriveLBM, getLBMManualKgFromState } from '../calculations/lbm'
import { defaultAge, defaultBMRAndExercise, defaultGenre, defaultGoal, defaultHeight, defaultLbm, defaultWeight } from '../defaults'
import type { KeyValueStorage } from '../storage/types'
import { createJsonStorage } from '../storage/types'
import type { Age, BMRAndExercise, BMREquation, ExerciseMultiplier, Genre, Goal, Height, LBM, LBMFormula, UserAttributes, Weight } from '../types'

export const $userAttributes = map<UserAttributes>({
	height: defaultHeight,
	weight: defaultWeight,
	age: defaultAge,
	genre: defaultGenre,
	lbm: defaultLbm,
	bmrAndExercise: defaultBMRAndExercise,
	goal: defaultGoal,
})

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

export const calculateAndUpdateLBM = ({ formula, lbmManual }: { formula?: LBMFormula; lbmManual?: number }): void => {
	const current = $userAttributes.get()
	const updatedFormula = formula ?? current.lbm.formula
	const manualKg = updatedFormula === 'Manual' ? lbmManual ?? getLBMManualKgFromState(current) : undefined
	const next = deriveLBM({
		weight: current.weight,
		height: current.height,
		genre: current.genre,
		formula: updatedFormula,
		...(manualKg == null ? {} : { lbmManual: manualKg }),
	})
	$updateUserLBM(next)
}

export const calculateAndUpdateBMR = ({
	equation,
	exerciseMultiplier,
}: {
	equation?: BMREquation
	exerciseMultiplier?: ExerciseMultiplier
}): void => {
	const current = $userAttributes.get()
	const updatedEquation = equation ?? current.bmrAndExercise.equation
	const updatedExerciseMultiplier = exerciseMultiplier ?? current.bmrAndExercise.exerciseMultiplier

	const next = deriveBMRAndExercise({
		weight: current.weight,
		height: current.height,
		age: current.age,
		genre: current.genre,
		lbmBodyFatPercentage: current.lbm.bodyFatPercentage,
		equation: updatedEquation,
		exerciseMultiplier: updatedExerciseMultiplier,
	})

	$updateUserBMRAndExercise(next)
}

listenKeys($userAttributes, ['weight', 'height', 'genre'], () => {
	calculateAndUpdateLBM({})
})

listenKeys($userAttributes, ['weight', 'height', 'genre', 'age', 'lbm'], () => {
	calculateAndUpdateBMR({})
})

type PersistedUserAttributesV1 = {
	v: 1
	height: number
	weight: number
	age: number
	genre: Genre
	goal: Goal
	lbmFormula: LBMFormula
	lbmManualKg?: number
	bmrEquation: BMREquation
	exerciseMultiplier: ExerciseMultiplier
}

const STORAGE_KEY = 'macronutrients:userAttributes:v1'

export const initUserAttributesPersistence = async ({
	storage,
	debounceMs = 200,
}: {
	storage: KeyValueStorage
	debounceMs?: number
}): Promise<() => void> => {
	const json = createJsonStorage<PersistedUserAttributesV1>(storage)

	const persisted = await json.get(STORAGE_KEY)
	if (persisted?.v === 1) {
		$updateUserHeight(persisted.height)
		$updateUserWeight(persisted.weight)
		$updateUserAge(persisted.age)
		$updateUserGenre(persisted.genre)
		$updateUserGoal(persisted.goal)
		calculateAndUpdateLBM({
			formula: persisted.lbmFormula,
			...(persisted.lbmManualKg == null ? {} : { lbmManual: persisted.lbmManualKg }),
		})
		calculateAndUpdateBMR({ equation: persisted.bmrEquation, exerciseMultiplier: persisted.exerciseMultiplier })
	}

	let timeout: ReturnType<typeof setTimeout> | undefined
	let disposed = false

	const persistNow = async () => {
		if (disposed) return
		const current = $userAttributes.get()
		const payload: PersistedUserAttributesV1 = {
			v: 1,
			height: current.height,
			weight: current.weight,
			age: current.age,
			genre: current.genre,
			goal: current.goal,
			lbmFormula: current.lbm.formula,
			...(current.lbm.formula === 'Manual' ? { lbmManualKg: current.lbm.lbmKg } : {}),
			bmrEquation: current.bmrAndExercise.equation,
			exerciseMultiplier: current.bmrAndExercise.exerciseMultiplier,
		}

		await json.set(STORAGE_KEY, payload)
	}

	const schedulePersist = () => {
		if (disposed) return
		if (timeout) clearTimeout(timeout)
		timeout = setTimeout(() => {
			void persistNow()
		}, debounceMs)
	}

	const unlisten = $userAttributes.listen(() => {
		schedulePersist()
	})

	return () => {
		disposed = true
		if (timeout) clearTimeout(timeout)
		unlisten()
	}
}
