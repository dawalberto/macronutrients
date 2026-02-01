import type { MacroTargets } from '@macronutrients/core'
import { useMemo } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Svg, { Circle, G } from 'react-native-svg'

import { useI18n } from '@/src/i18n'

const COLORS = {
	carbs: '#f59e0b',
	fats: '#fde047',
	proteins: '#38bdf8',
	track: '#e5e7eb',
	stroke: '#ffffff',
	text: '#111827',
	subtext: '#374151',
}

export const MacroDonutChart = ({ targets, size = 220 }: { targets: MacroTargets; size?: number }) => {
	const { t } = useI18n()
	const strokeWidth = 22
	const radius = (size - strokeWidth) / 2
	const circumference = 2 * Math.PI * radius
	const totalKcal = Math.max(1, targets.carbsKcal + targets.fatsKcal + targets.proteinsKcal)

	const segments = useMemo(
		() =>
			[
				{ key: 'carbs', label: t('results.carbs'), kcal: targets.carbsKcal, grams: targets.carbsGrams, color: COLORS.carbs },
				{ key: 'fats', label: t('results.fats'), kcal: targets.fatsKcal, grams: targets.fatsGrams, color: COLORS.fats },
				{ key: 'proteins', label: t('results.proteins'), kcal: targets.proteinsKcal, grams: targets.proteinsGrams, color: COLORS.proteins },
			] as const,
		[targets, t]
	)

	let offset = 0
	const overlap = 0.75

	return (
		<View style={styles.wrapper}>
			<View style={{ width: size, height: size }}>
				<Svg width={size} height={size}>
					<G rotation={-90} originX={size / 2} originY={size / 2}>
						<Circle cx={size / 2} cy={size / 2} r={radius} stroke={COLORS.track} strokeWidth={strokeWidth} fill='transparent' />
						{segments.map((seg) => {
							const baseDash = (seg.kcal / totalKcal) * circumference
							const dash = baseDash > 0 ? Math.min(circumference, baseDash + overlap) : 0
							// Using `${dash} ${circumference}` avoids an extra repeated dash on some SVG renderers (notably web),
							// which can show up as a "split" line through the donut.
							const dasharray = `${dash} ${circumference}`
							const dashoffset = offset > 0 ? -(offset - overlap) : 0
							offset += baseDash

							return (
								<Circle
									key={seg.key}
									cx={size / 2}
									cy={size / 2}
									r={radius}
									stroke={seg.color}
									strokeWidth={strokeWidth}
									fill='transparent'
									strokeDasharray={dasharray}
									strokeDashoffset={dashoffset}
									strokeLinecap='butt'
								/>
							)
						})}
					</G>
				</Svg>

				<View style={styles.center} pointerEvents='none'>
					<Text style={styles.centerKcal}>{targets.kcalPerDay}</Text>
					<Text style={styles.centerLabel}>{t('results.kcalDay')}</Text>
				</View>
			</View>

			<View style={styles.legend}>
				{segments.map((seg) => {
					const pct = Math.round((seg.kcal / totalKcal) * 100)
					return (
						<View key={seg.key} style={styles.legendRow}>
							<View style={[styles.swatch, { backgroundColor: seg.color }]} />
							<Text style={styles.legendText}>
								{seg.label}: {seg.grams}g • {pct}%
							</Text>
						</View>
					)
				})}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	wrapper: {
		alignItems: 'center',
		gap: 12,
	},
	center: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		alignItems: 'center',
		justifyContent: 'center',
	},
	centerKcal: {
		fontSize: 28,
		fontWeight: '900',
		color: COLORS.text,
	},
	centerLabel: {
		marginTop: 2,
		fontSize: 12,
		fontWeight: '700',
		color: COLORS.subtext,
	},
	legend: {
		alignSelf: 'stretch',
		gap: 8,
	},
	legendRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
	},
	swatch: {
		width: 14,
		height: 14,
		borderRadius: 4,
	},
	legendText: {
		fontSize: 13,
		fontWeight: '700',
		color: COLORS.text,
	},
})
