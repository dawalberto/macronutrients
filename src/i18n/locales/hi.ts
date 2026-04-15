import type { Translations } from './en'

export const hi = {
	// Dashboard
	weight_kg: 'वज़न_KG',
	height_cm: 'ऊंचाई_CM',
	age_yrs: 'उम्र_वर्ष',
	male: 'पुरुष',
	female: 'महिला',

	// BMR Selector
	bmr_equation: 'BMR_सूत्र',
	bmr_mifflin: 'Mifflin St Jeor',
	bmr_harris: 'Revised Harris-Benedict',
	bmr_katch: 'Katch-McArdle',

	// Exercise Multiplier
	exercise_multiplier: 'व्यायाम_गुणक',
	exercise_sedentary: 'निष्क्रिय',
	exercise_lightly: 'हल्का सक्रिय',
	exercise_moderately: 'मध्यम सक्रिय',
	exercise_very: 'बहुत सक्रिय',
	exercise_extremely: 'अत्यधिक सक्रिय',

	// Goal Selector
	target_goal: 'लक्ष्य',
	goal_maintain: 'बनाए रखें',
	goal_surplus: 'अधिशेष',
	goal_definition: 'परिभाषा',

	// LBM Selector
	lbm_formula: 'LBM_सूत्र',
	lbm_boer: 'Boer',
	lbm_james: 'James',
	lbm_hume: 'Hume',
	lbm_manual: 'मैन्युअल',
	lbm_placeholder: 'LBM किलोग्राम में',

	// Additional Settings
	advanced_settings: 'उन्नत_सेटिंग',

	// Chart
	daily_caloric_quota: '◉ दैनिक_कैलोरी_कोटा',
	chart_carbs: (n: number) => `${n}ग्रा कार्ब्स`,
	chart_fats: (n: number) => `${n}ग्रा वसा`,
	chart_prot: (n: number) => `${n}ग्रा प्रोटीन`,
	chart_title: (kcal: number) => `${kcal} कैलोरी / दिन`,

	// AI Modal
	ai_interpretation: 'AI_व्याख्या',
	ai_interpreting: 'व्याख्या हो रही है...',
	ai_streaming: 'स्ट्रीमिंग...',

	// AI Buttons (InterpretResults)
	interpret_results: 'परिणाम व्याख्या करें',
	interpreting: 'व्याख्या हो रही है...',
	loading_ai: (pct: number) => `AI मॉडल लोड हो रहा है... ${pct}%`,

	// Header
	page_title: 'MACRO_CALC V1.0',
	system_status: 'सिस्टम_स्थिति: सर्वोत्तम // पोषण_इंजन',

	// Footer / Nav
	footer_info_link: 'जानकारी // सूत्र और परिभाषाएं →',
	select_language: 'भाषा',

	// Info page header/nav
	reference_manual: 'संदर्भ_मैनुअल // सूत्र और परिभाषाएं',
	back_to_calculator: '← कैलकुलेटर पर वापस',

	// Info page — Module 01: LBM
	info_module_01: 'मॉड्यूल_01',
	info_lbm_title: 'LBM — दुबला शरीर द्रव्यमान',
	info_lbm_desc:
		'आपका वज़न शरीर की चर्बी घटाकर। इसमें मांसपेशियां, हड्डियां, अंग और पानी शामिल हैं। LBM सभी मैक्रो लक्ष्यों का आधार है — कुल शरीर वज़न का नहीं — क्योंकि वसा ऊतक की चयापचय गतिविधि न्यूनतम होती है।',
	info_lbm_boer_label: 'BOER (डिफ़ॉल्ट)',
	info_lbm_boer_note: 'W = वज़न (kg), H = ऊंचाई (cm)',
	info_lbm_james_note: 'मोटे व्यक्तियों में LBM को कम आंक सकता है।',
	info_lbm_manual_desc: 'यदि आपके पास शरीर संरचना माप (DEXA, BodPod, आदि) है तो सीधे LBM दर्ज करें।',

	// Info page — Module 02: BMR
	info_module_02: 'मॉड्यूल_02',
	info_bmr_title: 'BMR — बेसल मेटाबोलिक रेट',
	info_bmr_desc: 'आपका शरीर पूर्ण आराम की स्थिति में जितनी कैलोरी जलाता है — केवल अंगों को चालू रखने के लिए। यह आपकी ऊर्जा जरूरतों का न्यूनतम स्तर है।',
	info_bmr_mifflin_note: 'W = वज़न (kg), H = ऊंचाई (cm), A = उम्र (वर्ष)। सामान्य जनसंख्या के लिए सर्वोत्तम सटीकता।',
	info_bmr_harris_note: 'Roza & Shizgal (1984) द्वारा संशोधित क्लासिक सूत्र। Mifflin से थोड़े अधिक अनुमान।',
	info_bmr_katch_label: 'KATCH-MCARDLE (डिफ़ॉल्ट)',
	info_bmr_katch_note: 'कुल वज़न के बजाय LBM का उपयोग करता है — जब शरीर संरचना ज्ञात हो तो अधिक सटीक। लिंग-तटस्थ।',

	// Info page — Module 03: TDEE
	info_module_03: 'मॉड्यूल_03',
	info_tdee_title: 'TDEE — कुल दैनिक ऊर्जा व्यय',
	info_tdee_desc: 'आपकी वास्तविक दैनिक कैलोरी खपत। BMR को एक गतिविधि कारक से गुणा करके गणना की जाती है।',
	info_tdee_formula: 'TDEE = BMR × गतिविधि_गुणक',
	info_tdee_sedentary_desc: '× 1.2 — डेस्क जॉब, कोई व्यायाम नहीं',
	info_tdee_lightly_desc: '× 1.375 — सप्ताह में 1–3 दिन',
	info_tdee_moderately_desc: '× 1.55 — सप्ताह में 3–5 दिन',
	info_tdee_very_desc: '× 1.725 — सप्ताह में 6–7 दिन',
	info_tdee_extremely_desc: '× 1.9 — शारीरिक काम या दिन में 2 बार',

	// Info page — Module 04: Goals
	info_module_04: 'मॉड्यूल_04',
	info_goals_title: 'लक्ष्य — कैलोरी लक्ष्य',
	info_goal_maintain_formula: 'कैलोरी = TDEE',
	info_goal_maintain_desc: 'वर्तमान वज़न बनाए रखें। गतिविधि और शरीर संरचना का समर्थन करने के लिए संतुलित मैक्रो वितरण।',
	info_goal_surplus_formula: 'कैलोरी = TDEE + 300 kcal',
	info_goal_surplus_desc: 'मांसपेशी वृद्धि के लिए मध्यम कैलोरी अधिशेष। प्रशिक्षण के लिए अधिक कार्ब्स; वसा कुल कैलोरी का 25%।',
	info_goal_definition_formula: 'कैलोरी = TDEE − 300 kcal',
	info_goal_definition_desc: 'वसा हानि के लिए मध्यम कमी। मांसपेशियों की रक्षा के लिए प्रोटीन बढ़ाया जाता है। कार्ब्स शेष कैलोरी भरते हैं।',

	// Info page — Module 05: Macros
	info_module_05: 'मॉड्यूल_05',
	info_macros_title: 'मैक्रोन्यूट्रिएंट्स — वितरण',
	info_macros_desc: 'प्रत्येक मैक्रो के ग्राम LBM के प्रति किलोग्राम (कुल वज़न नहीं) के आधार पर निर्धारित होते हैं। प्रोटीन और वसा के बाद कार्ब्स हमेशा शेष कैलोरी भरते हैं।',
	info_protein_targets: 'प्रोटीन लक्ष्य (प्रति किलो LBM)',
	info_fat_targets: 'वसा लक्ष्य',
	info_carbs_label: 'कार्ब्स',
	info_carbs_formula: 'शेष = (कुल_kcal − प्रोटीन_kcal − वसा_kcal) / 4',

	// AI prompts — InterpretResults
	ai_interpret_system_prompt: `आप एक छोटे न्यूट्रिशन असिस्टेंट हैं। आपका काम सिर्फ़ यूज़र के कैलोरी डेटा को समझना और 2-3 वाक्यों में यह समझाना है कि असल में इसका क्या मतलब है।

सख्त नियम:
- ज़्यादा से ज़्यादा 3 वाक्य।
- सवाल न पूछें।
- ज़्यादा सलाह न दें या डॉक्टर या मेडिकल प्रोफ़ेशनल का ज़िक्र न करें।
- दोस्ताना और सीधी भाषा का इस्तेमाल करें।
- अगर लक्ष्य कमी है, तो अनुमानित वज़न घटाने (~0.5kg/हफ़्ता प्रति 500kcal कमी) के बारे में बताएं।
- अगर लक्ष्य ज़्यादा है, तो अनुमानित वज़न बढ़ने के बारे में बताएं।
- अगर लक्ष्य मेंटेनेंस है, तो बैलेंस कन्फ़र्म करें।
- हिंदी में जवाब दें।`,

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
		`यूज़र: ${genre}, ${age} साल, ${weight}kg, ${height}cm, ${activityLevel} एक्टिविटी लेवल.
गोल: ${goal}.
मेंटेनेंस कैलोरी: ${maintenanceKcal} kcal.
टारगेट कैलोरी: ${targetKcal} kcal.
${label}: ${diff} kcal.
प्रोटीन: ${proteins}g | कार्बोहाइड्रेट: ${carbs}g | फैट: ${fats}g.

इन नतीजों को समझें।`,

	// SEO — Home
	seo_home_title: 'MacroCalc — मुफ़्त मैक्रोन्यूट्रिएंट कैलकुलेटर',
	seo_home_description: 'अपने वज़न, ऊंचाई, उम्र, एक्टिविटी लेवल और लक्ष्य के आधार पर दैनिक प्रोटीन, कार्ब्स और फैट की ज़रूरत कैलकुलेट करें। Katch-McArdle BMR और LBM फ़ॉर्मूले का उपयोग करता है।',
	seo_home_keywords: 'मैक्रोन्यूट्रिएंट कैलकुलेटर, मैक्रो कैलकुलेटर, प्रोटीन कैलकुलेटर, TDEE कैलकुलेटर, BMR कैलकुलेटर, लीन बॉडी मास, वज़न घटाने की कैलोरी, मसल गेन मैक्रो',
	seo_og_tagline: 'सटीक मैक्रो लक्ष्य। मुफ़्त। बिना साइन-अप के।',

	// SEO — Info
	seo_info_title: 'फ़ॉर्मूले और परिभाषाएं — MacroCalc रेफरेंस',
	seo_info_description: 'LBM, BMR, TDEE और मैक्रोन्यूट्रिएंट फ़ॉर्मूले समझाए गए। Boer, James, Hume, Mifflin-St Jeor, Harris-Benedict, Katch-McArdle।',

	// SEO — FAQ
	seo_faq_lbm_q: 'लीन बॉडी मास (LBM) क्या है और यह मैक्रो के लिए क्यों ज़रूरी है?',
	seo_faq_lbm_a: 'लीन बॉडी मास आपका कुल वज़न घटाकर बॉडी फैट है — इसमें मांसपेशियां, हड्डियां, अंग और पानी शामिल हैं। MacroCalc इसे आधार बनाता है क्योंकि फैट टिशू को प्रोटीन या कार्ब्स की ज़रूरत नहीं होती, जिससे ज़्यादा सटीक लक्ष्य मिलते हैं।',
	seo_faq_bmr_q: 'बेसल मेटाबॉलिक रेट (BMR) क्या है?',
	seo_faq_bmr_a: 'BMR वे कैलोरी हैं जो शरीर पूर्ण आराम में जलाता है। MacroCalc तीन समीकरण सपोर्ट करता है: Mifflin-St Jeor (सामान्य जनसंख्या के लिए सर्वश्रेष्ठ), Revised Harris-Benedict, और Katch-McArdle (जब बॉडी कंपोजिशन पता हो तो सबसे सटीक)।',
	seo_faq_tdee_q: 'टोटल डेली एनर्जी एक्सपेंडिचर (TDEE) कैसे कैलकुलेट होता है?',
	seo_faq_tdee_a: 'TDEE = BMR × एक्टिविटी मल्टीप्लायर। निष्क्रिय (×1.2), हल्का सक्रिय (×1.375), मध्यम सक्रिय (×1.55), बहुत सक्रिय (×1.725), अत्यंत सक्रिय (×1.9)।',
	seo_faq_macros_q: 'MacroCalc प्रोटीन, कार्ब्स और फैट कैसे वितरित करता है?',
	seo_faq_macros_a: 'प्रोटीन और फैट LBM के प्रति किलो ग्राम में सेट होते हैं। कार्ब्स बची हुई कैलोरी भरते हैं। मेंटेनेंस: 1.8g प्रोटीन/kg LBM, 1.0g फैट/kg। सरप्लस: 2.0g प्रोटीन, फैट कुल कैलोरी का 25%। डेफिनिशन: 2.5g प्रोटीन, 0.9g फैट/kg।',
	seo_faq_goals_q: 'हर लक्ष्य के लिए कैलोरी एडजस्टमेंट क्या हैं?',
	seo_faq_goals_a: 'मेंटेनेंस: कैलोरी = TDEE। सरप्लस: मसल ग्रोथ के लिए TDEE +300 kcal। डेफिनिशन: मध्यम फैट लॉस के लिए TDEE −300 kcal (प्रत्येक 500 kcal की कमी से लगभग 0.5 kg/सप्ताह वज़न कम)।',
} satisfies Translations
