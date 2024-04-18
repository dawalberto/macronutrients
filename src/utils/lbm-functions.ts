import { $updateUserLBM, $userAttributes } from '@store/user-attributes'
import type { LBMFormula } from 'src/types'
import { defaultLbm } from './defaults'

export const calculateAndUpdateLBM = ({ formula, lbmManual }: { formula?: LBMFormula; lbmManual?: number }): void => {
	const { weight, lbm: $lbm } = $userAttributes.get()
	const updatedFormula = formula ?? $lbm.formula
	let lbm: number = defaultLbm.lbmKg

	switch (updatedFormula) {
		case 'Boer':
			lbm = calculateLBMBoer()
			break
		case 'James':
			lbm = calculateLBMJames()
			break
		case 'Hume':
			lbm = calculateLBMHume()
			break
		case 'Manual':
			lbm = lbmManual ?? $lbm.lbmKg
			break
	}

	$updateUserLBM({
		formula: updatedFormula,
		lbmKg: Number(lbm.toFixed(1)),
		lbmPercentage: Math.round((lbm / weight) * 100),
		bodyFatPercentage: Math.round(((weight - lbm) / weight) * 100),
	})
}

const calculateLBMBoer = (): number => {
	const { weight, height, genre } = $userAttributes.get()
	let lbm = 0

	if (genre === 'male') {
		lbm = 0.407 * weight + 0.267 * height - 19.2
	} else {
		lbm = 0.252 * weight + 0.473 * height - 48.3
	}

	return lbm
}

const calculateLBMJames = (): number => {
	const { weight, height, genre } = $userAttributes.get()

	let lbm = 0

	if (genre === 'male') {
		lbm = 1.1 * weight - 128 * (weight / height) ** 2
	} else {
		lbm = 1.07 * weight - 148 * (weight / height) ** 2
	}

	return lbm
}

const calculateLBMHume = (): number => {
	const { weight, height, genre } = $userAttributes.get()

	let lbm = 0

	if (genre === 'male') {
		lbm = 0.3281 * weight + 0.33929 * height - 29.5336
	} else {
		lbm = 0.29569 * weight + 0.41813 * height - 43.2933
	}

	return lbm
}
