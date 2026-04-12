import { $userAttributes } from '@store/user-attributes'
import { calculateMacros } from '@utils/macro-functions'
import { useStore } from '@nanostores/react'
import { Sparkles } from 'lucide-react'
import { useState } from 'react'
import { AIMenuModal } from './AIMenuModal'
import { useAIWorker } from '../hooks/useAIWorker'

function buildPrompt(attrs: ReturnType<typeof $userAttributes.get>): string {
	const { lbm, bmrAndExercise, goal } = attrs
	const { proteinGrams, fatGrams, carbGrams, kcalPerDay } = calculateMacros(goal, lbm, bmrAndExercise)

	return `Actúa como un nutricionista profesional. Elabora un menú para un día de exactamente ${kcalPerDay} kcal (${carbGrams}g carbohidratos, ${fatGrams}g grasas y ${proteinGrams}g proteína).

## PASO PREVIO OBLIGATORIO:
Antes de escribir el bloque de código, realiza un desglose detallado de los macronutrientes por cada comida para asegurar que la SUMA TOTAL sea exactamente ${carbGrams}g de carbohidratos, ${fatGrams}g de grasas y ${proteinGrams}g de proteína.

## RESTRICCIONES DE SALIDA:
1. Calcula primero el desglose matemático de los macros.
2. Después responde ÚNICAMENTE con un bloque de código Markdown.
3. El bloque DEBE contener obligatoriamente dos secciones: '## 🍽️ Menú del Día' y '## 💡 Consejos del Nutricionista'.
4. Los gramos de los alimentos en el menú DEBEN coincidir con tu desglose matemático previo.
5. NO cierres el bloque de código (\`\`\`) hasta haber escrito al menos 4 consejos útiles.

## INSTRUCCIÓN DE FORMATO (Obligatorio seguir este orden):
1. Escribe el Menú (5 comidas).
2. Escribe una línea separadora: ---
3. Escribe la sección de Consejos.
4. CIERRA el bloque de código solo al final de los consejos.

## EJEMPLO DE SALIDA ESPERADA:
Antes de generar el menú, calcula mentalmente las porciones necesarias para que la suma de los macronutrientes coincida con el objetivo. Sigue exactamente esta estructura:
\`\`\`markdown
## 🍽️ Menú del Día

**🥣 Desayuno: [Nombre del plato]**
* [Gramos/Cantidad] de [Alimento]
* [Gramos/Cantidad] de [Alimento]

**🫒 Almuerzo: [Nombre del plato]**
* [Gramos/Cantidad] de [Alimento]
* [Gramos/Cantidad] de [Alimento]

**🥘 Comida: [Nombre del plato]**
* [Gramos/Cantidad] de [Alimento]
* [Gramos/Cantidad] de [Alimento]

**🍎 Merienda: [Nombre del plato]**
* [Gramos/Cantidad] de [Alimento]

**🐟 Cena: [Nombre del plato]**
* [Gramos/Cantidad] de [Alimento]
* [Gramos/Cantidad] de [Alimento]
---
## 💡 Consejos del Nutricionista

* **[Consejo 1]**
* **[Consejo 2]**
* **[Consejo 3]**
* **[Consejo 4]**
* **[Consejo 5]**
\`\`\`

### RESPUESTA (Genera el bloque de código completo, incluyendo los consejos finales):`
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
