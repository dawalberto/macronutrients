export type UserAttributes = {
	height: number
	weight: number
	age: number
	genre: Genre
	lbm: {
		formula: FormulaLBM
		lbmKg: number
		lbmPercentage: number
		bodyFatPercentage: number
	}
}

export type Height = number
export type Weight = number
export type Age = number
export type Genre = 'male' | 'female'

export type FormulaLBM = 'Boer' | 'James' | 'Hume' | 'Manual'
export type LBM = {
	formula: FormulaLBM
	lbmKg: number
	lbmPercentage: number
	bodyFatPercentage: number
}
// export type CalculateLBM =
// 	| {
// 			formulaLBMSelected: Exclude<FormulaLBM, Exclude<FormulaLBM, 'Manual'>>
// 			lbmKg: number
// 			callbackWithLBMCalculated: (lbm: LBM) => void
// 	  }
// 	| {
// 			formulaLBMSelected: Exclude<FormulaLBM, 'Manual'>
// 			genre: Genre
// 			weight: Weight
// 			height: Height
// 			callbackWithLBMCalculated: (lbm: LBM) => void
// 	  }
