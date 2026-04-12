import {
	gramsOfFatsInDefinition,
	gramsOfProteinsInDefinition,
	gramsOfProteinsInMaintain,
	gramsOfProteinsInSurplus,
	percentageOfFatsInSurplus,
} from '@lib/settings'
import { Goal } from 'src/types'
import type { BMRAndExercise, LBM } from 'src/types'

export type MacroResult = {
	proteinGrams: number
	fatGrams: number
	carbGrams: number
	kcalPerDay: number
}

export function calculateMacros(goal: Goal, lbm: LBM, bmrAndExercise: BMRAndExercise): MacroResult {
	let proteinGrams = 0
	let fatGrams = 0
	let carbGrams = 0
	let kcalPerDay = 0

	switch (goal) {
		case Goal.MAINTAIN:
			proteinGrams = gramsOfProteinsInMaintain * lbm.lbmKg
			fatGrams = lbm.lbmKg
			carbGrams = (bmrAndExercise.kcalPerDayToMaintain - (proteinGrams * 4 + fatGrams * 9)) / 4
			kcalPerDay = bmrAndExercise.kcalPerDayToMaintain
			break
		case Goal.SURPLUS:
			proteinGrams = gramsOfProteinsInSurplus * lbm.lbmKg
			fatGrams = (percentageOfFatsInSurplus * bmrAndExercise.kcalPerDayToSurplus) / 9
			carbGrams = (bmrAndExercise.kcalPerDayToSurplus - (proteinGrams * 4 + fatGrams * 9)) / 4
			kcalPerDay = bmrAndExercise.kcalPerDayToSurplus
			break
		case Goal.DEFINITION:
			proteinGrams = gramsOfProteinsInDefinition * lbm.lbmKg
			fatGrams = gramsOfFatsInDefinition * lbm.lbmKg
			carbGrams = (bmrAndExercise.kcalPerDayToDefinition - (proteinGrams * 4 + fatGrams * 9)) / 4
			kcalPerDay = bmrAndExercise.kcalPerDayToDefinition
			break
	}

	return {
		proteinGrams: Math.round(proteinGrams),
		fatGrams: Math.round(fatGrams),
		carbGrams: Math.round(carbGrams),
		kcalPerDay: Math.round(kcalPerDay),
	}
}
