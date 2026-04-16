import type { TooltipItem } from 'chart.js'
import type { Translations } from '@i18n/locales/en'

export const getLabels = (carbs: number, fats: number, proteins: number, t: Translations) => [
	t.chart_carbs(carbs),
	t.chart_fats(fats),
	t.chart_prot(proteins),
]

export const getMacronutrientsSlicePercentage = (context: TooltipItem<'pie'>) => {
	const { dataset, dataIndex, label } = context
	let value = dataset.data[dataIndex] ?? 0
	let total = dataset.data.reduce((acc, val) => acc + val, 0)
	let percentage = ((value / total) * 100).toFixed(1)
	return `${label?.split(' ')[0]}  ${percentage}%`
}

export const getChartTitle = (kcalPerDay: number, t: Translations) => t.chart_title(kcalPerDay)
