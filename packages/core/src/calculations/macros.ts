import {
	gramsOfFatsInDefinition,
	gramsOfProteinsInDefinition,
	gramsOfProteinsInMaintain,
	gramsOfProteinsInSurplus,
	percentageOfFatsInSurplus,
} from '../settings'
import type { Goal, UserAttributes } from '../types'

export type MacroTargets = {
	goal: Goal
	kcalPerDay: number
	carbsGrams: number
	fatsGrams: number
	proteinsGrams: number
	carbsKcal: number
	fatsKcal: number
	proteinsKcal: number
}

export const calculateMacroTargets = ({
	goal,
	lbmKg,
	bmrAndExercise,
}: {
	goal: Goal
	lbmKg: number
	bmrAndExercise: UserAttributes['bmrAndExercise']
}): MacroTargets => {
	let proteinsGrams = 0
	let fatsGrams = 0
	let carbsGrams = 0
	let kcalPerDay = 0

	switch (goal) {
		case 'Maintain':
			proteinsGrams = gramsOfProteinsInMaintain * lbmKg
			fatsGrams = lbmKg
			kcalPerDay = bmrAndExercise.kcalPerDayToMaintain
			carbsGrams = (kcalPerDay - (proteinsGrams * 4 + fatsGrams * 9)) / 4
			break
		case 'Surplus':
			proteinsGrams = gramsOfProteinsInSurplus * lbmKg
			kcalPerDay = bmrAndExercise.kcalPerDayToSurplus
			fatsGrams = (percentageOfFatsInSurplus * kcalPerDay) / 9
			carbsGrams = (kcalPerDay - (proteinsGrams * 4 + fatsGrams * 9)) / 4
			break
		case 'Definition':
			proteinsGrams = gramsOfProteinsInDefinition * lbmKg
			fatsGrams = gramsOfFatsInDefinition * lbmKg
			kcalPerDay = bmrAndExercise.kcalPerDayToDefinition
			carbsGrams = (kcalPerDay - (proteinsGrams * 4 + fatsGrams * 9)) / 4
			break
	}

	proteinsGrams = Math.round(proteinsGrams)
	fatsGrams = Math.round(fatsGrams)
	carbsGrams = Math.round(carbsGrams)

	return {
		goal,
		kcalPerDay,
		carbsGrams,
		fatsGrams,
		proteinsGrams,
		carbsKcal: carbsGrams * 4,
		fatsKcal: fatsGrams * 9,
		proteinsKcal: proteinsGrams * 4,
	}
}

export const calculateMacroTargetsFromState = (user: UserAttributes): MacroTargets => {
	return calculateMacroTargets({ goal: user.goal, lbmKg: user.lbm.lbmKg, bmrAndExercise: user.bmrAndExercise })
}
