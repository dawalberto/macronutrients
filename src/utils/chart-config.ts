import { defaultBMRAndExercise, defaultCarbsGrams, defaultFatsGrams, defaultProteinsGrams } from '@lib/defaults'
import { type ChartConfiguration, type ChartConfigurationCustomTypesPerDataset } from 'chart.js'
import { getChartTitle, getLabels, getMacronutrientsSlicePercentage } from './chart-functions'

export const chartConfiguration: ChartConfiguration<'pie', number[], unknown> | ChartConfigurationCustomTypesPerDataset<'pie', number[], unknown> = {
	type: 'pie',
	data: {
		labels: getLabels(defaultCarbsGrams, defaultFatsGrams, defaultProteinsGrams),
		datasets: [
			{
				// label: 'My First Dataset',
				data: [defaultCarbsGrams * 4, defaultFatsGrams * 9, defaultProteinsGrams * 4],
				backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
				// hoverOffset: 4,
				borderColor: '#4b5563',
				borderWidth: 2,
				hoverBorderColor: '#030712',
			},
		],
	},
	options: {
		maintainAspectRatio: false,
		layout: {
			padding: {
				left: 0,
				right: 0,
				top: 0,
				bottom: 0,
			},
		},
		plugins: {
			title: {
				display: true,
				text: getChartTitle(defaultBMRAndExercise.kcalPerDayToMaintain),
				align: 'start',
				color: '#374151',
				font: {
					size: 18,
				},
			},
			tooltip: {
				cornerRadius: 0,
				padding: 10,
				callbacks: {
					title: () => '',
					label: (context) => getMacronutrientsSlicePercentage(context),
				},
				bodyFont: {
					size: 14,
					weight: 500,
				},
				backgroundColor: '#1f2937',
				displayColors: false,
			},
			legend: {
				position: 'left',
				labels: {
					padding: 20,
					boxWidth: 25,
					boxHeight: 25,
					color: '#334155',
					font: {
						weight: 500,
						size: 16,
					},
				},
			},
		},
	},
}
