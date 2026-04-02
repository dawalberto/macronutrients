import {
	gramsOfFatsInDefinition,
	gramsOfProteinsInDefinition,
	gramsOfProteinsInMaintain,
	gramsOfProteinsInSurplus,
	percentageOfFatsInSurplus,
} from '@lib/settings'
import { $userAttributes } from '@store/user-attributes'
import { useStore } from '@nanostores/react'
import { Sparkles } from 'lucide-react'
import { useState } from 'react'
import { Goal } from 'src/types'
import { AIMenuModal } from './AIMenuModal'
import { useAIWorker } from '../hooks/useAIWorker'

function buildPrompt(attrs: ReturnType<typeof $userAttributes.get>): string {
	const { height, weight, age, genre, lbm, bmrAndExercise, goal } = attrs

	let proteinGrams = 0
	let fatGrams = 0
	let carbGrams = 0
	let kcalPerDay = 0

	switch (goal) {
		case Goal.MAINTAIN:
			proteinGrams = gramsOfProteinsInMaintain * lbm.lbmKg
			fatGrams = lbm.lbmKg
			carbGrams = (bmrAndExercise.kcalPerDayToMaintain - (proteinGrams * 4 + fatGrams * 9)) / 4
			kcalPerDay = bmrAndExercise.kcalPerDayToMaintain
			break
		case Goal.SURPLUS:
			proteinGrams = gramsOfProteinsInSurplus * lbm.lbmKg
			fatGrams = (percentageOfFatsInSurplus * bmrAndExercise.kcalPerDayToSurplus) / 9
			carbGrams = (bmrAndExercise.kcalPerDayToSurplus - (proteinGrams * 4 + fatGrams * 9)) / 4
			kcalPerDay = bmrAndExercise.kcalPerDayToSurplus
			break
		case Goal.DEFINITION:
			proteinGrams = gramsOfProteinsInDefinition * lbm.lbmKg
			fatGrams = gramsOfFatsInDefinition * lbm.lbmKg
			carbGrams = (bmrAndExercise.kcalPerDayToDefinition - (proteinGrams * 4 + fatGrams * 9)) / 4
			kcalPerDay = bmrAndExercise.kcalPerDayToDefinition
			break
	}

	proteinGrams = Math.round(proteinGrams)
	fatGrams = Math.round(fatGrams)
	carbGrams = Math.round(carbGrams)
	kcalPerDay = Math.round(kcalPerDay)

	return [
		`You are a sports nutritionist. Generate a daily meal plan in markdown format.`,
		`Create a meal plan for a ${age}-year-old ${genre}, ${height}cm, ${weight}kg.`,
		`Goal: ${goal}. Daily target: ${kcalPerDay} kcal (${proteinGrams}g protein, ${fatGrams}g fat, ${carbGrams}g carbs).`,
		`Include breakfast, lunch, dinner, and 2 snacks. For each meal list the foods with approximate grams and macros.`,
		`End with a total summary row. Use markdown tables and headers. Be concise.`,
	].join(' ')
}

export const GenerateMenu = () => {
	const attrs = useStore($userAttributes)
	const { available, downloading, downloadProgress, generating, streamedText, generate } = useAIWorker()
	const [showModal, setShowModal] = useState(false)

	if (available === false) return null
	if (available === null && !downloading) return null

	const handleClick = () => {
		if (generating || downloading) return
		const prompt = buildPrompt(attrs)
		generate(prompt)
		setShowModal(true)
	}

	const isLoading = downloading && downloadProgress < 100
	const buttonText = isLoading ? `LOADING AI MODEL... ${downloadProgress}%` : generating ? 'GENERATING...' : 'GENERATE MENU'

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
