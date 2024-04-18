import { $updateUserGoal } from '@store/user-attributes'
import { defaultGoal } from '@utils/defaults'
import type { Goal } from 'src/types'

export const GoalSelector = () => {
	const handleGoalChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const goal: Goal = event.target.value as Goal
		$updateUserGoal(goal)
	}

	return (
		<div className='flex w-full flex-col gap-4'>
			<div>
				<h1 className='mb-2 block text-sm font-medium text-pink-900'>Goal</h1>
				<select
					name='goal'
					defaultValue={defaultGoal}
					onChange={handleGoalChange}
					className='block w-full border border-pink-300 bg-pink-50 p-2.5 text-sm text-pink-900 focus:border-pink-500 focus:ring-pink-500'
				>
					<option value='Maintain'>Maintain</option>
					<option value='Surplus'>Surplus</option>
					<option value='Deficit'>Deficit</option>
				</select>
			</div>
		</div>
	)
}
