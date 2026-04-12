import { useStore } from '@nanostores/react'
import { $updateUserAge, $updateUserGenre, $updateUserHeight, $updateUserWeight, $userAttributes } from '@store/user-attributes'
import { useTranslations } from '@i18n/index'
import { clsx } from 'clsx'
import { User } from 'lucide-react'
import { Genre, UserAttributesNamesDashboard } from 'src/types'

export const Dashboard = () => {
	const { weight, height, age, genre } = useStore($userAttributes)
	const t = useTranslations()

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
					<User size={16} /> {t.male}
				</button>
				<button
					onClick={() => $updateUserGenre(Genre.FEMALE)}
					className={clsx('flex flex-1 items-center justify-center gap-2 p-4 font-bold transition-all', {
						'brutalist-border-active bg-gray-100 text-black': genre === Genre.FEMALE,
						'bg-obsidian brutalist-border text-gray-400 opacity-50': genre !== Genre.FEMALE,
					})}
				>
					<User size={16} /> {t.female}
				</button>
			</div>

			<div className='space-y-3'>
				<div className='flex items-end justify-between font-bold'>
					<span className='text-concrete text-[clamp(11px,1.2vw,13px)]'>{t.weight_kg}</span>
					<span className='bg-obsidian border border-slate-brutalist px-3 py-1 text-white'>{weight}.00</span>
				</div>
				<input type='range' id='weight' name='weight' value={weight} min='0' max='200' onChange={handleUserAttributeChange} />
			</div>

			<div className='space-y-3'>
				<div className='flex items-end justify-between font-bold'>
					<span className='text-concrete text-[clamp(11px,1.2vw,13px)]'>{t.height_cm}</span>
					<span className='bg-obsidian border border-slate-brutalist px-3 py-1 text-white'>{height}.00</span>
				</div>
				<input type='range' id='height' name='height' value={height} min='0' max='250' onChange={handleUserAttributeChange} />
			</div>

			<div className='space-y-3'>
				<div className='flex items-end justify-between font-bold'>
					<span className='text-concrete text-[clamp(11px,1.2vw,13px)]'>{t.age_yrs}</span>
					<span className='bg-obsidian border border-slate-brutalist px-3 py-1 text-white'>{age}.00</span>
				</div>
				<input type='range' id='age' name='age' value={age} min='0' max='100' onChange={handleUserAttributeChange} />
			</div>
		</div>
	)
}
