import { defaultLbm } from '../defaults'
import type { Genre, LBM, LBMFormula, UserAttributes, Weight } from '../types'

export const calculateLBMKg = ({
	weight,
	height,
	genre,
	formula,
	lbmManual,
}: {
	weight: number
	height: number
	genre: Genre
	formula: LBMFormula
	lbmManual?: number
}): number => {
	switch (formula) {
		case 'Boer':
			return genre === 'male' ? 0.407 * weight + 0.267 * height - 19.2 : 0.252 * weight + 0.473 * height - 48.3
		case 'James':
			return genre === 'male' ? 1.1 * weight - 128 * (weight / height) ** 2 : 1.07 * weight - 148 * (weight / height) ** 2
		case 'Hume':
			return genre === 'male' ? 0.3281 * weight + 0.33929 * height - 29.5336 : 0.29569 * weight + 0.41813 * height - 43.2933
		case 'Manual':
			return lbmManual ?? defaultLbm.lbmKg
	}
}

export const deriveLBM = ({
	weight,
	height,
	genre,
	formula,
	lbmManual,
}: {
	weight: Weight
	height: number
	genre: Genre
	formula: LBMFormula
	lbmManual?: number
}): LBM => {
	const lbmKg = calculateLBMKg({
		weight,
		height,
		genre,
		formula,
		...(lbmManual == null ? {} : { lbmManual }),
	})
	const rounded = Number(lbmKg.toFixed(1))
	return {
		formula,
		lbmKg: rounded,
		lbmPercentage: Math.round((rounded / weight) * 100),
		bodyFatPercentage: Math.round(((weight - rounded) / weight) * 100),
	}
}

export const getLBMManualKgFromState = (user: UserAttributes): number | undefined => {
	if (user.lbm.formula !== 'Manual') return undefined
	return user.lbm.lbmKg
}
