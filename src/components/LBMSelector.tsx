import { useStore } from '@nanostores/react'
import { $userAttributes, updateUserLBM } from '@store/user-attributes'
import { calculateLBM } from '@utils/functions'
import clsx from 'clsx'
import { useCallback, useState } from 'react'
import type { LBMFormula } from 'src/types'

export const LBMSelector = () => {
	const { height, weight, genre } = useStore($userAttributes)
	const [showManualLBMInput, setShowManualLBMInput] = useState(false)

	const handleLBMFormulaChange = useCallback(
		(event: React.ChangeEvent<HTMLSelectElement>) => {
			const LBMFormulaSelected: LBMFormula = event.target.value as unknown as LBMFormula
			setShowManualLBMInput(LBMFormulaSelected === 'Manual')
			calculateLBM({ height, weight, genre, LBMFormulaSelected: LBMFormulaSelected, callbackWithLBMCalculated: updateUserLBM })
		},
		[height, weight, genre]
	)

	const handleManualLBMInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		const lbm: number = Number(event.target.value as string)
		if (!isNaN(lbm)) {
			updateUserLBM({
				formula: 'Manual',
				lbmKg: Number(lbm.toFixed(1)),
				lbmPercentage: Math.round((lbm / weight) * 100),
				bodyFatPercentage: Math.round(((weight - lbm) / weight) * 100),
			})
		}
	}, [])

	return (
		<div className='w-full'>
			<label htmlFor='LBMFormula' className='mb-2 block text-sm font-medium text-amber-900'>
				LBM formula
			</label>
			<div className='flex gap-2'>
				<select
					onChange={handleLBMFormulaChange}
					id='LBMFormula'
					className={clsx(
						showManualLBMInput ? 'w-3/5 md:w-3/4' : 'w-full',
						'block w-full rounded-lg border border-amber-300 bg-amber-50 p-2.5 text-sm text-amber-900 focus:border-amber-500 focus:ring-amber-500'
					)}
				>
					<option selected value='Boer'>
						Boer
					</option>
					<option value='James'>James</option>
					<option value='Hume'>Hume</option>
					<option value='Manual'>Manual</option>
				</select>
				<input
					type='number'
					name='manualLBMInput'
					onChange={handleManualLBMInputChange}
					placeholder='LBM in Kg'
					className={clsx(
						showManualLBMInput ? 'block w-2/5 md:w-1/4' : 'hidden',
						'block rounded-lg border border-amber-300 bg-amber-50 p-2.5 text-sm text-amber-900 focus:border-amber-500 focus:ring-amber-500'
					)}
				/>
			</div>
		</div>
	)
}

export default LBMSelector
