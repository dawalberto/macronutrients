import { map } from 'nanostores'
import type { UserAttributes } from 'src/types'

export const $userAttributes = map<UserAttributes>({
	height: 169,
	weight: 63,
	age: 26,
	genre: 'male',
})

export const updateUserHeight = (height: Pick<UserAttributes, 'height'>['height']) => {
	// $userAttributes.set({ ...$userAttributes.get(), height })
	$userAttributes.setKey('height', height)
}

export const updateUserWeight = (weight: Pick<UserAttributes, 'weight'>['weight']) => {
	// $userAttributes.set({ ...$userAttributes.get(), weight })
	$userAttributes.setKey('weight', weight)
}

export const updateUserAge = (age: Pick<UserAttributes, 'age'>['age']) => {
	// $userAttributes.set({ ...$userAttributes.get(), age })
	$userAttributes.setKey('age', age)
}

export const updateUserGenre = (genre: Pick<UserAttributes, 'genre'>['genre']) => {
	// $userAttributes.set({ ...$userAttributes.get(), genre })
	$userAttributes.setKey('genre', genre)
}
