import { defaultGoal } from '@lib/defaults'
import { $updateUserGoal } from '@store/user-attributes'
import { selectLabelStyles, selectStyles } from '@styles/forms'
import { ChevronDown, Target } from 'lucide-react'
import type { Goal } from 'src/types'

export const GoalSelector = () => {
	const handleGoalChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const goal: Goal = event.target.value as Goal
		$updateUserGoal(goal)
	}

	return (
		<div className='w-full space-y-2'>
			<label htmlFor='goal' className={selectLabelStyles}>
				<Target size={10} /> TARGET_GOAL
			</label>
			<div className='relative chamfered bg-obsidian p-0.5'>
				<select id='goal' name='goal' defaultValue={defaultGoal} onChange={handleGoalChange} className={selectStyles}>
					<option value='Maintain'>Maintain</option>
					<option value='Surplus'>Surplus</option>
					<option value='Definition'>Definition</option>
				</select>
				<div className='pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-concrete'>
					<ChevronDown size={20} />
				</div>
			</div>
		</div>
	)
}
