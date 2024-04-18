import { $userAttributes } from '@store/user-attributes'
import type { Genre, Height, LBM, LBMFormula, Weight } from 'src/types'
import { defaultLbm } from './defaults'

export const calculateLBM = ({
	LBMFormulaSelected,
	callbackOnCalculate,
}: {
	LBMFormulaSelected: LBMFormula
	callbackOnCalculate: (lbm: LBM) => void
}): void => {
	const { weight, height, genre, lbm: $lbm } = $userAttributes.get()
	const dataToCalculateLBM = { weight, height, genre }
	let lbm: LBM = defaultLbm

	switch (LBMFormulaSelected) {
		case 'Boer':
			lbm = calculateLBMBoer(dataToCalculateLBM)
			break
		case 'James':
			lbm = calculateLBMJames(dataToCalculateLBM)
			break
		case 'Hume':
			lbm = calculateLBMHume(dataToCalculateLBM)
			break
		case 'Manual':
			lbm = calculateLBMManual({ weight, lbm: $lbm.lbmKg })
			break
	}

	callbackOnCalculate(lbm)
}

const calculateLBMBoer = ({ genre, weight, height }: { genre: Genre; weight: Weight; height: Height }): LBM => {
	let lbm = 0

	if (genre === 'male') {
		lbm = 0.407 * weight + 0.267 * height - 19.2
	} else {
		lbm = 0.252 * weight + 0.473 * height - 48.3
	}

	return {
		formula: 'Boer',
		lbmKg: Number(lbm.toFixed(1)),
		lbmPercentage: Math.round((lbm / weight) * 100),
		bodyFatPercentage: Math.round(((weight - lbm) / weight) * 100),
	}
}

const calculateLBMJames = ({ genre, weight, height }: { genre: Genre; weight: Weight; height: Height }): LBM => {
	let lbm = 0

	if (genre === 'male') {
		lbm = 1.1 * weight - 128 * (weight / height) ** 2
	} else {
		lbm = 1.07 * weight - 148 * (weight / height) ** 2
	}

	return {
		formula: 'James',
		lbmKg: Number(lbm.toFixed(1)),
		lbmPercentage: Math.round((lbm / weight) * 100),
		bodyFatPercentage: Math.round(((weight - lbm) / weight) * 100),
	}
}

const calculateLBMHume = ({ genre, weight, height }: { genre: Genre; weight: Weight; height: Height }): LBM => {
	let lbm = 0

	if (genre === 'male') {
		lbm = 0.3281 * weight + 0.33929 * height - 29.5336
	} else {
		lbm = 0.29569 * weight + 0.41813 * height - 43.2933
	}

	return {
		formula: 'Hume',
		lbmKg: Number(lbm.toFixed(1)),
		lbmPercentage: Math.round((lbm / weight) * 100),
		bodyFatPercentage: Math.round(((weight - lbm) / weight) * 100),
	}
}

const calculateLBMManual = ({ weight, lbm }: { weight: Weight; lbm: number }): LBM => {
	return {
		formula: 'Manual',
		lbmKg: Number(lbm.toFixed(1)),
		lbmPercentage: Math.round((lbm / weight) * 100),
		bodyFatPercentage: Math.round(((weight - lbm) / weight) * 100),
	}
}
