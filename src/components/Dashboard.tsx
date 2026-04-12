import { useStore } from '@nanostores/react'
import { $updateUserAge, $updateUserGenre, $updateUserHeight, $updateUserWeight, $userAttributes } from '@store/user-attributes'
import { clsx } from 'clsx'
import { User } from 'lucide-react'
import { Genre, UserAttributesNamesDashboard } from 'src/types'

export const Dashboard = () => {
	const { weight, height, age, genre } = useStore($userAttributes)

	const handleUserAttributeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const attribute = event.target.name as UserAttributesNamesDashboard
		const value = parseInt(event.target.value)

		switch (attribute) {
			case UserAttributesNamesDashboard.WEIGHT:
				$updateUserWeight(value)
				return
			case UserAttributesNamesDashboard.HEIGHT:
				$updateUserHeight(value)
				return
			case UserAttributesNamesDashboard.AGE:
				$updateUserAge(value)
				return
		}
	}

	return (
		<div className='flex w-full flex-col gap-8'>
			<div className='flex w-full gap-4'>
				<button
					onClick={() => $updateUserGenre(Genre.MALE)}
					className={clsx('flex flex-1 items-center justify-center gap-2 p-4 font-bold transition-all', {
						'brutalist-border-active bg-gray-100 text-black': genre === Genre.MALE,
						'bg-obsidian brutalist-border text-gray-400 opacity-50': genre !== Genre.MALE,
					})}
				>
					<User size={16} /> MALE
				</button>
				<button
					onClick={() => $updateUserGenre(Genre.FEMALE)}
					className={clsx('flex flex-1 items-center justify-center gap-2 p-4 font-bold transition-all', {
						'brutalist-border-active bg-gray-100 text-black': genre === Genre.FEMALE,
						'bg-obsidian brutalist-border text-gray-400 opacity-50': genre !== Genre.FEMALE,
					})}
				>
					<User size={16} /> FEMALE
				</button>
			</div>

			<div className='space-y-3'>
				<div className='flex items-end justify-between font-bold'>
					<span className='text-concrete text-[clamp(11px,1.2vw,13px)]'>WEIGHT_KG</span>
					<input
						type='number'
						name='weight'
						value={weight}
						min='0'
						max='200'
						onChange={handleUserAttributeChange}
						className='w-20 bg-obsidian border border-slate-brutalist px-3 py-1 text-white text-right [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
					/>
				</div>
				<input type='range' id='weight' name='weight' value={weight} min='0' max='200' onChange={handleUserAttributeChange} />
			</div>

			<div className='space-y-3'>
				<div className='flex items-end justify-between font-bold'>
					<span className='text-concrete text-[clamp(11px,1.2vw,13px)]'>HEIGHT_CM</span>
					<input
						type='number'
						name='height'
						value={height}
						min='0'
						max='250'
						onChange={handleUserAttributeChange}
						className='w-20 bg-obsidian border border-slate-brutalist px-3 py-1 text-white text-right [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
					/>
				</div>
				<input type='range' id='height' name='height' value={height} min='0' max='250' onChange={handleUserAttributeChange} />
			</div>

			<div className='space-y-3'>
				<div className='flex items-end justify-between font-bold'>
					<span className='text-concrete text-[clamp(11px,1.2vw,13px)]'>AGE_YRS</span>
					<input
						type='number'
						name='age'
						value={age}
						min='0'
						max='100'
						onChange={handleUserAttributeChange}
						className='w-20 bg-obsidian border border-slate-brutalist px-3 py-1 text-white text-right [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
					/>
				</div>
				<input type='range' id='age' name='age' value={age} min='0' max='100' onChange={handleUserAttributeChange} />
			</div>
		</div>
	)
}
