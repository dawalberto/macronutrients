import { useStore } from '@nanostores/react'
import { $userAttributes } from '@store/user-attributes'
import { selectStyles } from '@styles/selects'
import { calculateAndUpdateLBM } from '@utils/lbm-functions'
import clsx from 'clsx'
import { useCallback, useState } from 'react'
import type { LBMFormula } from 'src/types'

export const LBMSelector = () => {
	const { lbm } = useStore($userAttributes)
	const [showManualLBMInput, setShowManualLBMInput] = useState(lbm.formula === 'Manual')

	const handleLBMFormulaChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
		const formula: LBMFormula = event.target.value as unknown as LBMFormula
		setShowManualLBMInput(formula === 'Manual')
		calculateAndUpdateLBM({ formula })
	}, [])

	const handleManualLBMInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		const lbmManual: number = Number(event.target.value as string)
		if (!isNaN(lbmManual)) {
			calculateAndUpdateLBM({ lbmManual })
		}
	}, [])

	return (
		<div className='w-full'>
			<label htmlFor='LBMFormula' className='mb-2 block text-sm font-medium text-lime-900'>
				LBM formula
			</label>
			<div className='flex gap-2'>
				<select
					id='LBMFormula'
					name='LBMFormula'
					defaultValue={lbm.formula}
					onChange={handleLBMFormulaChange}
					className={clsx(
						selectStyles,
						showManualLBMInput ? 'w-3/5' : 'w-full',
						'border-lime-300 bg-lime-50 text-lime-900 focus:border-lime-500 focus:ring-lime-500'
					)}
				>
					<option value='Boer'>Boer</option>
					<option value='James'>James</option>
					<option value='Hume'>Hume</option>
					<option value='Manual'>Manual</option>
				</select>
				<input
					type='number'
					name='manualLBMInput'
					onChange={handleManualLBMInputChange}
					defaultValue={lbm.lbmKg}
					placeholder='LBM in Kg'
					className={clsx(
						showManualLBMInput ? 'block w-2/5' : 'hidden',
						'block h-10 max-h-12 min-h-9 rounded-none border border-lime-300 bg-lime-50 p-2.5 text-sm text-lime-900 shadow-md focus:border-lime-500 focus:ring-lime-500'
					)}
				/>
			</div>
		</div>
	)
}
