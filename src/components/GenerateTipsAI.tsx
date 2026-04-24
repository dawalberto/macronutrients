import { $userAttributes } from '@store/user-attributes'
import { $locale } from '@store/locale'
import { useStore } from '@nanostores/react'
import { useTranslations } from '@i18n/index'
import { Sparkles } from 'lucide-react'
import { useState } from 'react'
import { AIMenuModal } from './AIMenuModal'
import { useAIWorker } from '../hooks/useAIWorker'

export const GenerateTipsAI = () => {
	const { goal } = useStore($userAttributes)
	const locale = useStore($locale)
	const t = useTranslations()
	const { available, downloading, downloadProgress, generating, streamedText, translating, translatedText, generate } = useAIWorker()
	const [showModal, setShowModal] = useState(false)

	if (available === false) return null
	if (available === null && !downloading) return null

	const handleClick = () => {
		if (generating || downloading) return

		generate(goal, locale)
		setShowModal(true)
	}

	const isLoading = downloading
	const buttonText = isLoading ? t.loading_ai(downloadProgress) : generating ? t.generating_tips : t.generate_tips

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
					onMouseEnter={(e) => {
						if (!generating && !isLoading) (e.currentTarget as HTMLButtonElement).style.background = '#005bab'
					}}
					onMouseLeave={(e) => {
						if (!generating && !isLoading) (e.currentTarget as HTMLButtonElement).style.background = '#0075de'
					}}
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

			<AIMenuModal
				visible={showModal}
				streamedText={streamedText}
				generating={generating}
				translating={translating}
				translatedText={translatedText}
				onClose={() => setShowModal(false)}
			/>
		</>
	)
}
