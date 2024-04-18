import { useStore } from '@nanostores/react'
import { $updateUserAge, $updateUserGenre, $updateUserHeight, $updateUserWeight, $userAttributes } from '@store/user-attributes'
import '@styles/dashboard.css'
import React, { useCallback } from 'react'
import type { Genre, UserAttributesNamesDashboard } from 'src/types'

const Dashboard = () => {
	const { weight, height, age, genre } = useStore($userAttributes)

	const handleUserAttributeChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		const attribute = event.target.name as UserAttributesNamesDashboard
		let value = event.target.value as Genre | number
		if (attribute !== 'genre') {
			value = parseInt(value as string)
		}

		switch (attribute) {
			case 'weight':
				$updateUserWeight(value as number)
				return
			case 'height':
				$updateUserHeight(value as number)
				return
			case 'age':
				$updateUserAge(value as number)
				return
			case 'genre':
				$updateUserGenre(value as Genre)
				return
		}
	}, [])

	return (
		<div className='mx-auto flex w-full flex-col items-center justify-center gap-6 text-sm font-medium text-amber-900'>
			<div className='flex w-full justify-center gap-6'>
				<label className='radio-button'>
					<input type='radio' name='genre' value='male' checked={genre === 'male'} onChange={handleUserAttributeChange} />
					🙋‍♂️ Male
					<span />
				</label>
				<label className='radio-button'>
					<input type='radio' name='genre' value='female' checked={genre === 'female'} onChange={handleUserAttributeChange} />
					🙋‍♀️ Female
					<span />
				</label>
			</div>
			<div className='flex w-full flex-col items-start gap-3'>
				<label htmlFor='weightRangeInput'>
					Weight: <span className='font-bold text-amber-600'>{weight}</span> kg
				</label>
				<input type='range' name='weight' value={weight} min='0' max='200' onChange={handleUserAttributeChange} />
			</div>
			<div className='flex w-full flex-col items-start gap-3'>
				<label htmlFor='heightRangeInput'>
					Height: <span className='font-bold text-amber-600'>{height}</span> cm
				</label>
				<input type='range' name='height' value={height} min='0' max='250' onChange={handleUserAttributeChange} />
			</div>
			<div className='flex w-full flex-col items-start gap-3'>
				<label htmlFor='ageRangeInput'>
					Age: <span className='font-bold text-amber-600'>{age}</span>
				</label>
				<input type='range' name='age' value={age} min='0' max='100' onChange={handleUserAttributeChange} />
			</div>
		</div>
	)
}

export default Dashboard
