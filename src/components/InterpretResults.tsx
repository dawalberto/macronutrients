import { $userAttributes } from '@store/user-attributes'
import { calculateMacros } from '@utils/macro-functions'
import { useStore } from '@nanostores/react'
import { Goal } from 'src/types'
import { Sparkles } from 'lucide-react'
import { useState } from 'react'
import { AIMenuModal } from './AIMenuModal'
import { useAIWorker } from '../hooks/useAIWorker'

const SYSTEM_PROMPT = `You are a concise nutrition assistant. Your only task is to interpret a user's caloric data and explain in 2-3 sentences what it means in practice.

Strict rules:
- Maximum 3 sentences.
- Do not ask questions.
- Do not give additional advice or mention doctors or medical professionals.
- Use friendly and direct language.
- If the goal is a deficit, mention the estimated weight loss (~0.5kg/week per 500kcal deficit).
- If the goal is a surplus, mention the estimated weight gain.
- If the goal is maintenance, confirm the balance.
- Respond in the same language the user data is written in.`

function buildPrompt(attrs: ReturnType<typeof $userAttributes.get>): string {
	const { genre, age, weight, height, lbm, bmrAndExercise, goal } = attrs
	const { proteinGrams, fatGrams, carbGrams, kcalPerDay } = calculateMacros(goal, lbm, bmrAndExercise)
	const maintenanceKcal = Math.round(bmrAndExercise.kcalPerDayToMaintain)
	const difference = Math.abs(kcalPerDay - maintenanceKcal)
	const label = goal === Goal.DEFINITION ? 'Deficit' : goal === Goal.SURPLUS ? 'Surplus' : 'Balance'

	return `User: ${genre}, ${age} years old, ${weight}kg, ${height}cm, ${bmrAndExercise.exerciseMultiplier} activity level.
Goal: ${goal}.
Maintenance calories: ${maintenanceKcal} kcal.
Target calories: ${kcalPerDay} kcal.
${label}: ${difference} kcal.
Proteins: ${proteinGrams}g | Carbohydrates: ${carbGrams}g | Fats: ${fatGrams}g.

Interpret these results.`
}

export const InterpretResults = () => {
	const attrs = useStore($userAttributes)
	const { available, downloading, downloadProgress, generating, streamedText, generate } = useAIWorker()
	const [showModal, setShowModal] = useState(false)

	if (available === false) return null
	if (available === null && !downloading) return null

	const handleClick = () => {
		if (generating || downloading) return
		const userPrompt = buildPrompt(attrs)
		generate(SYSTEM_PROMPT, userPrompt)
		setShowModal(true)
	}

	const isLoading = downloading && downloadProgress < 100
	const buttonText = isLoading ? `LOADING AI MODEL... ${downloadProgress}%` : generating ? 'INTERPRETING...' : 'INTERPRET RESULTS'

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
