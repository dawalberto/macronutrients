export const en = {
	// Dashboard
	weight_kg: 'WEIGHT_KG',
	height_cm: 'HEIGHT_CM',
	age_yrs: 'AGE_YRS',
	male: 'MALE',
	female: 'FEMALE',

	// BMR Selector
	bmr_equation: 'BMR_EQUATION',
	bmr_mifflin: 'Mifflin St Jeor',
	bmr_harris: 'Revised Harris-Benedict',
	bmr_katch: 'Katch-McArdle',

	// Exercise Multiplier
	exercise_multiplier: 'EXERCISE_MULTIPLIER',
	exercise_sedentary: 'Sedentary',
	exercise_lightly: 'Lightly active',
	exercise_moderately: 'Moderately active',
	exercise_very: 'Very active',
	exercise_extremely: 'Extremely active',

	// Goal Selector
	target_goal: 'TARGET_GOAL',
	goal_maintain: 'Maintain',
	goal_surplus: 'Surplus',
	goal_definition: 'Definition',

	// LBM Selector
	lbm_formula: 'LBM_FORMULA',
	lbm_boer: 'Boer',
	lbm_james: 'James',
	lbm_hume: 'Hume',
	lbm_manual: 'Manual',
	lbm_placeholder: 'LBM in Kg',

	// Additional Settings
	advanced_settings: 'ADVANCED_SETTINGS',

	// Chart
	daily_caloric_quota: '◉ DAILY_CALORIC_QUOTA',
	chart_carbs: (n: number) => `${n}G CARBS`,
	chart_fats: (n: number) => `${n}G FATS`,
	chart_prot: (n: number) => `${n}G PROT`,
	chart_title: (kcal: number) => `${kcal} KCAL / DAY`,

	// AI Modal
	ai_interpretation: 'AI_INTERPRETATION',
	ai_interpreting: 'INTERPRETING...',
	ai_streaming: 'STREAMING...',

	// AI Buttons (InterpretResults)
	interpret_results: 'INTERPRET RESULTS',
	interpreting: 'INTERPRETING...',
	loading_ai: (pct: number) => `LOADING AI MODEL... ${pct}%`,

	// Header
	page_title: 'MACRO_CALC V1.0',
	system_status: 'SYSTEM STATUS: OPTIMAL // BRUTALIST NUTRITION ENGINE',

	// Footer / Nav
	footer_info_link: 'INFO // FORMULAS & DEFINITIONS →',
	select_language: 'LANGUAGE',

	// Info page header/nav
	reference_manual: 'REFERENCE_MANUAL // FORMULAS & DEFINITIONS',
	back_to_calculator: '← BACK_TO_CALCULATOR',

	// Info page — Module 01: LBM
	info_module_01: 'MODULE_01',
	info_lbm_title: 'LBM — LEAN BODY MASS',
	info_lbm_desc:
		"Your weight minus body fat. It includes muscles, bones, organs, and water. LBM is the base for all macro targets — not total body weight — because fat tissue has minimal metabolic activity and doesn't need protein or carbs to be sustained.",
	info_lbm_boer_label: 'BOER (DEFAULT)',
	info_lbm_boer_note: 'W = weight (kg), H = height (cm)',
	info_lbm_james_note: 'Can underestimate LBM in obese individuals.',
	info_lbm_manual_desc: 'Enter your LBM directly if you have a body composition measurement (DEXA, BodPod, etc.).',

	// Info page — Module 02: BMR
	info_module_02: 'MODULE_02',
	info_bmr_title: 'BMR — BASAL METABOLIC RATE',
	info_bmr_desc:
		"Calories your body burns at complete rest — just to keep organs functioning. It's the floor of your energy needs. Everything on top of it comes from physical activity.",
	info_bmr_mifflin_note: 'W = weight (kg), H = height (cm), A = age (yrs). Best accuracy for the general population.',
	info_bmr_harris_note: 'Classic formula revised by Roza & Shizgal (1984). Slightly higher estimates than Mifflin.',
	info_bmr_katch_label: 'KATCH-MCARDLE (DEFAULT)',
	info_bmr_katch_note: 'Uses LBM instead of total weight — more accurate when body composition is known. Gender-neutral.',

	// Info page — Module 03: TDEE
	info_module_03: 'MODULE_03',
	info_tdee_title: 'TDEE — TOTAL DAILY ENERGY EXPENDITURE',
	info_tdee_desc: 'Your actual daily calorie burn. Calculated as BMR multiplied by an activity factor that accounts for exercise and lifestyle.',
	info_tdee_formula: 'TDEE = BMR × activity_multiplier',
	info_tdee_sedentary_desc: '× 1.2 — desk job, no exercise',
	info_tdee_lightly_desc: '× 1.375 — 1–3 days/week',
	info_tdee_moderately_desc: '× 1.55 — 3–5 days/week',
	info_tdee_very_desc: '× 1.725 — 6–7 days/week',
	info_tdee_extremely_desc: '× 1.9 — physical job or 2×/day',

	// Info page — Module 04: Goals
	info_module_04: 'MODULE_04',
	info_goals_title: 'GOALS — CALORIC TARGETS',
	info_goal_maintain_formula: 'Calories = TDEE',
	info_goal_maintain_desc: 'Sustain current weight. Balanced macro split to support activity and body composition.',
	info_goal_surplus_formula: 'Calories = TDEE + 300 kcal',
	info_goal_surplus_desc: 'Moderate caloric surplus to support muscle growth. Higher carbs fuel training; fat set to 25% of total calories.',
	info_goal_definition_formula: 'Calories = TDEE − 300 kcal',
	info_goal_definition_desc: 'Moderate deficit for fat loss. Protein is raised to preserve muscle mass. Carbs fill the remaining calories.',

	// Info page — Module 05: Macros
	info_module_05: 'MODULE_05',
	info_macros_title: 'MACRONUTRIENTS — DISTRIBUTION',
	info_macros_desc: 'Grams of each macro are set per kg of LBM (not total weight). Carbs always fill the remaining calories after protein and fat are accounted for.',
	info_protein_targets: 'PROTEIN TARGETS (per kg LBM)',
	info_fat_targets: 'FAT TARGETS',
	info_carbs_label: 'CARBS',
	info_carbs_formula: 'Remainder = (total_kcal − protein_kcal − fat_kcal) / 4',

	// AI prompts — InterpretResults
	ai_interpret_system_prompt: `You are a concise nutrition assistant. Your only task is to interpret a user's caloric data and explain in 2-3 sentences what it means in practice.

Strict rules:
- Maximum 3 sentences.
- Do not ask questions.
- Do not give additional advice or mention doctors or medical professionals.
- Use friendly and direct language.
- If the goal is a deficit, mention the estimated weight loss (~0.5kg/week per 500kcal deficit).
- If the goal is a surplus, mention the estimated weight gain.
- If the goal is maintenance, confirm the balance.
- Respond in English.`,

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
		`User: ${genre}, ${age} years old, ${weight}kg, ${height}cm, ${activityLevel} activity level.
Goal: ${goal}.
Maintenance calories: ${maintenanceKcal} kcal.
Target calories: ${targetKcal} kcal.
${label}: ${diff} kcal.
Proteins: ${proteins}g | Carbohydrates: ${carbs}g | Fats: ${fats}g.

Interpret these results.`,
}

export type Translations = typeof en
