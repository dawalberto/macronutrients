export type UserAttributes = {
	height: number
	weight: number
	age: number
	genre: Genre
	lbm: {
		formula: 'Boer' | 'James' | 'Hume' | 'Manual'
		lbmKg: number
		lbmPercentage: number
		bodyFatPercentage: number
	}
}

export type Height = number
export type Weight = number
export type Age = number
export type Genre = 'male' | 'female'
export type LBM = {
	formula: 'Boer' | 'James' | 'Hume' | 'Manual'
	lbmKg: number
	lbmPercentage: number
	bodyFatPercentage: number
}
