import { useTranslations } from '@i18n/index'
import { LanguageSelector } from './LanguageSelector'

export const InfoContent = () => {
	const t = useTranslations()

	return (
		<>
			<header className='mb-8 border-b-8 border-[#4A4A4A] pb-4'>
				<h1 className='text-4xl leading-none font-extrabold italic'>{t.page_title}</h1>
				<div className='mt-1 flex items-center justify-between'>
					<p className='text-[clamp(10px,1.1vw,12px)] opacity-60'>{t.reference_manual}</p>
					<div className='flex gap-1'>
						<div className='h-2 w-2 bg-emerald-500'></div>
						<div className='bg-slate-brutalist h-2 w-2'></div>
						<div className='bg-slate-brutalist h-2 w-2'></div>
					</div>
				</div>
			</header>

			<nav className='mb-8'>
				<a
					href='/'
					className='brutalist-border bg-obsidian inline-block px-4 py-2 text-[clamp(11px,1.2vw,13px)] font-bold text-gray-400 transition-all hover:border-gray-100 hover:text-white'
				>
					{t.back_to_calculator}
				</a>
			</nav>

			<div className='flex flex-col gap-8'>
				{/* Module 01: LBM */}
				<section className='brutalist-border bg-obsidian p-6'>
					<p className='mb-4 text-[clamp(11px,1.2vw,13px)] opacity-60'>◉ {t.info_module_01}</p>
					<h2 className='mb-4 border-b-2 border-[#4A4A4A] pb-2 text-xl font-extrabold italic'>{t.info_lbm_title}</h2>

					<div className='mb-4 space-y-2 text-[clamp(11px,1.2vw,13px)]'>
						<p className='text-gray-300'>{t.info_lbm_desc}</p>
					</div>

					<div className='space-y-4'>
						<div className='border-l-4 border-gray-100 pl-4'>
							<p className='mb-1 text-[clamp(11px,1.2vw,13px)] font-bold'>{t.info_lbm_boer_label}</p>
							<p className='text-concrete text-[clamp(10px,1vw,11px)]'>Male: 0.407 × W + 0.267 × H − 19.2</p>
							<p className='text-concrete text-[clamp(10px,1vw,11px)]'>Female: 0.252 × W + 0.473 × H − 48.3</p>
							<p className='mt-1 text-[clamp(10px,1vw,11px)] opacity-50'>{t.info_lbm_boer_note}</p>
						</div>

						<div className='border-l-4 border-[#4A4A4A] pl-4'>
							<p className='mb-1 text-[clamp(11px,1.2vw,13px)] font-bold'>JAMES</p>
							<p className='text-concrete text-[clamp(10px,1vw,11px)]'>Male: 1.1 × W − 128 × (W/H)²</p>
							<p className='text-concrete text-[clamp(10px,1vw,11px)]'>Female: 1.07 × W − 148 × (W/H)²</p>
							<p className='mt-1 text-[clamp(10px,1vw,11px)] opacity-50'>{t.info_lbm_james_note}</p>
						</div>

						<div className='border-l-4 border-[#4A4A4A] pl-4'>
							<p className='mb-1 text-[clamp(11px,1.2vw,13px)] font-bold'>HUME</p>
							<p className='text-concrete text-[clamp(10px,1vw,11px)]'>Male: 0.3281 × W + 0.33929 × H − 29.5336</p>
							<p className='text-concrete text-[clamp(10px,1vw,11px)]'>Female: 0.29569 × W + 0.41813 × H − 43.2933</p>
						</div>

						<div className='border-l-4 border-[#4A4A4A] pl-4'>
							<p className='mb-1 text-[clamp(11px,1.2vw,13px)] font-bold'>MANUAL</p>
							<p className='text-concrete text-[clamp(10px,1vw,11px)]'>{t.info_lbm_manual_desc}</p>
						</div>
					</div>
				</section>

				{/* Module 02: BMR */}
				<section className='brutalist-border bg-obsidian p-6'>
					<p className='mb-4 text-[clamp(11px,1.2vw,13px)] opacity-60'>◉ {t.info_module_02}</p>
					<h2 className='mb-4 border-b-2 border-[#4A4A4A] pb-2 text-xl font-extrabold italic'>{t.info_bmr_title}</h2>

					<div className='mb-4 space-y-2 text-[clamp(11px,1.2vw,13px)]'>
						<p className='text-gray-300'>{t.info_bmr_desc}</p>
					</div>

					<div className='space-y-4'>
						<div className='border-l-4 border-[#4A4A4A] pl-4'>
							<p className='mb-1 text-[clamp(11px,1.2vw,13px)] font-bold'>MIFFLIN-ST JEOR</p>
							<p className='text-concrete text-[clamp(10px,1vw,11px)]'>Male: 10W + 6.25H − 5A + 5</p>
							<p className='text-concrete text-[clamp(10px,1vw,11px)]'>Female: 10W + 6.25H − 5A − 161</p>
							<p className='mt-1 text-[clamp(10px,1vw,11px)] opacity-50'>{t.info_bmr_mifflin_note}</p>
						</div>

						<div className='border-l-4 border-[#4A4A4A] pl-4'>
							<p className='mb-1 text-[clamp(11px,1.2vw,13px)] font-bold'>REVISED HARRIS-BENEDICT</p>
							<p className='text-concrete text-[clamp(10px,1vw,11px)]'>Male: 13.397W + 4.799H − 5.677A + 88.362</p>
							<p className='text-concrete text-[clamp(10px,1vw,11px)]'>Female: 9.247W + 3.098H − 4.33A + 447.593</p>
							<p className='mt-1 text-[clamp(10px,1vw,11px)] opacity-50'>{t.info_bmr_harris_note}</p>
						</div>

						<div className='border-l-4 border-gray-100 pl-4'>
							<p className='mb-1 text-[clamp(11px,1.2vw,13px)] font-bold'>{t.info_bmr_katch_label}</p>
							<p className='text-concrete text-[clamp(10px,1vw,11px)]'>370 + 21.6 × LBM (kg)</p>
							<p className='mt-1 text-[clamp(10px,1vw,11px)] opacity-50'>{t.info_bmr_katch_note}</p>
						</div>
					</div>
				</section>

				{/* Module 03: TDEE */}
				<section className='brutalist-border bg-obsidian p-6'>
					<p className='mb-4 text-[clamp(11px,1.2vw,13px)] opacity-60'>◉ {t.info_module_03}</p>
					<h2 className='mb-4 border-b-2 border-[#4A4A4A] pb-2 text-xl font-extrabold italic'>{t.info_tdee_title}</h2>

					<div className='mb-4 text-[clamp(11px,1.2vw,13px)]'>
						<p className='text-gray-300'>{t.info_tdee_desc}</p>
						<p className='text-concrete mt-2 text-[clamp(10px,1vw,11px)] font-bold'>{t.info_tdee_formula}</p>
					</div>

					<div className='space-y-2'>
						<div className='flex justify-between border-b border-[#4A4A4A] py-2 text-[clamp(10px,1vw,11px)]'>
							<span className='font-bold'>{t.exercise_sedentary.toUpperCase()}</span>
							<span className='text-concrete'>{t.info_tdee_sedentary_desc}</span>
						</div>
						<div className='flex justify-between border-b border-[#4A4A4A] py-2 text-[clamp(10px,1vw,11px)]'>
							<span className='font-bold'>{t.exercise_lightly.toUpperCase()}</span>
							<span className='text-concrete'>{t.info_tdee_lightly_desc}</span>
						</div>
						<div className='flex justify-between border-b border-[#4A4A4A] py-2 text-[clamp(10px,1vw,11px)]'>
							<span className='font-bold'>{t.exercise_moderately.toUpperCase()}</span>
							<span className='text-concrete'>{t.info_tdee_moderately_desc}</span>
						</div>
						<div className='flex justify-between border-b border-[#4A4A4A] py-2 text-[clamp(10px,1vw,11px)]'>
							<span className='font-bold'>{t.exercise_very.toUpperCase()}</span>
							<span className='text-concrete'>{t.info_tdee_very_desc}</span>
						</div>
						<div className='flex justify-between py-2 text-[clamp(10px,1vw,11px)]'>
							<span className='font-bold'>{t.exercise_extremely.toUpperCase()}</span>
							<span className='text-concrete'>{t.info_tdee_extremely_desc}</span>
						</div>
					</div>
				</section>

				{/* Module 04: Goals */}
				<section className='brutalist-border bg-obsidian p-6'>
					<p className='mb-4 text-[clamp(11px,1.2vw,13px)] opacity-60'>◉ {t.info_module_04}</p>
					<h2 className='mb-4 border-b-2 border-[#4A4A4A] pb-2 text-xl font-extrabold italic'>{t.info_goals_title}</h2>

					<div className='space-y-4'>
						<div className='border-l-4 border-gray-100 pl-4'>
							<p className='mb-1 text-[clamp(11px,1.2vw,13px)] font-bold'>{t.goal_maintain.toUpperCase()}</p>
							<p className='text-concrete text-[clamp(10px,1vw,11px)]'>{t.info_goal_maintain_formula}</p>
							<p className='mt-1 text-[clamp(10px,1vw,11px)] opacity-50'>{t.info_goal_maintain_desc}</p>
						</div>
						<div className='border-l-4 border-[#4A4A4A] pl-4'>
							<p className='mb-1 text-[clamp(11px,1.2vw,13px)] font-bold'>{t.goal_surplus.toUpperCase()}</p>
							<p className='text-concrete text-[clamp(10px,1vw,11px)]'>{t.info_goal_surplus_formula}</p>
							<p className='mt-1 text-[clamp(10px,1vw,11px)] opacity-50'>{t.info_goal_surplus_desc}</p>
						</div>
						<div className='border-l-4 border-[#4A4A4A] pl-4'>
							<p className='mb-1 text-[clamp(11px,1.2vw,13px)] font-bold'>{t.goal_definition.toUpperCase()}</p>
							<p className='text-concrete text-[clamp(10px,1vw,11px)]'>{t.info_goal_definition_formula}</p>
							<p className='mt-1 text-[clamp(10px,1vw,11px)] opacity-50'>{t.info_goal_definition_desc}</p>
						</div>
					</div>
				</section>

				{/* Module 05: Macronutrients */}
				<section className='brutalist-border bg-obsidian p-6'>
					<p className='mb-4 text-[clamp(11px,1.2vw,13px)] opacity-60'>◉ {t.info_module_05}</p>
					<h2 className='mb-4 border-b-2 border-[#4A4A4A] pb-2 text-xl font-extrabold italic'>{t.info_macros_title}</h2>

					<div className='mb-4 text-[clamp(11px,1.2vw,13px)]'>
						<p className='text-gray-300'>{t.info_macros_desc}</p>
					</div>

					<div className='mb-6 space-y-2'>
						<div className='flex justify-between border-b border-[#4A4A4A] py-2 text-[clamp(10px,1vw,11px)]'>
							<span className='font-bold'>PROTEIN</span>
							<span className='text-concrete'>4 kcal / gram</span>
						</div>
						<div className='flex justify-between border-b border-[#4A4A4A] py-2 text-[clamp(10px,1vw,11px)]'>
							<span className='font-bold'>CARBOHYDRATES</span>
							<span className='text-concrete'>4 kcal / gram</span>
						</div>
						<div className='flex justify-between py-2 text-[clamp(10px,1vw,11px)]'>
							<span className='font-bold'>FAT</span>
							<span className='text-concrete'>9 kcal / gram</span>
						</div>
					</div>

					<div className='space-y-3 border-t-2 border-dashed border-[#4A4A4A] pt-4'>
						<p className='text-[clamp(11px,1.2vw,13px)] font-bold'>{t.info_protein_targets}</p>
						<div className='flex justify-between text-[clamp(10px,1vw,11px)]'>
							<span className='text-concrete'>{t.goal_maintain}</span>
							<span>1.8 g/kg</span>
						</div>
						<div className='flex justify-between text-[clamp(10px,1vw,11px)]'>
							<span className='text-concrete'>{t.goal_surplus}</span>
							<span>2.0 g/kg</span>
						</div>
						<div className='flex justify-between text-[clamp(10px,1vw,11px)]'>
							<span className='text-concrete'>{t.goal_definition}</span>
							<span>2.5 g/kg</span>
						</div>
					</div>

					<div className='mt-4 space-y-3 border-t-2 border-dashed border-[#4A4A4A] pt-4'>
						<p className='text-[clamp(11px,1.2vw,13px)] font-bold'>{t.info_fat_targets}</p>
						<div className='flex justify-between text-[clamp(10px,1vw,11px)]'>
							<span className='text-concrete'>{t.goal_maintain}</span>
							<span>1.0 g/kg LBM</span>
						</div>
						<div className='flex justify-between text-[clamp(10px,1vw,11px)]'>
							<span className='text-concrete'>{t.goal_surplus}</span>
							<span>25% of total kcal</span>
						</div>
						<div className='flex justify-between text-[clamp(10px,1vw,11px)]'>
							<span className='text-concrete'>{t.goal_definition}</span>
							<span>0.9 g/kg LBM</span>
						</div>
					</div>

					<div className='mt-4 border-t-2 border-dashed border-[#4A4A4A] pt-4'>
						<p className='text-[clamp(11px,1.2vw,13px)] font-bold'>{t.info_carbs_label}</p>
						<p className='text-concrete mt-1 text-[clamp(10px,1vw,11px)]'>{t.info_carbs_formula}</p>
					</div>
				</section>
			</div>

			<footer className='mt-8 border-t-2 border-dashed border-[#4A4A4A] py-12'>
				<div className='mb-6 flex justify-center'>
					<LanguageSelector />
				</div>
				<div className='space-y-2 text-center text-[clamp(8px,1vw,10px)] opacity-40'>
					<p>DATA_RECONSTRUCTED // UNIT_SYSTEM: METRIC // SOURCE: MIFFLIN-ST_JEOR_REVISED</p>
					<p className='tracking-[0.2em]'>01010111 01001000 01000101 01000001 01010100</p>
				</div>
			</footer>
		</>
	)
}
