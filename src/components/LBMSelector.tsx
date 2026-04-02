import { useStore } from '@nanostores/react'
import { $userAttributes } from '@store/user-attributes'
import { selectLabelStyles, selectStyles } from '@styles/forms'
import { calculateAndUpdateLBM } from '@utils/lbm-functions'
import { ChevronDown } from 'lucide-react'
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
		<div className='w-full space-y-2'>
			<label title='Lean body mass' htmlFor='LBMFormula' className={selectLabelStyles}>
				LBM_FORMULA
			</label>
			<div className='flex gap-2'>
				<div className={`relative chamfered bg-obsidian p-0.5 ${showManualLBMInput ? 'w-3/5' : 'w-full'}`}>
					<select
						id='LBMFormula'
						name='LBMFormula'
						defaultValue={lbm.formula}
						onChange={handleLBMFormulaChange}
						className={selectStyles}
					>
						<option value='Boer'>Boer</option>
						<option value='James'>James</option>
						<option value='Hume'>Hume</option>
						<option value='Manual'>Manual</option>
					</select>
					<div className='pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-concrete'>
						<ChevronDown size={20} />
					</div>
				</div>
				<input
					type='number'
					name='manualLBMInput'
					onChange={handleManualLBMInputChange}
					defaultValue={lbm.lbmKg}
					placeholder='LBM in Kg'
					className={`${showManualLBMInput ? 'block w-2/5' : 'hidden'} border-2 border-slate-brutalist bg-[#0A0A0A] p-2 font-mono text-sm text-white outline-0`}
				/>
			</div>
		</div>
	)
}
