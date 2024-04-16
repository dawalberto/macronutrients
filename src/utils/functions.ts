import type { ExerciseMultiplier, Genre, Height, LBM, LBMFormula, Weight } from 'src/types'

export const calculateAge = (birthDate: string) => {
	const today = new Date()
	const dob = new Date(birthDate)

	let age = today.getFullYear() - dob.getFullYear()
	const monthDiff = today.getMonth() - dob.getMonth()

	if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
		age--
	}

	return age
}

export const calculateLBM = ({
	LBMFormulaSelected,
	genre,
	weight,
	height,
	callbackWithLBMCalculated,
}: {
	LBMFormulaSelected: LBMFormula
	genre: Genre
	weight: Weight
	height: Height
	callbackWithLBMCalculated: (lbm: LBM) => void
}): void => {
	let lbm
	switch (LBMFormulaSelected) {
		case 'Boer':
			lbm = calculateLBMBoer({ weight, height, genre })
			callbackWithLBMCalculated(lbm)
			return
		case 'James':
			lbm = calculateLBMJames({ weight, height, genre })
			callbackWithLBMCalculated(lbm)
			return
		case 'Hume':
			lbm = calculateLBMHume({ weight, height, genre })
			callbackWithLBMCalculated(lbm)
			return
	}
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

export const getExerciseMultiplierValue = (exerciseMultiplier: ExerciseMultiplier) => {
	switch (exerciseMultiplier) {
		case 'Sedentary':
			return 1.2
		case 'Lightly active':
			return 1.375
		case 'Moderately active':
			return 1.55
		case 'Very active':
			return 1.725
		case 'Extremely active':
			return 1.9
	}
}
