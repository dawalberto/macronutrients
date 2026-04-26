import { useEffect } from 'react'

export const ContentReveal = () => {
	useEffect(() => {
		const el = document.getElementById('app-content')
		if (el) el.style.opacity = '1'
	}, [])
	return null
}
