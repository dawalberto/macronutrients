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
		<div
			className='fixed inset-0 z-50 flex items-center justify-center p-4'
			style={{ background: 'rgba(0,0,0,0.4)' }}
			onClick={generating ? undefined : onClose}
		>
			<div
				className='flex max-h-[80vh] w-full max-w-xl flex-col bg-white'
				style={{
					border: '1px solid rgba(0,0,0,0.1)',
					borderRadius: '12px',
					boxShadow: 'rgba(0,0,0,0.05) 0px 1px 3px, rgba(0,0,0,0.02) 0px 3px 7px, rgba(0,0,0,0.02) 0px 7px 15px, rgba(0,0,0,0.04) 0px 14px 28px, rgba(0,0,0,0.05) 0px 23px 52px',
				}}
				onClick={(e) => e.stopPropagation()}
			>
				{/* Header */}
				<div
					className='flex items-center justify-between px-6 py-4'
					style={{ borderBottom: '1px solid rgba(0,0,0,0.08)' }}
				>
					<h2 style={{ fontSize: '15px', fontWeight: 600, color: 'rgba(0,0,0,0.95)', letterSpacing: '-0.1px' }}>
						{t.ai_interpretation}
					</h2>
					<button
						type='button'
						onClick={onClose}
						disabled={generating}
						className='cursor-pointer rounded p-1 text-warm-gray-300 transition-colors hover:bg-warm-white hover:text-warm-gray-500 disabled:cursor-not-allowed disabled:opacity-30'
					>
						<X size={16} />
					</button>
				</div>

				{/* Content */}
				<div ref={contentRef} className='ai-content flex-1 overflow-y-auto p-6'>
					{streamedText ? (
						<Streamdown mode={generating ? 'streaming' : 'static'} isAnimating={generating}>
							{streamedText}
						</Streamdown>
					) : (
						<div className='flex items-center gap-2 text-sm text-warm-gray-300'>
							<div className='h-1.5 w-1.5 animate-pulse rounded-full bg-notion-blue' />
							{t.ai_interpreting}
						</div>
					)}
				</div>

				{/* Streaming indicator */}
				{generating && streamedText && (
					<div className='px-6 py-3' style={{ borderTop: '1px solid rgba(0,0,0,0.08)' }}>
						<div className='flex items-center gap-2 text-xs text-warm-gray-300'>
							<div className='h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500' />
							{t.ai_streaming}
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
