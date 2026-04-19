import { $userAttributes } from '@store/user-attributes'
import { calculateMacros } from '@utils/macro-functions'
import { useStore } from '@nanostores/react'
import { useTranslations } from '@i18n/index'
import { Goal } from 'src/types'
import { Sparkles } from 'lucide-react'
import { useState } from 'react'
import { AIMenuModal } from './AIMenuModal'
import { useAIWorker } from '../hooks/useAIWorker'

export const InterpretResults = () => {
	const attrs = useStore($userAttributes)
	const t = useTranslations()
	const { available, downloading, downloadProgress, generating, streamedText, generate } = useAIWorker()
	const [showModal, setShowModal] = useState(false)

	if (available === false) return null
	if (available === null && !downloading) return null

	const handleClick = () => {
		if (generating || downloading) return

		const { genre, age, weight, height, lbm, bmrAndExercise, goal } = attrs
		const { proteinGrams, fatGrams, carbGrams, kcalPerDay } = calculateMacros(goal, lbm, bmrAndExercise)
		const maintenanceKcal = Math.round(bmrAndExercise.kcalPerDayToMaintain)
		const difference = Math.abs(kcalPerDay - maintenanceKcal)
		const label = goal === Goal.DEFINITION ? 'Deficit' : goal === Goal.SURPLUS ? 'Surplus' : 'Balance'

		const systemPrompt = t.ai_interpret_system_prompt
		const userPrompt = t.ai_interpret_user_prompt(
			genre,
			age,
			weight,
			height,
			bmrAndExercise.exerciseMultiplier,
			goal,
			maintenanceKcal,
			kcalPerDay,
			difference,
			label,
			proteinGrams,
			carbGrams,
			fatGrams,
		)

		generate(systemPrompt, userPrompt)
		setShowModal(true)
	}

	const isLoading = downloading
	const buttonText = isLoading ? t.loading_ai(downloadProgress) : generating ? t.interpreting : t.interpret_results

	return (
		<>
			<div className='w-full'>
				<button
					type='button'
					onClick={handleClick}
					disabled={generating || isLoading}
					className='relative w-full cursor-pointer overflow-hidden rounded font-semibold text-white transition-all disabled:cursor-not-allowed disabled:opacity-60'
					style={{
						background: '#0075de',
						padding: '10px 16px',
						fontSize: '15px',
						border: '1px solid transparent',
					}}
					onMouseEnter={(e) => { if (!generating && !isLoading) (e.currentTarget as HTMLButtonElement).style.background = '#005bab' }}
					onMouseLeave={(e) => { if (!generating && !isLoading) (e.currentTarget as HTMLButtonElement).style.background = '#0075de' }}
				>
					{isLoading && (
						<div
							className='absolute inset-0 transition-[width] duration-300 ease-out'
							style={{ width: `${downloadProgress}%`, background: '#005bab' }}
						/>
					)}
					<span className='relative flex items-center justify-center gap-2'>
						{buttonText}
						{!isLoading && !generating && <Sparkles size={15} />}
					</span>
				</button>
			</div>

			<AIMenuModal visible={showModal} streamedText={streamedText} generating={generating} onClose={() => setShowModal(false)} />
		</>
	)
}
