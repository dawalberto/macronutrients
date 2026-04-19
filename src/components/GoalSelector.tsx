import { defaultGoal } from '@lib/defaults'
import { $updateUserGoal } from '@store/user-attributes'
import { useTranslations } from '@i18n/index'
import { Goal } from 'src/types'

export const GoalSelector = () => {
	const t = useTranslations()

	const handleGoalChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const goal: Goal = event.target.value as Goal
		$updateUserGoal(goal)
	}

	return (
		<div className='w-full space-y-2'>
			<label htmlFor='goal' className='select-label'>
				{t.target_goal}
			</label>
			<select id='goal' name='goal' defaultValue={defaultGoal} onChange={handleGoalChange} className='form-select'>
				<option value={Goal.MAINTAIN}>{t.goal_maintain}</option>
				<option value={Goal.SURPLUS}>{t.goal_surplus}</option>
				<option value={Goal.DEFINITION}>{t.goal_definition}</option>
			</select>
		</div>
	)
}
