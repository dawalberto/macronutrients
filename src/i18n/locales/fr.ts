import type { Translations } from './en'

export const fr = {
	// Dashboard
	weight_kg: 'POIDS_KG',
	height_cm: 'TAILLE_CM',
	age_yrs: 'ÂGE_ANS',
	male: 'HOMME',
	female: 'FEMME',

	// BMR Selector
	bmr_equation: 'ÉQUATION_BMR',
	bmr_mifflin: 'Mifflin St Jeor',
	bmr_harris: 'Revised Harris-Benedict',
	bmr_katch: 'Katch-McArdle',

	// Exercise Multiplier
	exercise_multiplier: 'MULTIPLICATEUR_EXERCICE',
	exercise_sedentary: 'Sédentaire',
	exercise_lightly: 'Légèrement actif',
	exercise_moderately: 'Modérément actif',
	exercise_very: 'Très actif',
	exercise_extremely: 'Extrêmement actif',

	// Goal Selector
	target_goal: 'OBJECTIF',
	goal_maintain: 'Maintien',
	goal_surplus: 'Surplus',
	goal_definition: 'Définition',

	// LBM Selector
	lbm_formula: 'FORMULE_MMC',
	lbm_boer: 'Boer',
	lbm_james: 'James',
	lbm_hume: 'Hume',
	lbm_manual: 'Manuel',
	lbm_placeholder: 'MMC en Kg',

	// Additional Settings
	advanced_settings: 'PARAMÈTRES_AVANCÉS',

	// Chart
	daily_caloric_quota: '◉ QUOTA_CALORIQUE_JOURNALIER',
	chart_carbs: (n: number) => `${n}G GLUCIDES`,
	chart_fats: (n: number) => `${n}G LIPIDES`,
	chart_prot: (n: number) => `${n}G PROTÉINES`,
	chart_title: (kcal: number) => `${kcal} KCAL / JOUR`,

	// AI Modal
	ai_interpretation: 'INTERPRÉTATION_IA',
	ai_interpreting: 'INTERPRÉTATION...',
	ai_streaming: 'DIFFUSION...',

	// AI Buttons (InterpretResults)
	interpret_results: 'INTERPRÉTER RÉSULTATS',
	interpreting: 'INTERPRÉTATION...',
	loading_ai: (pct: number) => `CHARGEMENT MODÈLE IA... ${pct}%`,
	ai_unavailable_mobile: 'BUREAU UNIQUEMENT',

	// Header
	page_title: 'MACRO_CALC',
	system_status: 'STATUT: OPTIMAL // MOTEUR_NUTRITION_BRUTALISTE',

	// Footer / Nav
	footer_info_link: 'INFO // FORMULES & DÉFINITIONS →',
	select_language: 'LANGUE',

	// Info page header/nav
	reference_manual: 'MANUEL_RÉFÉRENCE // FORMULES & DÉFINITIONS',
	back_to_calculator: '← RETOUR_CALCULATEUR',

	// Info page — Module 01: LBM
	info_module_01: 'MODULE_01',
	info_lbm_title: 'MMC — MASSE MAIGRE CORPORELLE',
	info_lbm_desc:
		"Votre poids moins la graisse corporelle. Elle comprend les muscles, les os, les organes et l'eau. La MMC est la base de tous les objectifs de macros — pas le poids total — car le tissu adipeux a une activité métabolique minimale et n'a pas besoin de protéines ou de glucides pour être entretenu.",
	info_lbm_boer_label: 'BOER (DÉFAUT)',
	info_lbm_boer_note: 'W = poids (kg), H = taille (cm)',
	info_lbm_james_note: 'Peut sous-estimer la MMC chez les personnes obèses.',
	info_lbm_manual_desc: 'Entrez votre MMC directement si vous avez une mesure de composition corporelle (DEXA, BodPod, etc.).',

	// Info page — Module 02: BMR
	info_module_02: 'MODULE_02',
	info_bmr_title: 'BMR — MÉTABOLISME DE BASE',
	info_bmr_desc:
		"Calories que votre corps brûle au repos complet — juste pour maintenir les organes en fonctionnement. C'est le plancher de vos besoins énergétiques. Tout ce qui dépasse provient de l'activité physique.",
	info_bmr_mifflin_note: 'W = poids (kg), H = taille (cm), A = âge (ans). Meilleure précision pour la population générale.',
	info_bmr_harris_note: 'Formule classique révisée par Roza & Shizgal (1984). Estimations légèrement supérieures à Mifflin.',
	info_bmr_katch_label: 'KATCH-MCARDLE (DÉFAUT)',
	info_bmr_katch_note: "Utilise la MMC au lieu du poids total — plus précis lorsque la composition corporelle est connue. Neutre au genre.",

	// Info page — Module 03: TDEE
	info_module_03: 'MODULE_03',
	info_tdee_title: 'TDEE — DÉPENSE ÉNERGÉTIQUE JOURNALIÈRE TOTALE',
	info_tdee_desc: "Votre brûlure calorique quotidienne réelle. Calculée comme le BMR multiplié par un facteur d'activité qui tient compte de l'exercice et du mode de vie.",
	info_tdee_formula: 'TDEE = BMR × multiplicateur_activité',
	info_tdee_sedentary_desc: '× 1.2 — travail de bureau, pas d\'exercice',
	info_tdee_lightly_desc: '× 1.375 — 1–3 jours/semaine',
	info_tdee_moderately_desc: '× 1.55 — 3–5 jours/semaine',
	info_tdee_very_desc: '× 1.725 — 6–7 jours/semaine',
	info_tdee_extremely_desc: '× 1.9 — travail physique ou 2×/jour',

	// Info page — Module 04: Goals
	info_module_04: 'MODULE_04',
	info_goals_title: 'OBJECTIFS — CIBLES CALORIQUES',
	info_goal_maintain_formula: 'Calories = TDEE',
	info_goal_maintain_desc: 'Maintenir le poids actuel. Répartition équilibrée des macros pour soutenir l\'activité et la composition corporelle.',
	info_goal_surplus_formula: 'Calories = TDEE + 300 kcal',
	info_goal_surplus_desc: 'Surplus calorique modéré pour soutenir la prise de muscle. Plus de glucides pour l\'entraînement ; lipides à 25% des calories totales.',
	info_goal_definition_formula: 'Calories = TDEE − 300 kcal',
	info_goal_definition_desc: 'Déficit modéré pour la perte de graisse. Les protéines sont augmentées pour préserver la masse musculaire. Les glucides complètent les calories restantes.',

	// Info page — Module 05: Macros
	info_module_05: 'MODULE_05',
	info_macros_title: 'MACRONUTRIMENTS — DISTRIBUTION',
	info_macros_desc:
		'Les grammes de chaque macro sont définis par kg de MMC (pas le poids total). Les glucides complètent toujours les calories restantes après avoir comptabilisé les protéines et les lipides.',
	info_protein_targets: 'OBJECTIFS PROTÉINES (par kg MMC)',
	info_fat_targets: 'OBJECTIFS LIPIDES',
	info_carbs_label: 'GLUCIDES',
	info_carbs_formula: 'Reste = (kcal_total − kcal_protéines − kcal_lipides) / 4',

	// AI prompts — InterpretResults
	ai_interpret_system_prompt: `Vous êtes un assistant nutritionnel concis. Votre seule tâche consiste à interpréter les données caloriques d'un utilisateur et à expliquer en 2 à 3 phrases leur signification pratique.

Règles strictes :
- Maximum 3 phrases.
- Ne posez pas de questions.
- Ne donnez pas de conseils supplémentaires et ne mentionnez pas de médecins ou de professionnels de santé.
- Utilisez un langage simple et direct.
- Si l'objectif est un déficit calorique, mentionnez la perte de poids estimée (environ 0,5 kg/semaine pour un déficit de 500 kcal).
- Si l'objectif est un surplus calorique, mentionnez la prise de poids estimée.
- Si l'objectif est le maintien du poids, confirmez l'équilibre.
- Répondez en français.`,

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
		`Utilisateur : ${genre}, ${age} ans, ${weight} kg, ${height} cm, ${activityLevel} niveau d'activité.
Objectif : ${goal}.
Apport calorique de maintien : ${maintenanceKcal} kcal.
Apport calorique cible : ${targetKcal} kcal.
${label} : ${diff} kcal.
Protéines : ${proteins} g | Glucides : ${carbs} g | Lipides : ${fats} g.
Interprétez ces résultats.`,

	// SEO — Home
	seo_home_title: 'MacroCalc — Calculateur de Macronutriments Gratuit',
	seo_home_description:
		'Calculez vos objectifs quotidiens en protéines, glucides et lipides selon votre poids, taille, âge, activité et objectif. Utilise les formules BMR et masse maigre.',
	seo_home_keywords:
		'calculateur macronutriments, calculateur macro, calculateur protéines, calculateur TDEE, calculateur BMR, masse maigre, calories perte de poids, macros pour muscle',
	seo_og_tagline: 'Objectifs macro précis. Gratuit. Sans inscription.',

	// SEO — Info
	seo_info_title: 'Formules et Définitions — Référence MacroCalc',
	seo_info_description:
		'LBM, BMR, TDEE et formules de macronutriments expliqués. Boer, James, Hume, Mifflin-St Jeor, Harris-Benedict, Katch-McArdle.',

	// SEO — FAQ
	seo_faq_lbm_q: "Qu'est-ce que la Masse Maigre (LBM) et pourquoi est-elle importante ?",
	seo_faq_lbm_a:
		"La Masse Maigre est votre poids total moins la graisse corporelle — muscles, os, organes et eau. MacroCalc l'utilise comme base car le tissu adipeux n'a pas besoin de protéines ou glucides pour se maintenir, offrant des objectifs plus précis.",
	seo_faq_bmr_q: "Qu'est-ce que le Métabolisme de Base (BMR) ?",
	seo_faq_bmr_a:
		'Le BMR est le nombre de calories brûlées au repos complet. MacroCalc supporte trois équations : Mifflin-St Jeor, Harris-Benedict Révisé et Katch-McArdle (plus précis quand la composition corporelle est connue).',
	seo_faq_tdee_q: "Comment est calculée la Dépense Énergétique Totale Journalière (TDEE) ?",
	seo_faq_tdee_a:
		'TDEE = BMR × multiplicateur d\'activité. Sédentaire (×1.2), Légèrement actif (×1.375), Modérément actif (×1.55), Très actif (×1.725), Extrêmement actif (×1.9).',
	seo_faq_macros_q: 'Comment MacroCalc distribue-t-il protéines, glucides et lipides ?',
	seo_faq_macros_a:
		'Protéines et lipides sont fixés en g/kg de LBM selon l\'objectif. Les glucides complètent les calories restantes. Maintien : 1.8 g protéine/kg, 1.0 g lipides/kg. Surplus : 2.0 g protéine, lipides à 25%. Définition : 2.5 g protéine, 0.9 g lipides/kg.',
	seo_faq_goals_q: 'Quels sont les ajustements caloriques pour chaque objectif ?',
	seo_faq_goals_a:
		'Maintien : calories = TDEE. Surplus : TDEE +300 kcal pour la prise de muscle. Définition : TDEE −300 kcal pour une perte de graisse modérée (environ 0.5 kg/semaine par 500 kcal de déficit).',
} satisfies Translations
