import { useStore } from '@nanostores/react'
import { $updateUserLBM, $userAttributes } from '@store/user-attributes'
import { defaultLBMFormula } from '@utils/defaults'
import { calculateLBM } from '@utils/lbm-functions'
import clsx from 'clsx'
import { useCallback, useState } from 'react'
import type { LBMFormula } from 'src/types'

export const LBMSelector = () => {
	const { weight } = useStore($userAttributes)
	const [showManualLBMInput, setShowManualLBMInput] = useState(false)

	const handleLBMFormulaChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
		const LBMFormulaSelected: LBMFormula = event.target.value as unknown as LBMFormula
		setShowManualLBMInput(LBMFormulaSelected === 'Manual')
		calculateLBM({ LBMFormulaSelected: LBMFormulaSelected, callbackOnCalculate: $updateUserLBM })
	}, [])

	const handleManualLBMInputChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const lbm: number = Number(event.target.value as string)
			if (!isNaN(lbm)) {
				$updateUserLBM({
					formula: 'Manual',
					lbmKg: Number(lbm.toFixed(1)),
					lbmPercentage: Math.round((lbm / weight) * 100),
					bodyFatPercentage: Math.round(((weight - lbm) / weight) * 100),
				})
			}
		},
		[weight]
	)

	return (
		<div className='w-full'>
			<label htmlFor='LBMFormula' className='mb-2 block text-sm font-medium text-lime-900'>
				LBM formula
			</label>
			<div className='flex gap-2'>
				<select
					defaultValue={defaultLBMFormula}
					onChange={handleLBMFormulaChange}
					className={clsx(
						showManualLBMInput ? 'w-3/5' : 'w-full',
						'block border border-lime-300 bg-lime-50 p-2.5 text-sm text-lime-900 focus:border-lime-500 focus:ring-lime-500'
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
					placeholder='LBM in Kg'
					className={clsx(
						showManualLBMInput ? 'block w-2/5' : 'hidden',
						'block border border-lime-300 bg-lime-50 p-2.5 text-sm text-lime-900 focus:border-lime-500 focus:ring-lime-500'
					)}
				/>
			</div>
		</div>
	)
}

export default LBMSelector
