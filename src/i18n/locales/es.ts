import type { Translations } from './en'

export const es = {
	// Dashboard
	weight_kg: 'PESO_KG',
	height_cm: 'ALTURA_CM',
	age_yrs: 'EDAD_AÑOS',
	male: 'HOMBRE',
	female: 'MUJER',

	// BMR Selector
	bmr_equation: 'ECUACIÓN_BMR',
	bmr_mifflin: 'Mifflin St Jeor',
	bmr_harris: 'Revised Harris-Benedict',
	bmr_katch: 'Katch-McArdle',

	// Exercise Multiplier
	exercise_multiplier: 'MULTIPLICADOR_EJERCICIO',
	exercise_sedentary: 'Sedentario',
	exercise_lightly: 'Ligeramente activo',
	exercise_moderately: 'Moderadamente activo',
	exercise_very: 'Muy activo',
	exercise_extremely: 'Extremadamente activo',

	// Goal Selector
	target_goal: 'OBJETIVO',
	goal_maintain: 'Mantener',
	goal_surplus: 'Superávit',
	goal_definition: 'Definición',

	// LBM Selector
	lbm_formula: 'FÓRMULA_MCM',
	lbm_boer: 'Boer',
	lbm_james: 'James',
	lbm_hume: 'Hume',
	lbm_manual: 'Manual',
	lbm_placeholder: 'MCM en Kg',

	// Additional Settings
	advanced_settings: 'CONFIGURACIÓN_AVANZADA',

	// Chart
	daily_caloric_quota: '◉ CUOTA_CALÓRICA_DIARIA',
	chart_carbs: (n: number) => `${n}G CARBOHIDRATOS`,
	chart_fats: (n: number) => `${n}G GRASAS`,
	chart_prot: (n: number) => `${n}G PROTEÍNA`,
	chart_title: (kcal: number) => `${kcal} KCAL / DÍA`,

	// AI Modal
	ai_interpretation: 'INTERPRETACIÓN_IA',
	ai_interpreting: 'INTERPRETANDO...',
	ai_streaming: 'TRANSMITIENDO...',

	// AI Buttons (InterpretResults)
	interpret_results: 'INTERPRETAR RESULTADOS',
	interpreting: 'INTERPRETANDO...',
	loading_ai: (pct: number) => `CARGANDO MODELO IA... ${pct}%`,

	// Header
	page_title: 'MACRO_CALC',
	system_status: 'ESTADO: ÓPTIMO // MOTOR_NUTRICIÓN_BRUTALISTA',

	// Footer / Nav
	footer_info_link: 'INFO // FÓRMULAS Y DEFINICIONES →',
	select_language: 'IDIOMA',

	// Info page header/nav
	reference_manual: 'MANUAL_REFERENCIA // FÓRMULAS Y DEFINICIONES',
	back_to_calculator: '← VOLVER_A_CALCULADORA',

	// Info page — Module 01: LBM
	info_module_01: 'MÓDULO_01',
	info_lbm_title: 'MCM — MASA CORPORAL MAGRA',
	info_lbm_desc:
		'Tu peso menos la grasa corporal. Incluye músculos, huesos, órganos y agua. La MCM es la base para todos los objetivos de macros — no el peso corporal total — porque el tejido graso tiene una actividad metabólica mínima y no necesita proteínas ni carbohidratos para mantenerse.',
	info_lbm_boer_label: 'BOER (PREDETERMINADO)',
	info_lbm_boer_note: 'W = peso (kg), H = altura (cm)',
	info_lbm_james_note: 'Puede subestimar la MCM en personas obesas.',
	info_lbm_manual_desc: 'Introduce tu MCM directamente si tienes una medición de composición corporal (DEXA, BodPod, etc.).',

	// Info page — Module 02: BMR
	info_module_02: 'MÓDULO_02',
	info_bmr_title: 'BMR — TASA METABÓLICA BASAL',
	info_bmr_desc:
		'Calorías que tu cuerpo quema en reposo completo — solo para mantener los órganos funcionando. Es el mínimo de tus necesidades energéticas. Todo lo que está por encima viene de la actividad física.',
	info_bmr_mifflin_note: 'W = peso (kg), H = altura (cm), A = edad (años). Mayor precisión para la población general.',
	info_bmr_harris_note: 'Fórmula clásica revisada por Roza & Shizgal (1984). Estimaciones ligeramente superiores a Mifflin.',
	info_bmr_katch_label: 'KATCH-MCARDLE (PREDETERMINADO)',
	info_bmr_katch_note: 'Usa la MCM en lugar del peso total — más precisa cuando se conoce la composición corporal. Neutral al género.',

	// Info page — Module 03: TDEE
	info_module_03: 'MÓDULO_03',
	info_tdee_title: 'TDEE — GASTO ENERGÉTICO DIARIO TOTAL',
	info_tdee_desc: 'Tu quema real de calorías diarias. Calculada como el BMR multiplicado por un factor de actividad que tiene en cuenta el ejercicio y el estilo de vida.',
	info_tdee_formula: 'TDEE = BMR × multiplicador_actividad',
	info_tdee_sedentary_desc: '× 1.2 — trabajo de escritorio, sin ejercicio',
	info_tdee_lightly_desc: '× 1.375 — 1–3 días/semana',
	info_tdee_moderately_desc: '× 1.55 — 3–5 días/semana',
	info_tdee_very_desc: '× 1.725 — 6–7 días/semana',
	info_tdee_extremely_desc: '× 1.9 — trabajo físico o 2×/día',

	// Info page — Module 04: Goals
	info_module_04: 'MÓDULO_04',
	info_goals_title: 'OBJETIVOS — METAS CALÓRICAS',
	info_goal_maintain_formula: 'Calorías = TDEE',
	info_goal_maintain_desc: 'Mantener el peso actual. Distribución equilibrada de macros para apoyar la actividad y la composición corporal.',
	info_goal_surplus_formula: 'Calorías = TDEE + 300 kcal',
	info_goal_surplus_desc: 'Superávit calórico moderado para apoyar el crecimiento muscular. Más carbohidratos para el entrenamiento; grasa al 25% de las calorías totales.',
	info_goal_definition_formula: 'Calorías = TDEE − 300 kcal',
	info_goal_definition_desc: 'Déficit moderado para la pérdida de grasa. La proteína aumenta para preservar la masa muscular. Los carbohidratos completan las calorías restantes.',

	// Info page — Module 05: Macros
	info_module_05: 'MÓDULO_05',
	info_macros_title: 'MACRONUTRIENTES — DISTRIBUCIÓN',
	info_macros_desc:
		'Los gramos de cada macro se establecen por kg de MCM (no del peso total). Los carbohidratos siempre completan las calorías restantes después de contabilizar la proteína y la grasa.',
	info_protein_targets: 'OBJETIVOS DE PROTEÍNA (por kg de MCM)',
	info_fat_targets: 'OBJETIVOS DE GRASA',
	info_carbs_label: 'CARBOHIDRATOS',
	info_carbs_formula: 'Resto = (kcal_total − kcal_proteína − kcal_grasa) / 4',

	// AI prompts — InterpretResults
	ai_interpret_system_prompt: `Eres un asistente de nutrición conciso. Tu única tarea es interpretar los datos calóricos de un usuario y explicar en 2-3 frases su significado práctico.

Reglas estrictas:
- Máximo 3 frases.
- No hagas preguntas.
- No des consejos adicionales ni menciones a médicos o profesionales de la salud.
- Usa un lenguaje amigable y directo.
- Si el objetivo es un déficit calórico, menciona la pérdida de peso estimada (~0.5 kg/semana por cada 500 kcal de déficit).
- Si el objetivo es un superávit calórico, menciona el aumento de peso estimado.
- Si el objetivo es el mantenimiento, confirma el balance.
- Responde en español.`,

	ai_interpret_user_prompt: (
		genre: string,
		age: number,
		weight: number,
		height: number,
		activityLevel: string,
		goal: string,
		maintenanceKcal: number,
		targetKcal: number,
		diff: number,
		label: string,
		proteins: number,
		carbs: number,
		fats: number,
	) =>
		`Usuario: ${genre}, ${age} años, ${weight} kg, ${height} cm, ${activityLevel} nivel de actividad.
Objetivo: ${goal}.
Calorías de mantenimiento: ${maintenanceKcal} kcal.
Calorías objetivo: ${targetKcal} kcal.
${label}: ${diff} kcal.
Proteínas: ${proteins} g | Carbohidratos: ${carbs} g | Grasas: ${fats} g.

Interpreta estos resultados.`,

	// SEO — Home
	seo_home_title: 'MacroCalc — Calculadora de Macronutrientes Gratis',
	seo_home_description:
		'Calcula tus objetivos diarios de proteínas, carbohidratos y grasas según tu peso, altura, edad, actividad y objetivo. Usa fórmulas de BMR y masa corporal magra.',
	seo_home_keywords:
		'calculadora macronutrientes, calculadora macro, calculadora proteínas, calculadora TDEE, calculadora BMR, masa corporal magra, calorías pérdida de peso, macros para músculo',
	seo_og_tagline: 'Objetivos macro precisos. Gratis. Sin registro.',

	// SEO — Info
	seo_info_title: 'Fórmulas y Definiciones — Referencia MacroCalc',
	seo_info_description:
		'LBM, BMR, TDEE y fórmulas de macronutrientes explicadas. Boer, James, Hume, Mifflin-St Jeor, Harris-Benedict, Katch-McArdle.',

	// SEO — FAQ
	seo_faq_lbm_q: '¿Qué es la Masa Corporal Magra (LBM) y por qué importa?',
	seo_faq_lbm_a:
		'La Masa Corporal Magra es tu peso total menos la grasa corporal — incluye músculo, hueso, órganos y agua. MacroCalc la usa como base porque el tejido graso no necesita proteínas ni carbohidratos para mantenerse, lo que da objetivos más precisos.',
	seo_faq_bmr_q: '¿Qué es la Tasa Metabólica Basal (BMR)?',
	seo_faq_bmr_a:
		'El BMR son las calorías que tu cuerpo quema en reposo completo. MacroCalc soporta tres ecuaciones: Mifflin-St Jeor, Harris-Benedict Revisado y Katch-McArdle (más preciso cuando se conoce la composición corporal).',
	seo_faq_tdee_q: '¿Cómo se calcula el Gasto Energético Total Diario (TDEE)?',
	seo_faq_tdee_a:
		'TDEE = BMR × multiplicador de actividad. Sedentario (×1.2), Ligeramente activo (×1.375), Moderadamente activo (×1.55), Muy activo (×1.725), Extremadamente activo (×1.9).',
	seo_faq_macros_q: '¿Cómo distribuye MacroCalc proteínas, carbohidratos y grasas?',
	seo_faq_macros_a:
		'Proteína y grasa se fijan en gramos por kg de LBM según tu objetivo. Los carbohidratos llenan las calorías restantes. Mantenimiento: 1.8 g proteína/kg, 1.0 g grasa/kg. Superávit: 2.0 g proteína, grasa al 25%. Definición: 2.5 g proteína, 0.9 g grasa/kg.',
	seo_faq_goals_q: '¿Cuáles son los ajustes calóricos para cada objetivo?',
	seo_faq_goals_a:
		'Mantener: calorías = TDEE. Superávit: TDEE +300 kcal para ganar músculo. Definición: TDEE −300 kcal para pérdida moderada de grasa (aprox. 0.5 kg/semana por cada 500 kcal de déficit).',
} satisfies Translations
