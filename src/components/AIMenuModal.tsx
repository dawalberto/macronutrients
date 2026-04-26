import { useTranslations } from '@i18n/index'
import { X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { Streamdown } from 'streamdown'
import 'streamdown/styles.css'

type AIMenuModalProps = {
	visible: boolean
	streamedText: string
	generating: boolean
	translating: boolean
	translatedText: string | null
	onClose: () => void
}

// Strip any preamble text before the first numbered list item the model generates.
// Small models often open with a greeting/intro sentence even when instructed not to.
function stripPreamble(text: string): string {
	const match = text.match(/(^|\n)\s*1[.)]\s/)
	if (!match || match.index === undefined) return text
	const start = text.indexOf(match[0])
	return text.slice(start).trimStart()
}

export const AIMenuModal = ({ visible, streamedText, generating, translating, translatedText, onClose }: AIMenuModalProps) => {
	const contentRef = useRef<HTMLDivElement>(null)
	const t = useTranslations()
	const displayText = translatedText !== null ? translatedText : stripPreamble(streamedText)
	const isActive = generating || translating

	useEffect(() => {
		if (contentRef.current) {
			contentRef.current.scrollTop = contentRef.current.scrollHeight
		}
	}, [streamedText, translatedText])

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape' && !isActive) onClose()
		}
		if (visible) document.addEventListener('keydown', handleKeyDown)
		return () => document.removeEventListener('keydown', handleKeyDown)
	}, [visible, isActive, onClose])

	if (!visible) return null

	return (
		<div
			className='fixed inset-0 z-50 flex items-center justify-center p-4'
			style={{ background: 'rgba(0,0,0,0.4)' }}
			onClick={isActive ? undefined : onClose}
		>
			<div
				className='flex max-h-[80vh] w-full max-w-xl flex-col bg-white'
				style={{
					border: '1px solid rgba(0,0,0,0.1)',
					borderRadius: '12px',
					boxShadow:
						'rgba(0,0,0,0.05) 0px 1px 3px, rgba(0,0,0,0.02) 0px 3px 7px, rgba(0,0,0,0.02) 0px 7px 15px, rgba(0,0,0,0.04) 0px 14px 28px, rgba(0,0,0,0.05) 0px 23px 52px',
				}}
				onClick={(e) => e.stopPropagation()}
			>
				{/* Header */}
				<div className='flex items-center justify-between px-6 py-4' style={{ borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
					<h2 style={{ fontSize: '15px', fontWeight: 600, color: 'rgba(0,0,0,0.95)', letterSpacing: '-0.1px' }}>{t.ai_tips_title}</h2>
					<button
						type='button'
						onClick={onClose}
						disabled={isActive}
						className='text-warm-gray-300 hover:bg-warm-white hover:text-warm-gray-500 cursor-pointer rounded p-1 transition-colors disabled:cursor-not-allowed disabled:opacity-30'
					>
						<X size={16} />
					</button>
				</div>

				{/* Content */}
				<div ref={contentRef} className='ai-content flex-1 overflow-y-auto p-6'>
					{displayText ? (
						<Streamdown mode={generating ? 'streaming' : 'static'} isAnimating={generating}>
							{displayText}
						</Streamdown>
					) : (
						<div className='text-warm-gray-300 flex items-center gap-2 text-sm'>
							<div className='bg-notion-blue h-1.5 w-1.5 animate-pulse rounded-full' />
							{t.generating_tips}
						</div>
					)}
				</div>

				{/* Streaming indicator */}
				{generating && streamedText && (
					<div className='px-6 py-3' style={{ borderTop: '1px solid rgba(0,0,0,0.08)' }}>
						<div className='text-warm-gray-300 flex items-center gap-2 text-xs'>
							<div className='h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500' />
							{t.ai_streaming}
						</div>
					</div>
				)}

				{/* Translating indicator */}
				{translating && (
					<div className='px-6 py-3' style={{ borderTop: '1px solid rgba(0,0,0,0.08)' }}>
						<div className='text-warm-gray-300 flex items-center gap-2 text-xs'>
							<div className='h-1.5 w-1.5 animate-pulse rounded-full bg-amber-500' />
							{t.translating_tips}
						</div>
					</div>
				)}

				{/* Disclaimer */}
				<div className='px-6 py-2.5' style={{ borderTop: '1px solid rgba(0,0,0,0.08)', background: 'rgba(251,191,36,0.08)' }}>
					<p style={{ fontSize: '11px', color: 'rgba(120,90,0,0.7)', letterSpacing: '0.01em' }}>⚠ {t.ai_disclaimer}</p>
				</div>
			</div>
		</div>
	)
}
