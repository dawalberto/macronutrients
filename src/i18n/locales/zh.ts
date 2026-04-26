import type { Translations } from './en'

export const zh = {
	// Dashboard
	weight_kg: '体重 KG',
	height_cm: '身高 CM',
	age_yrs: '年龄 岁',
	male: '男性',
	female: '女性',

	// BMR Selector
	bmr_equation: 'BMR 公式',
	bmr_mifflin: 'Mifflin St Jeor',
	bmr_harris: 'Revised Harris-Benedict',
	bmr_katch: 'Katch-McArdle',

	// Exercise Multiplier
	exercise_multiplier: '运动系数',
	exercise_sedentary: '久坐不动',
	exercise_lightly: '轻度活动',
	exercise_moderately: '适度活动',
	exercise_very: '高度活动',
	exercise_extremely: '极度活动',

	// Goal Selector
	target_goal: '目标',
	goal_maintain: '维持',
	goal_surplus: '增肌',
	goal_definition: '减脂',

	// LBM Selector
	lbm_formula: 'LBM 公式',
	lbm_boer: 'Boer',
	lbm_james: 'James',
	lbm_hume: 'Hume',
	lbm_manual: '手动输入',
	lbm_placeholder: 'LBM（千克）',

	// Additional Settings
	advanced_settings: '高级设置',

	// Chart
	daily_caloric_quota: '◉ 每日热量配额',
	chart_carbs: (n: number) => `${n}克 碳水`,
	chart_fats: (n: number) => `${n}克 脂肪`,
	chart_prot: (n: number) => `${n}克 蛋白质`,
	chart_title: (kcal: number) => `${kcal} 千卡 / 天`,

	// AI Modal
	ai_streaming: '流式输出...',
	translating_tips: '翻译中...',
	ai_tips_title: 'AI 建议',

	// AI Buttons (GenerateTipsAI)
	generate_tips: '生成建议',
	generating_tips: '正在生成建议...',
	loading_ai: (pct: number) => `加载AI模型... ${pct}%`,

	// Header
	page_title: 'MacroCalc',
	system_status: '系统状态: 最佳 // 营养计算引擎',

	// Footer / Nav
	footer_info_link: '信息 // 公式与定义 →',
	select_language: '语言',
	footer_metric_system: '公制单位',
	footer_built_with: '构建',
	footer_built_by: '由',

	// Info page header/nav
	reference_manual: '参考手册 // 公式与定义',
	back_to_calculator: '← 返回计算器',

	// Info page — Module 01: LBM
	info_module_01: '模块 01',
	info_lbm_title: 'LBM — 去脂体重',
	info_lbm_desc:
		'您的体重减去体脂。包括肌肉、骨骼、器官和水分。LBM是所有宏量营养素目标的基础——而非总体重——因为脂肪组织的代谢活性极低，不需要蛋白质或碳水化合物来维持。',
	info_lbm_boer_label: 'BOER（默认）',
	info_lbm_boer_note: 'W = 体重（kg），H = 身高（cm）',
	info_lbm_james_note: '对肥胖者可能低估LBM。',
	info_lbm_manual_desc: '如果您有体成分测量数据（DEXA、BodPod等），可直接输入LBM值。',

	// Info page — Module 02: BMR
	info_module_02: '模块 02',
	info_bmr_title: 'BMR — 基础代谢率',
	info_bmr_desc: '身体在完全静息状态下消耗的热量——仅用于维持器官运作。这是您能量需求的最低值，超出部分来自体力活动。',
	info_bmr_mifflin_note: 'W = 体重（kg），H = 身高（cm），A = 年龄（岁）。对普通人群精度最高。',
	info_bmr_harris_note: 'Roza & Shizgal（1984）修订的经典公式。估值略高于Mifflin公式。',
	info_bmr_katch_label: 'KATCH-MCARDLE（默认）',
	info_bmr_katch_note: '使用去脂体重代替总体重——在已知体成分时更准确。性别中性。',

	// Info page — Module 03: TDEE
	info_module_03: '模块 03',
	info_tdee_title: 'TDEE — 每日总能量消耗',
	info_tdee_desc: '您实际的每日热量消耗。由BMR乘以考虑运动和生活方式的活动系数计算得出。',
	info_tdee_formula: 'TDEE = BMR × 活动系数',
	info_tdee_sedentary_desc: '× 1.2 — 久坐工作，不运动',
	info_tdee_lightly_desc: '× 1.375 — 每周1–3天',
	info_tdee_moderately_desc: '× 1.55 — 每周3–5天',
	info_tdee_very_desc: '× 1.725 — 每周6–7天',
	info_tdee_extremely_desc: '× 1.9 — 体力劳动或每天2次训练',

	// Info page — Module 04: Goals
	info_module_04: '模块 04',
	info_goals_title: '目标 — 热量指标',
	info_goal_maintain_formula: '热量 = TDEE',
	info_goal_maintain_desc: '维持当前体重。均衡的宏量营养素分配以支持活动和体成分。',
	info_goal_surplus_formula: '热量 = TDEE + 300 千卡',
	info_goal_surplus_desc: '适度热量盈余以支持肌肉增长。更多碳水为训练提供能量；脂肪占总热量的25%。',
	info_goal_definition_formula: '热量 = TDEE − 300 千卡',
	info_goal_definition_desc: '适度热量赤字以减脂。提高蛋白质以保护肌肉量。碳水填充剩余热量。',

	// Info page — Module 05: Macros
	info_module_05: '模块 05',
	info_macros_title: '宏量营养素 — 分配',
	info_macros_desc: '每种宏量营养素的克数按LBM的每公斤计算（非总体重）。蛋白质和脂肪计算完成后，碳水始终填充剩余热量。',
	info_protein_targets: '蛋白质目标（每公斤LBM）',
	info_fat_targets: '脂肪目标',
	info_carbs_label: '碳水化合物',
	info_carbs_formula: '剩余 = (总热量 − 蛋白质热量 − 脂肪热量) / 4',

	// Info page — FAQ & macro names
	info_faq_title: '常见问题',
	info_macro_protein: '蛋白质',
	info_macro_carbohydrates: '碳水化合物',
	info_macro_fat: '脂肪',

	// SEO — Home
	seo_home_title: 'MacroCalc — 免费宏量营养素计算器',
	seo_home_description:
		'根据您的体重、身高、年龄、活动水平和目标，计算每日蛋白质、碳水化合物和脂肪摄入目标。使用Katch-McArdle基础代谢率和去脂体重公式。',
	seo_home_keywords: '宏量营养素计算器, 宏计算器, 蛋白质计算器, TDEE计算器, 基础代谢率计算器, 去脂体重, 减肥卡路里, 增肌宏量',
	seo_og_tagline: '精准宏量目标。免费。无需注册。',

	// SEO — Info
	seo_info_title: '公式与定义 — MacroCalc参考手册',
	seo_info_description:
		'LBM（去脂体重）、BMR（基础代谢率）、TDEE及宏量营养素公式详解。Boer、James、Hume、Mifflin-St Jeor、Harris-Benedict、Katch-McArdle。',

	// SEO — FAQ
	seo_faq_lbm_q: '什么是去脂体重（LBM），为什么它对宏量计算很重要？',
	seo_faq_lbm_a:
		'去脂体重是您的总体重减去体脂——包括肌肉、骨骼、器官和水分。MacroCalc以LBM为基础计算所有宏量目标，因为脂肪组织几乎不需要蛋白质或碳水化合物来维持，从而提供更精准的目标。',
	seo_faq_bmr_q: '什么是基础代谢率（BMR）？',
	seo_faq_bmr_a:
		'BMR是身体在完全静息状态下消耗的卡路里数量。MacroCalc支持三种公式：Mifflin-St Jeor（适合普通人群）、修订版Harris-Benedict，以及Katch-McArdle（已知体成分时最精准，使用LBM）。',
	seo_faq_tdee_q: '每日总能量消耗（TDEE）如何计算？',
	seo_faq_tdee_a: 'TDEE = BMR × 活动系数。久坐（×1.2）、轻度活动（×1.375）、中度活动（×1.55）、高度活动（×1.725）、极度活动（×1.9）。',
	seo_faq_macros_q: 'MacroCalc如何分配蛋白质、碳水化合物和脂肪？',
	seo_faq_macros_a:
		'蛋白质和脂肪按每公斤LBM的克数设定。碳水化合物填补剩余卡路里。维持：1.8g蛋白质/kg LBM，1.0g脂肪/kg。增肌：2.0g蛋白质，脂肪占总热量25%。减脂：2.5g蛋白质，0.9g脂肪/kg。',
	seo_faq_goals_q: '每个目标的卡路里调整是多少？',
	seo_faq_goals_a: '维持：卡路里 = TDEE。增肌：TDEE +300千卡支持肌肉生长。减脂：TDEE −300千卡实现适度脂肪减少（每500千卡热量差约减重0.5公斤/周）。',
} satisfies Translations
