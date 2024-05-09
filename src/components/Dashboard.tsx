import { useStore } from '@nanostores/react'
import { $updateUserAge, $updateUserGenre, $updateUserHeight, $updateUserWeight, $userAttributes } from '@store/user-attributes'
import '@styles/dashboard.css'
import { labelStyles } from '@styles/forms'
import React, { useCallback } from 'react'
import type { Genre, UserAttributesNamesDashboard } from 'src/types'

export const Dashboard = () => {
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
		<div className='mx-auto flex w-full flex-col items-center justify-center gap-4 text-sm font-medium text-amber-900'>
			<div className='flex w-full justify-start gap-4'>
				<label className='radio-button' htmlFor='genreMale'>
					<input type='radio' id='genreMale' name='genre' value='male' checked={genre === 'male'} onChange={handleUserAttributeChange} />
					🙋‍♂️ Male
					<span />
				</label>
				<label className='radio-button' htmlFor='genreFemale'>
					<input
						type='radio'
						id='genreFemale'
						name='genre'
						value='female'
						checked={genre === 'female'}
						onChange={handleUserAttributeChange}
					/>
					🙋‍♀️ Female
					<span />
				</label>
			</div>
			<div className='mt-2 flex w-full flex-col items-start gap-3'>
				<label htmlFor='weight' className={labelStyles}>
					Weight: <span className='text-base text-amber-600'>{weight}</span> kg
				</label>
				<input type='range' id='weight' name='weight' value={weight} min='0' max='200' onChange={handleUserAttributeChange} />
			</div>
			<div className='flex w-full flex-col items-start gap-3'>
				<label htmlFor='height' className={labelStyles}>
					Height: <span className='text-base text-amber-600'>{height}</span> cm
				</label>
				<input type='range' id='height' name='height' value={height} min='0' max='250' onChange={handleUserAttributeChange} />
			</div>
			<div className='flex w-full flex-col items-start gap-3'>
				<label htmlFor='age' className={labelStyles}>
					Age: <span className='text-base text-amber-600'>{age}</span> years
				</label>
				<input type='range' id='age' name='age' value={age} min='0' max='100' onChange={handleUserAttributeChange} />
			</div>
		</div>
	)
}
