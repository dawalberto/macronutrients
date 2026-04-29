import { defaultBMRAndExercise, defaultCarbsGrams, defaultFatsGrams, defaultProteinsGrams } from '@lib/defaults'
import { en } from '@i18n/locales/en'
import { type ChartConfiguration, type ChartConfigurationCustomTypesPerDataset } from 'chart.js'
import { getChartTitle, getLabels, getMacronutrientsSlicePercentage } from './chart-functions'

export const chartConfiguration: ChartConfiguration<'pie', number[], unknown> | ChartConfigurationCustomTypesPerDataset<'pie', number[], unknown> = {
	type: 'pie',
	data: {
		labels: getLabels(defaultCarbsGrams, defaultFatsGrams, defaultProteinsGrams, en),
		datasets: [
			{
				data: [defaultCarbsGrams * 4, defaultFatsGrams * 9, defaultProteinsGrams * 4],
				backgroundColor: ['#0075de', '#2a9d99', '#dd5b00'],
				borderColor: '#ffffff',
				borderWidth: 2,
				hoverBorderColor: '#ffffff',
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
				text: getChartTitle(defaultBMRAndExercise.kcalPerDayToMaintain, en),
				align: 'start',
				color: 'rgba(0,0,0,0.95)',
				font: {
					size: 16,
					weight: 'bold',
					family: 'Geist Mono, ui-monospace, SFMono-Regular, monospace',
				},
			},
			tooltip: {
				cornerRadius: 4,
				padding: 10,
				callbacks: {
					title: () => '',
					label: (context) => getMacronutrientsSlicePercentage(context),
				},
				bodyFont: {
					size: 13,
					weight: 'bold',
					family: 'Geist Mono, ui-monospace, SFMono-Regular, monospace',
				},
				backgroundColor: 'rgba(0,0,0,0.85)',
				displayColors: false,
			},
			legend: {
				position: 'left',
				labels: {
					padding: 20,
					boxWidth: 12,
					boxHeight: 12,
					color: 'rgba(0,0,0,0.85)',
					font: {
						weight: 'bold',
						size: 13,
						family: 'Geist Mono, ui-monospace, SFMono-Regular, monospace',
					},
				},
			},
		},
	},
}
