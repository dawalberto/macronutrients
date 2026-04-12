import type { Translations } from './en'

export const zh = {
	// Dashboard
	weight_kg: '体重_KG',
	height_cm: '身高_CM',
	age_yrs: '年龄_岁',
	male: '男性',
	female: '女性',

	// BMR Selector
	bmr_equation: 'BMR_公式',
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
	lbm_formula: 'LBM_公式',
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
	ai_interpretation: 'AI_解读',
	ai_interpreting: '解读中...',
	ai_streaming: '流式输出...',

	// AI Buttons (InterpretResults)
	interpret_results: '解读结果',
	interpreting: '解读中...',
	loading_ai: (pct: number) => `加载AI模型... ${pct}%`,

	// Header
	page_title: 'MACRO_CALC V1.0',
	system_status: '系统状态: 最佳 // 营养计算引擎',

	// Footer / Nav
	footer_info_link: '信息 // 公式与定义 →',
	select_language: '语言',

	// Info page header/nav
	reference_manual: '参考手册 // 公式与定义',
	back_to_calculator: '← 返回计算器',

	// Info page — Module 01: LBM
	info_module_01: '模块_01',
	info_lbm_title: 'LBM — 去脂体重',
	info_lbm_desc: '您的体重减去体脂。包括肌肉、骨骼、器官和水分。LBM是所有宏量营养素目标的基础——而非总体重——因为脂肪组织的代谢活性极低，不需要蛋白质或碳水化合物来维持。',
	info_lbm_boer_label: 'BOER（默认）',
	info_lbm_boer_note: 'W = 体重（kg），H = 身高（cm）',
	info_lbm_james_note: '对肥胖者可能低估LBM。',
	info_lbm_manual_desc: '如果您有体成分测量数据（DEXA、BodPod等），可直接输入LBM值。',

	// Info page — Module 02: BMR
	info_module_02: '模块_02',
	info_bmr_title: 'BMR — 基础代谢率',
	info_bmr_desc: '身体在完全静息状态下消耗的热量——仅用于维持器官运作。这是您能量需求的最低值，超出部分来自体力活动。',
	info_bmr_mifflin_note: 'W = 体重（kg），H = 身高（cm），A = 年龄（岁）。对普通人群精度最高。',
	info_bmr_harris_note: 'Roza & Shizgal（1984）修订的经典公式。估值略高于Mifflin公式。',
	info_bmr_katch_label: 'KATCH-MCARDLE（默认）',
	info_bmr_katch_note: '使用去脂体重代替总体重——在已知体成分时更准确。性别中性。',

	// Info page — Module 03: TDEE
	info_module_03: '模块_03',
	info_tdee_title: 'TDEE — 每日总能量消耗',
	info_tdee_desc: '您实际的每日热量消耗。由BMR乘以考虑运动和生活方式的活动系数计算得出。',
	info_tdee_formula: 'TDEE = BMR × 活动系数',
	info_tdee_sedentary_desc: '× 1.2 — 久坐工作，不运动',
	info_tdee_lightly_desc: '× 1.375 — 每周1–3天',
	info_tdee_moderately_desc: '× 1.55 — 每周3–5天',
	info_tdee_very_desc: '× 1.725 — 每周6–7天',
	info_tdee_extremely_desc: '× 1.9 — 体力劳动或每天2次训练',

	// Info page — Module 04: Goals
	info_module_04: '模块_04',
	info_goals_title: '目标 — 热量指标',
	info_goal_maintain_formula: '热量 = TDEE',
	info_goal_maintain_desc: '维持当前体重。均衡的宏量营养素分配以支持活动和体成分。',
	info_goal_surplus_formula: '热量 = TDEE + 300 千卡',
	info_goal_surplus_desc: '适度热量盈余以支持肌肉增长。更多碳水为训练提供能量；脂肪占总热量的25%。',
	info_goal_definition_formula: '热量 = TDEE − 300 千卡',
	info_goal_definition_desc: '适度热量赤字以减脂。提高蛋白质以保护肌肉量。碳水填充剩余热量。',

	// Info page — Module 05: Macros
	info_module_05: '模块_05',
	info_macros_title: '宏量营养素 — 分配',
	info_macros_desc: '每种宏量营养素的克数按LBM的每公斤计算（非总体重）。蛋白质和脂肪计算完成后，碳水始终填充剩余热量。',
	info_protein_targets: '蛋白质目标（每公斤LBM）',
	info_fat_targets: '脂肪目标',
	info_carbs_label: '碳水化合物',
	info_carbs_formula: '剩余 = (总热量 − 蛋白质热量 − 脂肪热量) / 4',

	// AI prompts — InterpretResults
	ai_interpret_system_prompt: `您是一位简洁明了的营养助手。您的任务是解读用户的卡路里数据，并用2-3句话解释其实际意义。

严格规则：
- 最多3句话。
- 不要提问。
- 不要提供额外建议或提及医生或其他医疗专业人士。
- 使用友好简洁的语言。
- 如果目标是热量缺口，请说明预计减重幅度（每减少500千卡热量，每周减重约0.5公斤）。
- 如果目标是热量盈余，请说明预计增重幅度。
- 如果目标是维持体重，请确认热量摄入是否平衡。
- 请用普通话（简体中文）回复。`,

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
		`用户：${genre}，${age} 岁，${weight} 公斤，${height} 厘米，${activityLevel} 活动水平。

目标：${goal}。
维持热量：${maintenanceKcal} 千卡。
目标热量：${targetKcal} 千卡。
${label}：${diff} 千卡。
蛋白质：${proteins} 克 | 碳水化合物：${carbs} 克 | 脂肪：${fats} 克。
解读这些结果。`,
} satisfies Translations
