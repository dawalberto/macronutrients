export const en = {
	// Dashboard
	weight_kg: 'WEIGHT KG',
	height_cm: 'HEIGHT CM',
	age_yrs: 'AGE YRS',
	male: 'MALE',
	female: 'FEMALE',

	// BMR Selector
	bmr_equation: 'BMR EQUATION',
	bmr_mifflin: 'Mifflin St Jeor',
	bmr_harris: 'Revised Harris-Benedict',
	bmr_katch: 'Katch-McArdle',

	// Exercise Multiplier
	exercise_multiplier: 'EXERCISE MULTIPLIER',
	exercise_sedentary: 'Sedentary',
	exercise_lightly: 'Lightly active',
	exercise_moderately: 'Moderately active',
	exercise_very: 'Very active',
	exercise_extremely: 'Extremely active',

	// Goal Selector
	target_goal: 'TARGET GOAL',
	goal_maintain: 'Maintain',
	goal_surplus: 'Surplus',
	goal_definition: 'Definition',

	// LBM Selector
	lbm_formula: 'LBM FORMULA',
	lbm_boer: 'Boer',
	lbm_james: 'James',
	lbm_hume: 'Hume',
	lbm_manual: 'Manual',
	lbm_placeholder: 'LBM in Kg',

	// Additional Settings
	advanced_settings: 'ADVANCED SETTINGS',

	// Chart
	daily_caloric_quota: '◉ DAILY CALORIC QUOTA',
	chart_carbs: (n: number) => `${n}G CARBS`,
	chart_fats: (n: number) => `${n}G FATS`,
	chart_prot: (n: number) => `${n}G PROT`,
	chart_title: (kcal: number) => `${kcal} KCAL / DAY`,

	// AI Modal
	ai_streaming: 'STREAMING...',
	translating_tips: 'TRANSLATING...',
	ai_tips_title: 'AI TIPS',
	ai_disclaimer: 'AI-generated results may not always be accurate.',

	// AI Buttons (GenerateTipsAI)
	generate_tips: 'TIPS',
	generating_tips: 'GENERATING TIPS...',
	loading_ai: (pct: number) => `LOADING AI MODEL... ${pct}%`,

	// Header
	page_title: 'MacroCalc',
	system_status: 'SYSTEM STATUS: OPTIMAL // BRUTALIST NUTRITION ENGINE',

	// Footer / Nav
	footer_info_link: 'INFO // FORMULAS & DEFINITIONS →',
	select_language: 'LANGUAGE',
	footer_metric_system: 'Metric System',
	footer_built_with: 'Built with',
	footer_built_by: 'by',

	// Info page header/nav
	reference_manual: 'REFERENCE MANUAL // FORMULAS & DEFINITIONS',
	back_to_calculator: '← BACK TO CALCULATOR',

	// Info page — Module 01: LBM
	info_module_01: 'MODULE 01',
	info_lbm_title: 'LBM — LEAN BODY MASS',
	info_lbm_desc:
		"Your weight minus body fat. It includes muscles, bones, organs, and water. LBM is the base for all macro targets — not total body weight — because fat tissue has minimal metabolic activity and doesn't need protein or carbs to be sustained.",
	info_lbm_boer_label: 'BOER (DEFAULT)',
	info_lbm_boer_note: 'W = weight (kg), H = height (cm)',
	info_lbm_james_note: 'Can underestimate LBM in obese individuals.',
	info_lbm_manual_desc: 'Enter your LBM directly if you have a body composition measurement (DEXA, BodPod, etc.).',

	// Info page — Module 02: BMR
	info_module_02: 'MODULE 02',
	info_bmr_title: 'BMR — BASAL METABOLIC RATE',
	info_bmr_desc:
		"Calories your body burns at complete rest — just to keep organs functioning. It's the floor of your energy needs. Everything on top of it comes from physical activity.",
	info_bmr_mifflin_note: 'W = weight (kg), H = height (cm), A = age (yrs). Best accuracy for the general population.',
	info_bmr_harris_note: 'Classic formula revised by Roza & Shizgal (1984). Slightly higher estimates than Mifflin.',
	info_bmr_katch_label: 'KATCH-MCARDLE (DEFAULT)',
	info_bmr_katch_note: 'Uses LBM instead of total weight — more accurate when body composition is known. Gender-neutral.',

	// Info page — Module 03: TDEE
	info_module_03: 'MODULE 03',
	info_tdee_title: 'TDEE — TOTAL DAILY ENERGY EXPENDITURE',
	info_tdee_desc: 'Your actual daily calorie burn. Calculated as BMR multiplied by an activity factor that accounts for exercise and lifestyle.',
	info_tdee_formula: 'TDEE = BMR × activity_multiplier',
	info_tdee_sedentary_desc: '× 1.2 — desk job, no exercise',
	info_tdee_lightly_desc: '× 1.375 — 1–3 days/week',
	info_tdee_moderately_desc: '× 1.55 — 3–5 days/week',
	info_tdee_very_desc: '× 1.725 — 6–7 days/week',
	info_tdee_extremely_desc: '× 1.9 — physical job or 2×/day',

	// Info page — Module 04: Goals
	info_module_04: 'MODULE 04',
	info_goals_title: 'GOALS — CALORIC TARGETS',
	info_goal_maintain_formula: 'Calories = TDEE',
	info_goal_maintain_desc: 'Sustain current weight. Balanced macro split to support activity and body composition.',
	info_goal_surplus_formula: 'Calories = TDEE + 300 kcal',
	info_goal_surplus_desc: 'Moderate caloric surplus to support muscle growth. Higher carbs fuel training; fat set to 25% of total calories.',
	info_goal_definition_formula: 'Calories = TDEE − 300 kcal',
	info_goal_definition_desc: 'Moderate deficit for fat loss. Protein is raised to preserve muscle mass. Carbs fill the remaining calories.',

	// Info page — Module 05: Macros
	info_module_05: 'MODULE 05',
	info_macros_title: 'MACRONUTRIENTS — DISTRIBUTION',
	info_macros_desc:
		'Grams of each macro are set per kg of LBM (not total weight). Carbs always fill the remaining calories after protein and fat are accounted for.',
	info_protein_targets: 'PROTEIN TARGETS (per kg LBM)',
	info_fat_targets: 'FAT TARGETS',
	info_carbs_label: 'CARBS',
	info_carbs_formula: 'Remainder = (total_kcal − protein_kcal − fat_kcal) / 4',

	// Info page — FAQ & macro names
	info_faq_title: 'FREQUENTLY ASKED QUESTIONS',
	info_macro_protein: 'PROTEIN',
	info_macro_carbohydrates: 'CARBOHYDRATES',
	info_macro_fat: 'FAT',

	// SEO — Home
	seo_home_title: 'MacroCalc — Free Macronutrient Calculator',
	seo_home_description:
		'Calculate your daily protein, carbs, and fat targets based on your weight, height, age, activity level, and goal. Uses Katch-McArdle BMR and Lean Body Mass formulas.',
	seo_home_keywords:
		'macronutrient calculator, macro calculator, protein calculator, TDEE calculator, BMR calculator, lean body mass, weight loss calories, muscle gain macros, keto macros',
	seo_og_tagline: 'Precision macro targets. Free. No sign-up.',

	// SEO — Info
	seo_info_title: 'Formulas & Definitions — MacroCalc Reference',
	seo_info_description:
		'LBM (Lean Body Mass), BMR (Basal Metabolic Rate), TDEE, and macronutrient formulas explained. Boer, James, Hume, Mifflin-St Jeor, Harris-Benedict, Katch-McArdle.',

	// SEO — FAQ (feeds JSON-LD FAQPage + on-page section)
	seo_faq_lbm_q: 'What is Lean Body Mass (LBM) and why does it matter for macros?',
	seo_faq_lbm_a:
		'Lean Body Mass is your total weight minus body fat — it includes muscle, bone, organs, and water. MacroCalc uses LBM as the base for all macro targets because fat tissue has minimal metabolic activity and does not need protein or carbs to be sustained. This gives more accurate targets than using total body weight.',
	seo_faq_bmr_q: 'What is Basal Metabolic Rate (BMR)?',
	seo_faq_bmr_a:
		'BMR is the number of calories your body burns at complete rest — the minimum energy needed to keep organs functioning. MacroCalc supports three equations: Mifflin-St Jeor (best for general population), Revised Harris-Benedict, and Katch-McArdle (most accurate when body composition is known, uses LBM).',
	seo_faq_tdee_q: 'How is Total Daily Energy Expenditure (TDEE) calculated?',
	seo_faq_tdee_a:
		'TDEE = BMR × an activity multiplier. Sedentary (×1.2), Lightly active (×1.375), Moderately active (×1.55), Very active (×1.725), Extremely active (×1.9). This gives your actual daily calorie burn including exercise and lifestyle activity.',
	seo_faq_macros_q: 'How does MacroCalc distribute protein, carbs, and fat?',
	seo_faq_macros_a:
		'Protein and fat are set in grams per kg of LBM based on your goal. Carbs fill the remaining calories. Maintenance: 1.8 g protein/kg LBM, 1.0 g fat/kg LBM. Surplus: 2.0 g protein, fat at 25% of total calories. Definition: 2.5 g protein, 0.9 g fat/kg LBM.',
	seo_faq_goals_q: 'What are the calorie adjustments for each goal?',
	seo_faq_goals_a:
		'Maintain keeps calories at TDEE for weight stability. Surplus adds +300 kcal to TDEE to support muscle growth. Definition subtracts −300 kcal from TDEE for moderate fat loss (estimated ~0.5 kg/week per 500 kcal deficit).',
}

export type Translations = typeof en
