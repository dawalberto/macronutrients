const config = {
	trailingComma: 'es5',
	tabWidth: 4,
	useTabs: true,
	semi: false,
	singleQuote: true,
	jsxSingleQuote: true,
	printWidth: 150,
}

export default {
	plugins: ['prettier-plugin-astro', 'prettier-plugin-tailwindcss'],
	overrides: [
		{
			files: '*.astro',
			options: {
				parser: 'astro',
				...config,
			},
		},
		{
			files: ['*.ts', '*.js', '*.tsx', '*.mjs'],
			options: {
				parser: 'typescript',
				...config,
			},
		},
	],
}
