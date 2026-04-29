import { useStore } from '@nanostores/react'
import { $userAttributes } from '@store/user-attributes'
import { useTranslations } from '@i18n/index'
import { calculateAndUpdateLBM } from '@utils/lbm-functions'
import { clsx } from 'clsx'
import { LBMFormula } from 'src/types'

export const LBMSelector = () => {
	const { lbm } = useStore($userAttributes)
	const t = useTranslations()
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
				{t.lbm_formula}
			</label>
			<div className='flex gap-2'>
				<select
					id='LBMFormula'
					name='LBMFormula'
					defaultValue={lbm.formula}
					onChange={handleLBMFormulaChange}
					className={clsx('form-select', showManualLBMInput ? 'w-3/5' : 'w-full')}
				>
					<option value={LBMFormula.BOER}>{t.lbm_boer}</option>
					<option value={LBMFormula.JAMES}>{t.lbm_james}</option>
					<option value={LBMFormula.HUME}>{t.lbm_hume}</option>
					<option value={LBMFormula.MANUAL}>{t.lbm_manual}</option>
				</select>
				<input
					type='number'
					name='manualLBMInput'
					onChange={handleManualLBMInputChange}
					defaultValue={lbm.lbmKg}
					placeholder={t.lbm_placeholder}
					className={clsx('rounded text-sm font-mono font-medium text-[rgba(0,0,0,0.9)] outline-none', showManualLBMInput ? 'block w-2/5' : 'hidden')}
					style={{ border: '1px solid #dddddd', padding: '6px 10px', background: '#fff' }}
				/>
			</div>
		</div>
	)
}
