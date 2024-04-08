import { updateUserAge, updateUserGenre, updateUserHeight, updateUserWeight } from '@store/user-attributes'
import '@styles/dashboard.css'
import { calculateAge } from '@utils/index'
import React, { useState } from 'react'
import type { Genre, UserAttributes } from 'src/types'

const defaultWeight = 63
const defaultHeight = 169
const defaultAge = calculateAge('1997-12-30')
const defaultGenre = 'male'

const Dashboard = () => {
	const [weight, setWeight] = useState<Pick<UserAttributes, 'weight'>['weight']>(defaultWeight)
	const [height, setHeight] = useState<Pick<UserAttributes, 'height'>['height']>(defaultHeight)
	const [age, setAge] = useState<Pick<UserAttributes, 'age'>['age']>(defaultAge)
	const [genre, setGenre] = useState<Genre>(defaultGenre)

	const handleWeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = parseInt(event.target.value)
		setWeight(value)
		updateUserWeight(value)
	}

	const handleHeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = parseInt(event.target.value)
		setHeight(value)
		updateUserHeight(value)
	}

	const handleAgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = parseInt(event.target.value)
		setAge(value)
		updateUserAge(value)
	}

	const handleGenreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value as Genre
		setGenre(value)
		updateUserGenre(value)
	}

	return (
		<div className='mx-auto flex w-full flex-col items-center justify-center gap-6 text-xl text-slate-800 md:w-1/2 lg:w-1/3 xl:w-1/4'>
			<div className='flex w-full justify-start gap-6'>
				<label className='radio-button'>
					<input type='radio' name='genre' value='male' checked={genre === 'male'} onChange={handleGenreChange} />
					Male
					<span />
				</label>
				<label className='radio-button'>
					<input type='radio' name='genre' value='female' checked={genre === 'female'} onChange={handleGenreChange} />
					Female
					<span />
				</label>
			</div>
			<div className='flex w-full flex-col items-end gap-3'>
				<label htmlFor='weightRangeInput'>
					Weight: <span className='font-bold text-amber-600'>{weight}</span> kg
				</label>
				<input type='range' className='drop-shadow-xl focus:drop-shadow-sm' value={weight} min='0' max='200' onChange={handleWeightChange} />
			</div>
			<div className='flex w-full flex-col items-end gap-3'>
				<label htmlFor='heightRangeInput'>
					Height: <span className='font-bold text-amber-600'>{height}</span> cm
				</label>
				<input type='range' className='drop-shadow-xl focus:drop-shadow-sm' value={height} min='0' max='250' onChange={handleHeightChange} />
			</div>
			<div className='flex w-full flex-col items-end gap-3'>
				<label htmlFor='ageRangeInput'>
					Age: <span className='font-bold text-amber-600'>{age}</span>
				</label>
				<input type='range' className='drop-shadow-xl focus:drop-shadow-sm' value={age} min='0' max='100' onChange={handleAgeChange} />
			</div>
		</div>
	)
}

export default Dashboard
