import { defaultBMRAndExercise, defaultCarbsGrams, defaultFatsGrams, defaultProteinsGrams } from '@lib/defaults'
import { type ChartConfiguration, type ChartConfigurationCustomTypesPerDataset } from 'chart.js'
import { getChartTitle, getLabels, getMacronutrientsSlicePercentage } from './chart-functions'

export const chartConfiguration: ChartConfiguration<'pie', number[], unknown> | ChartConfigurationCustomTypesPerDataset<'pie', number[], unknown> = {
	type: 'pie',
	data: {
		labels: getLabels(defaultCarbsGrams, defaultFatsGrams, defaultProteinsGrams),
		datasets: [
			{
				data: [defaultCarbsGrams * 4, defaultFatsGrams * 9, defaultProteinsGrams * 4],
				backgroundColor: ['#D1D5DB', '#8C8C8C', '#4A4A4A'],
				borderColor: '#0A0A0A',
				borderWidth: 2,
				hoverBorderColor: '#0A0A0A',
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
				color: '#E5E7EB',
				font: {
					size: 16,
					weight: 'bold',
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
					weight: 'bold',
				},
				backgroundColor: '#1A1A1A',
				displayColors: false,
			},
			legend: {
				position: 'left',
				labels: {
					padding: 20,
					boxWidth: 16,
					boxHeight: 16,
					color: '#E5E7EB',
					font: {
						weight: 'bold',
						size: 14,
					},
				},
			},
		},
	},
}
