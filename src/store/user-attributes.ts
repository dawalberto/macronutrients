import { defaultAge, defaultBMRAndExercise, defaultGenre, defaultHeight, defaultLbm, defaultWeight } from '@utils/defaults'
import { map } from 'nanostores'
import type { Age, BMRAndExercise, Genre, Height, LBM, UserAttributes, Weight } from 'src/types'

export const $userAttributes = map<UserAttributes>({
	height: defaultHeight,
	weight: defaultWeight,
	age: defaultAge,
	genre: defaultGenre,
	lbm: defaultLbm,
	bmrAndExercise: defaultBMRAndExercise,
})

export const updateUserHeight = (height: Height) => {
	$userAttributes.setKey('height', height)
}

export const updateUserWeight = (weight: Weight) => {
	$userAttributes.setKey('weight', weight)
}

export const updateUserAge = (age: Age) => {
	$userAttributes.setKey('age', age)
}

export const updateUserGenre = (genre: Genre) => {
	$userAttributes.setKey('genre', genre)
}

export const updateUserLBM = (lbm: LBM) => {
	$userAttributes.setKey('lbm', lbm)
}

export const updateUserBMRAndExercise = (bmrAndExercise: BMRAndExercise) => {
	$userAttributes.setKey('bmrAndExercise', bmrAndExercise)
}
