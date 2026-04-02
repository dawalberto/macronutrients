import { defaultGoal } from '@lib/defaults'
import { $updateUserGoal } from '@store/user-attributes'
import { Target } from 'lucide-react'
import { Goal } from 'src/types'

export const GoalSelector = () => {
	const handleGoalChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const goal: Goal = event.target.value as Goal
		$updateUserGoal(goal)
	}

	return (
		<div className='w-full space-y-2'>
			<label htmlFor='goal' className='select-label'>
				<Target size={10} /> TARGET_GOAL
			</label>
			<div className='chamfered bg-obsidian relative p-0.5'>
				<select id='goal' name='goal' defaultValue={defaultGoal} onChange={handleGoalChange} className='form-select'>
					<option value={Goal.MAINTAIN}>Maintain</option>
					<option value={Goal.SURPLUS}>Surplus</option>
					<option value={Goal.DEFINITION}>Definition</option>
				</select>
			</div>
		</div>
	)
}
