import { useStore } from '@nanostores/react'
import { $userAttributes } from '@store/user-attributes'
import { calculateAndUpdateLBM } from '@utils/lbm-functions'
import { clsx } from 'clsx'
import { LBMFormula } from 'src/types'

export const LBMSelector = () => {
	const { lbm } = useStore($userAttributes)
	const showManualLBMInput = lbm.formula === LBMFormula.MANUAL

	const handleLBMFormulaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const formula = event.target.value as LBMFormula
		calculateAndUpdateLBM({ formula })
	}

	const handleManualLBMInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const lbmManual: number = Number(event.target.value)
		if (!isNaN(lbmManual)) {
			calculateAndUpdateLBM({ lbmManual })
		}
	}

	return (
		<div className='w-full space-y-2'>
			<label title='Lean body mass' htmlFor='LBMFormula' className='select-label'>
				LBM_FORMULA
			</label>
			<div className='flex gap-2'>
				<div className={clsx('chamfered bg-obsidian relative p-0.5', showManualLBMInput ? 'w-3/5' : 'w-full')}>
					<select id='LBMFormula' name='LBMFormula' defaultValue={lbm.formula} onChange={handleLBMFormulaChange} className='form-select'>
						<option value={LBMFormula.BOER}>Boer</option>
						<option value={LBMFormula.JAMES}>James</option>
						<option value={LBMFormula.HUME}>Hume</option>
						<option value={LBMFormula.MANUAL}>Manual</option>
					</select>
				</div>
				<input
					type='number'
					name='manualLBMInput'
					onChange={handleManualLBMInputChange}
					defaultValue={lbm.lbmKg}
					placeholder='LBM in Kg'
					className={clsx('border-2 border-slate-brutalist bg-[#0A0A0A] p-2 font-mono text-sm text-white outline-0', showManualLBMInput ? 'block w-2/5' : 'hidden')}
				/>
			</div>
		</div>
	)
}
