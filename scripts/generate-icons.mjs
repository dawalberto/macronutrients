import { readFileSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PUBLIC = resolve(__dirname, '..', 'public')

const png = (svgPath, outPath, size) => {
	const svg = readFileSync(svgPath)
	return sharp(svg, { density: 384 })
		.resize(size, size, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
		.png({ compressionLevel: 9 })
		.toFile(outPath)
		.then(() => console.log(`✓ ${outPath} (${size}×${size})`))
}

const ogPng = (svgPath, outPath) => {
	const svg = readFileSync(svgPath)
	return sharp(svg, { density: 192 })
		.resize(1200, 630, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
		.png({ compressionLevel: 9 })
		.toFile(outPath)
		.then(() => console.log(`✓ ${outPath} (1200×630)`))
}

await Promise.all([
	png(resolve(PUBLIC, 'apple-touch-icon.svg'), resolve(PUBLIC, 'apple-touch-icon.png'), 180),
	png(resolve(PUBLIC, 'apple-touch-icon.svg'), resolve(PUBLIC, 'icon-192.png'), 192),
	png(resolve(PUBLIC, 'apple-touch-icon.svg'), resolve(PUBLIC, 'icon-512.png'), 512),
	png(resolve(PUBLIC, 'icon-maskable.svg'), resolve(PUBLIC, 'icon-maskable-512.png'), 512),
	ogPng(resolve(PUBLIC, 'og-image.svg'), resolve(PUBLIC, 'og-image.png')),
])
