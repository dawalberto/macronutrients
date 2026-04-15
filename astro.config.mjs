import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
	integrations: [
		react(),
		sitemap({
			i18n: {
				defaultLocale: 'en',
				locales: { en: 'en', es: 'es', fr: 'fr', zh: 'zh', hi: 'hi' },
			},
		}),
	],
	i18n: {
		defaultLocale: 'en',
		locales: ['en', 'es', 'fr', 'zh', 'hi'],
		routing: {
			prefixDefaultLocale: true,
			redirectToDefaultLocale: false,
		},
	},
	vite: {
		plugins: [tailwindcss()],
	},
	site: 'https://dawalberto.github.io',
	base: 'macronutrients',
})
