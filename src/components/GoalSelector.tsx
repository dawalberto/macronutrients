import { defaultGoal } from '@lib/defaults'
import { $updateUserGoal } from '@store/user-attributes'
import type { Goal } from 'src/types'

export const GoalSelector = () => {
	const handleGoalChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const goal: Goal = event.target.value as Goal
		$updateUserGoal(goal)
	}

	return (
		<div className='flex w-full flex-col gap-4'>
			<div>
				<label htmlFor='goal' className='mb-2 block text-sm font-medium text-pink-900'>
					Goal
				</label>
				<select
					id='goal'
					name='goal'
					defaultValue={defaultGoal}
					onChange={handleGoalChange}
					className='block w-full border border-pink-300 bg-pink-50 p-2.5 text-sm text-pink-900 focus:border-pink-500 focus:ring-pink-500'
				>
					<option value='Maintain'>Maintain</option>
					<option value='Surplus'>Surplus</option>
					<option value='Definition'>Definition</option>
				</select>
			</div>
		</div>
	)
}
