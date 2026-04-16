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
				<div className='chamfered brutalist-border bg-obsidian p-0.5'>
					<button
						type='button'
						onClick={handleClick}
						disabled={generating || isLoading}
						className='chamfered hover:bg-obsidian relative w-full cursor-pointer overflow-hidden bg-[#0A0A0A] px-6 py-4 font-extrabold tracking-tighter italic transition-all active:shadow-none disabled:cursor-not-allowed disabled:opacity-70'
					>
						{isLoading && (
							<div
								className='bg-obsidian absolute inset-0 transition-[width] duration-300 ease-out'
								style={{ width: `${downloadProgress}%` }}
							/>
						)}
						<span className='relative flex items-center justify-center gap-2 text-base'>
							{buttonText} {!isLoading && !generating && <Sparkles size={16} />}
						</span>
					</button>
				</div>
			</div>

			<AIMenuModal visible={showModal} streamedText={streamedText} generating={generating} onClose={() => setShowModal(false)} />
		</>
	)
}
