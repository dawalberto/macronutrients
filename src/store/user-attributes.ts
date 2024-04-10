import { defaultAge, defaultGenre, defaultHeight, defaultLbm, defaultWeight } from '@utils/constants'
import { map } from 'nanostores'
import type { Age, Genre, Height, LBM, UserAttributes, Weight } from 'src/types'

export const $userAttributes = map<UserAttributes>({
	height: defaultHeight,
	weight: defaultWeight,
	age: defaultAge,
	genre: defaultGenre,
	lbm: defaultLbm,
})

export const updateUserHeight = (height: Height) => {
	// $userAttributes.set({ ...$userAttributes.get(), height })
	$userAttributes.setKey('height', height)
}

export const updateUserWeight = (weight: Weight) => {
	// $userAttributes.set({ ...$userAttributes.get(), weight })
	$userAttributes.setKey('weight', weight)
}

export const updateUserAge = (age: Age) => {
	// $userAttributes.set({ ...$userAttributes.get(), age })
	$userAttributes.setKey('age', age)
}

export const updateUserGenre = (genre: Genre) => {
	// $userAttributes.set({ ...$userAttributes.get(), genre })
	$userAttributes.setKey('genre', genre)
}

export const updateUserLBM = (lbm: LBM) => {
	$userAttributes.setKey('lbm', lbm)
}
