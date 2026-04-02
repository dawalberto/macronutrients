import { ExerciseMultiplier } from 'src/types'

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

export const getExerciseMultiplierValue = (exerciseMultiplier: ExerciseMultiplier) => {
	switch (exerciseMultiplier) {
		case ExerciseMultiplier.SEDENTARY:
			return 1.2
		case ExerciseMultiplier.LIGHTLY_ACTIVE:
			return 1.375
		case ExerciseMultiplier.MODERATELY_ACTIVE:
			return 1.55
		case ExerciseMultiplier.VERY_ACTIVE:
			return 1.725
		case ExerciseMultiplier.EXTREMELY_ACTIVE:
			return 1.9
		default:
			return 1.2
	}
}
