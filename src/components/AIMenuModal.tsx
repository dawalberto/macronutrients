import { useTranslations } from '@i18n/index'
import { X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { Streamdown } from 'streamdown'
import 'streamdown/styles.css'

type AIMenuModalProps = {
	visible: boolean
	streamedText: string
	generating: boolean
	onClose: () => void
}

export const AIMenuModal = ({ visible, streamedText, generating, onClose }: AIMenuModalProps) => {
	const contentRef = useRef<HTMLDivElement>(null)
	const t = useTranslations()

	useEffect(() => {
		if (contentRef.current) {
			contentRef.current.scrollTop = contentRef.current.scrollHeight
		}
	}, [streamedText])

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape' && !generating) onClose()
		}
		if (visible) document.addEventListener('keydown', handleKeyDown)
		return () => document.removeEventListener('keydown', handleKeyDown)
	}, [visible, generating, onClose])

	if (!visible) return null

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4' onClick={generating ? undefined : onClose}>
			<div className='chamfered brutalist-border flex max-h-[80vh] w-full max-w-xl flex-col bg-[#0A0A0A]' onClick={(e) => e.stopPropagation()}>
				<div className='flex items-center justify-between border-b-2 border-[#4A4A4A] px-6 py-4'>
					<h2 className='text-sm font-extrabold tracking-tighter italic'>{t.ai_interpretation}</h2>
					<button
						type='button'
						onClick={onClose}
						disabled={generating}
						className='cursor-pointer text-[#8C8C8C] transition-colors hover:text-gray-100 disabled:cursor-not-allowed disabled:opacity-30'
					>
						<X size={18} />
					</button>
				</div>

				<div ref={contentRef} className='ai-content flex-1 overflow-y-auto p-6'>
					{streamedText ? (
						<Streamdown mode={generating ? 'streaming' : 'static'} isAnimating={generating}>
							{streamedText}
						</Streamdown>
					) : (
						<div className='flex items-center gap-2 text-xs text-[#8C8C8C]'>
							<div className='h-2 w-2 animate-pulse bg-gray-100' />
							{t.ai_interpreting}
						</div>
					)}
				</div>

				{generating && streamedText && (
					<div className='border-t-2 border-[#4A4A4A] px-6 py-3'>
						<div className='flex items-center gap-2 text-xs text-[#8C8C8C]'>
							<div className='h-1.5 w-1.5 animate-pulse bg-emerald-500' />
							{t.ai_streaming}
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
