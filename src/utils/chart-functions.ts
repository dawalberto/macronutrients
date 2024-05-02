import type { TooltipItem } from 'chart.js'

export const getLabels = (carbs: number, fats: number, proteins: number) => [
	`🍚 ${carbs}g of carbs`,
	`🥑 ${fats}g of fats`,
	`🍣 ${proteins}g of proteins`,
]

export const getMacronutrientsSlicePercentage = (context: TooltipItem<'pie'>) => {
	const { dataset, dataIndex, label } = context
	let value = dataset.data[dataIndex] ?? 0
	let total = dataset.data.reduce((acc, val) => acc + val, 0)
	let percentage = ((value / total) * 100).toFixed(1)
	return `${label.split(' ')[0]}  ${percentage}%`
}

export const getChartTitle = (kcalPerDay: number) => `🍱 ${kcalPerDay} kilocalories per day`
