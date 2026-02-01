import { useStore } from '@nanostores/react'
import { $updateUserGoal, $userAttributes } from '@store/user-attributes'
import { selectLabelStyles, selectStyles } from '@styles/forms'
import clsx from 'clsx'
import type { Goal } from 'src/types'

export const GoalSelector = () => {
	const { goal } = useStore($userAttributes)

	const handleGoalChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const goal: Goal = event.target.value as Goal
		$updateUserGoal(goal)
	}

	return (
		<div className='flex w-full flex-col gap-4'>
			<div>
				<label htmlFor='goal' className={clsx(selectLabelStyles, 'text-pink-900')}>
					Goal
				</label>
				<select
					id='goal'
					name='goal'
					value={goal}
					onChange={handleGoalChange}
					className={clsx(selectStyles, 'border-pink-300 bg-pink-50 text-pink-900 focus:border-pink-500 focus:ring-pink-500')}
				>
					<option value='Maintain'>Maintain</option>
					<option value='Surplus'>Surplus</option>
					<option value='Definition'>Definition</option>
				</select>
			</div>
		</div>
	)
}
