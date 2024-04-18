import type { ExerciseMultiplier } from 'src/types'

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
