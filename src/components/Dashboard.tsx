import { useStore } from '@nanostores/react'
import { $updateUserAge, $updateUserGenre, $updateUserHeight, $updateUserWeight, $userAttributes } from '@store/user-attributes'
import '@styles/dashboard.css'
import { User } from 'lucide-react'
import React, { useCallback } from 'react'
import type { UserAttributesNamesDashboard } from 'src/types'

export const Dashboard = () => {
	const { weight, height, age, genre } = useStore($userAttributes)

	const handleUserAttributeChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		const attribute = event.target.name as UserAttributesNamesDashboard
		const value = parseInt(event.target.value)

		switch (attribute) {
			case 'weight':
				$updateUserWeight(value)
				return
			case 'height':
				$updateUserHeight(value)
				return
			case 'age':
				$updateUserAge(value)
				return
		}
	}, [])

	return (
		<div className='flex w-full flex-col gap-8'>
			<div className='flex w-full gap-4'>
				<button
					onClick={() => $updateUserGenre('male')}
					className={`flex flex-1 items-center justify-center gap-2 p-4 font-bold transition-all ${
						genre === 'male'
							? 'bg-gray-100 text-black brutalist-border-active'
							: 'bg-obsidian text-gray-400 brutalist-border opacity-50'
					}`}
				>
					<User size={16} /> MALE
				</button>
				<button
					onClick={() => $updateUserGenre('female')}
					className={`flex flex-1 items-center justify-center gap-2 p-4 font-bold transition-all ${
						genre === 'female'
							? 'bg-gray-100 text-black brutalist-border-active'
							: 'bg-obsidian text-gray-400 brutalist-border opacity-50'
					}`}
				>
					<User size={16} /> FEMALE
				</button>
			</div>

			<div className='space-y-3'>
				<div className='flex items-end justify-between font-bold'>
					<span className='text-[10px] text-concrete'>WEIGHT_KG</span>
					<span className='border border-slate-brutalist bg-obsidian px-3 py-1 text-white'>{weight}.00</span>
				</div>
				<input type='range' id='weight' name='weight' value={weight} min='0' max='200' onChange={handleUserAttributeChange} />
			</div>

			<div className='space-y-3'>
				<div className='flex items-end justify-between font-bold'>
					<span className='text-[10px] text-concrete'>HEIGHT_CM</span>
					<span className='border border-slate-brutalist bg-obsidian px-3 py-1 text-white'>{height}.00</span>
				</div>
				<input type='range' id='height' name='height' value={height} min='0' max='250' onChange={handleUserAttributeChange} />
			</div>

			<div className='space-y-3'>
				<div className='flex items-end justify-between font-bold'>
					<span className='text-[10px] text-concrete'>AGE_YRS</span>
					<span className='border border-slate-brutalist bg-obsidian px-3 py-1 text-white'>{age}.00</span>
				</div>
				<input type='range' id='age' name='age' value={age} min='0' max='100' onChange={handleUserAttributeChange} />
			</div>
		</div>
	)
}
