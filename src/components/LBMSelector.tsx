import { useStore } from '@nanostores/react'
import { $userAttributes, updateUserLBM } from '@store/user-attributes'
import { calculateLBM } from '@utils/functions'
import { useCallback } from 'react'
import type { LBM } from 'src/types'

export const LBMSelector = () => {
	const { height, weight, genre } = useStore($userAttributes)

	const handleFormulaLBMChange = useCallback(
		(event: React.ChangeEvent<HTMLSelectElement>) => {
			const formulaLBMSelected: Pick<LBM, 'formula'>['formula'] = event.target.value as unknown as Pick<LBM, 'formula'>['formula']
			calculateLBM({ height, weight, genre, formulaLBMSelected: formulaLBMSelected, callbackWithLBMCalculated: updateUserLBM })
		},
		[[height, weight, genre]]
	)

	return (
		<div className='w-full'>
			<label htmlFor='formulaLBM' className='mb-2 block text-sm font-medium text-amber-900'>
				LBM formula
			</label>
			<select
				onChange={handleFormulaLBMChange}
				// value={formulaLBMSelected}
				id='formulaLBM'
				className='block w-full rounded-lg border border-amber-300 bg-amber-50 p-2.5 text-sm text-amber-900 focus:border-amber-500 focus:ring-amber-500'
			>
				<option selected value='Boer'>
					Boer
				</option>
				<option value='James'>James</option>
				<option value='Hume'>Hume</option>
				<option value='Manual'>Manual</option>
			</select>
		</div>
	)
}

export default LBMSelector
