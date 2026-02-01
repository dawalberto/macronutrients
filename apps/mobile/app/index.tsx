import { MacroDonutChart } from '@/src/components/MacroDonutChart'
import { useNanostore } from '@/src/hooks/useNanostore'
import { useI18n } from '@/src/i18n'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import {
	$updateUserAge,
	$updateUserGenre,
	$updateUserGoal,
	$updateUserHeight,
	$updateUserWeight,
	$userAttributes,
	calculateAndUpdateBMR,
	calculateAndUpdateLBM,
	calculateMacroTargetsFromState,
	type BMREquation,
	type ExerciseMultiplier,
	type Genre,
	type Goal,
	type LBMFormula,
} from '@macronutrients/core'
import { router } from 'expo-router'
import { useMemo } from 'react'
import { Alert, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'

export default function IndexScreen() {
	const user = useNanostore($userAttributes)
	const targets = useMemo(() => calculateMacroTargetsFromState(user), [user])
	const { t } = useI18n()

	return (
		<ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps='handled'>
			<View style={styles.header}>
				<Text style={styles.title}>{t('app.title')}</Text>
				<Pressable
					hitSlop={10}
					accessibilityRole='button'
					accessibilityLabel={t('settings.title')}
					onPress={() => router.push('/modal')}
					style={({ pressed }) => [styles.settingsButton, pressed && styles.settingsButtonPressed]}
				>
					<FontAwesome name='cog' size={18} color='#111827' />
				</Pressable>
			</View>

			<Section title={t('sections.basics')}>
				<Row>
					<Segmented
						label={t('fields.gender')}
						value={user.genre}
						options={[
							{ label: t('gender.male'), value: 'male' },
							{ label: t('gender.female'), value: 'female' },
						]}
						onChange={(v) => $updateUserGenre(v as Genre)}
					/>
				</Row>

				<Row>
					<NumberField label={t('fields.weightKg')} value={user.weight} onChange={(v) => $updateUserWeight(v)} />
					<NumberField label={t('fields.heightCm')} value={user.height} onChange={(v) => $updateUserHeight(v)} />
				</Row>

				<Row>
					<NumberField label={t('fields.ageYears')} value={user.age} onChange={(v) => $updateUserAge(v)} />
				</Row>
			</Section>

			<Section title={t('sections.goal')}>
				<Segmented
					label={t('fields.goal')}
					value={user.goal}
					options={[
						{ label: t('goal.maintain'), value: 'Maintain' },
						{ label: t('goal.surplus'), value: 'Surplus' },
						{ label: t('goal.definition'), value: 'Definition' },
					]}
					onChange={(v) => $updateUserGoal(v as Goal)}
				/>
			</Section>

			<Section title={t('sections.energy')}>
				<Segmented
					label={t('fields.exercise')}
					value={user.bmrAndExercise.exerciseMultiplier}
					options={
						[
							{ label: t('exercise.sedentary'), value: 'Sedentary' },
							{ label: t('exercise.light'), value: 'Lightly active' },
							{ label: t('exercise.moderate'), value: 'Moderately active' },
							{ label: t('exercise.very'), value: 'Very active' },
							{ label: t('exercise.extreme'), value: 'Extremely active' },
						] as const satisfies ReadonlyArray<{ label: string; value: ExerciseMultiplier }>
					}
					onChange={(v) => calculateAndUpdateBMR({ exerciseMultiplier: v as ExerciseMultiplier })}
				/>

				<Segmented
					label={t('fields.bmrEquation')}
					value={user.bmrAndExercise.equation}
					options={
						[
							{ label: 'Mifflin', value: 'Mifflin St Jeor' },
							{ label: 'Harris', value: 'Revised Harris-Benedict' },
							{ label: 'Katch', value: 'Katch-McArdle' },
						] as const satisfies ReadonlyArray<{ label: string; value: BMREquation }>
					}
					onChange={(v) => calculateAndUpdateBMR({ equation: v as BMREquation })}
				/>
			</Section>

			<Section title={t('sections.lbm')} helpText={t('help.lbm.text')}>
				<Segmented
					label={t('fields.formula')}
					value={user.lbm.formula}
					options={
						[
							{ label: 'Boer', value: 'Boer' },
							{ label: 'James', value: 'James' },
							{ label: 'Hume', value: 'Hume' },
							{ label: 'Manual', value: 'Manual' },
						] as const satisfies ReadonlyArray<{ label: string; value: LBMFormula }>
					}
					onChange={(v) => calculateAndUpdateLBM({ formula: v as LBMFormula })}
				/>

				{user.lbm.formula === 'Manual' ? (
					<Row>
						<NumberField label={t('lbm.manualLbmKg')} value={user.lbm.lbmKg} onChange={(v) => calculateAndUpdateLBM({ lbmManual: v })} />
					</Row>
				) : null}
			</Section>

			<Section title={t('sections.results')}>
				<MacroDonutChart targets={targets} />
				<View style={styles.divider} />
				<KeyValue label={t('results.kcalDay')} value={targets.kcalPerDay} />
				<KeyValue label={t('results.carbs')} value={`${targets.carbsGrams} g`} />
				<KeyValue label={t('results.fats')} value={`${targets.fatsGrams} g`} />
				<KeyValue label={t('results.proteins')} value={`${targets.proteinsGrams} g`} />
				<View style={styles.divider} />
				<KeyValue label={t('results.lbm')} value={`${user.lbm.lbmKg} kg`} />
				<KeyValue label={t('results.bodyFat')} value={`${user.lbm.bodyFatPercentage}%`} />
			</Section>
		</ScrollView>
	)
}

function Section({ title, helpText, children }: { title: string; helpText?: string; children: React.ReactNode }) {
	const showHelp = () => {
		if (!helpText) return
		if (Platform.OS === 'web') {
			// RN's Alert is native-first; on web a simple alert is the most reliable.
			globalThis.alert?.(`${title}\n\n${helpText}`)
			return
		}
		Alert.alert(title, helpText)
	}

	return (
		<View style={styles.section}>
			{helpText ? (
				<Pressable
					hitSlop={8}
					accessibilityRole='button'
					accessibilityLabel={`${title} help`}
					onPress={showHelp}
					style={({ pressed }) => [styles.sectionTitleRow, pressed && styles.sectionTitleRowPressed]}
				>
					<Text style={styles.sectionTitle}>{title}</Text>
					<FontAwesome name='info-circle' size={18} color='#6b7280' style={styles.sectionTitleIcon} />
				</Pressable>
			) : (
				<View style={styles.sectionTitleRow}>
					<Text style={styles.sectionTitle}>{title}</Text>
				</View>
			)}
			{children}
		</View>
	)
}

function Row({ children }: { children: React.ReactNode }) {
	return <View style={styles.row}>{children}</View>
}

function KeyValue({ label, value }: { label: string; value: string | number }) {
	return (
		<View style={styles.kv}>
			<Text style={styles.kvLabel}>{label}</Text>
			<Text style={styles.kvValue}>{value}</Text>
		</View>
	)
}

function NumberField({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
	return (
		<View style={styles.field}>
			<Text style={styles.fieldLabel}>{label}</Text>
			<TextInput
				style={styles.input}
				value={String(value)}
				keyboardType='numeric'
				onChangeText={(t) => {
					const n = Number(t)
					if (!Number.isFinite(n)) return
					onChange(n)
				}}
			/>
		</View>
	)
}

function Segmented({
	label,
	value,
	options,
	onChange,
}: {
	label: string
	value: string
	options: ReadonlyArray<{ label: string; value: string }>
	onChange: (v: string) => void
}) {
	return (
		<View style={styles.segmented}>
			<Text style={styles.fieldLabel}>{label}</Text>
			<View style={styles.segmentedRow}>
				{options.map((opt) => {
					const active = opt.value === value
					return (
						<Pressable
							key={opt.value}
							onPress={() => onChange(opt.value)}
							style={[styles.segment, active ? styles.segmentActive : styles.segmentInactive]}
						>
							<Text style={[styles.segmentText, active ? styles.segmentTextActive : styles.segmentTextInactive]}>{opt.label}</Text>
						</Pressable>
					)
				})}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		padding: 8,
		paddingBottom: 32,
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 6,
	},
	title: {
		fontSize: 28,
		fontWeight: '800',
		textAlign: 'center',
	},
	settingsButton: {
		position: 'absolute',
		right: 0,
		padding: 8,
	},
	settingsButtonPressed: {
		opacity: 0.6,
	},
	section: {
		borderWidth: StyleSheet.hairlineWidth,
		borderColor: '#e5e7eb',
		borderRadius: 12,
		padding: 12,
		marginTop: 12,
		backgroundColor: '#fff',
	},
	sectionTitle: {
		fontSize: 16,
		fontWeight: '700',
		lineHeight: 20,
	},
	sectionTitleRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
		marginBottom: 8,
	},
	sectionTitleRowPressed: {
		opacity: 0.65,
	},
	sectionTitleIcon: {
		marginTop: 1,
	},
	row: {
		flexDirection: 'row',
		gap: 12,
		flexWrap: 'wrap',
		marginTop: 8,
	},
	field: {
		flexGrow: 1,
		minWidth: 140,
	},
	fieldLabel: {
		fontSize: 12,
		fontWeight: '700',
		color: '#374151',
		marginBottom: 6,
	},
	input: {
		borderWidth: 1,
		borderColor: '#d1d5db',
		borderRadius: 10,
		paddingHorizontal: 12,
		paddingVertical: 10,
		fontSize: 16,
		backgroundColor: '#f9fafb',
	},
	segmented: {
		marginTop: 8,
	},
	segmentedRow: {
		flexDirection: 'row',
		gap: 8,
		flexWrap: 'wrap',
	},
	segment: {
		paddingVertical: 10,
		paddingHorizontal: 12,
		borderRadius: 999,
		borderWidth: 1,
	},
	segmentActive: {
		backgroundColor: '#111827',
		borderColor: '#111827',
	},
	segmentInactive: {
		backgroundColor: '#fff',
		borderColor: '#d1d5db',
	},
	segmentText: {
		fontSize: 12,
		fontWeight: '700',
	},
	segmentTextActive: {
		color: '#fff',
	},
	segmentTextInactive: {
		color: '#111827',
	},
	kv: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: 6,
	},
	kvLabel: {
		fontSize: 13,
		color: '#374151',
		fontWeight: '700',
	},
	kvValue: {
		fontSize: 14,
		color: '#111827',
		fontWeight: '800',
	},
	divider: {
		height: 1,
		backgroundColor: '#e5e7eb',
		marginVertical: 8,
	},
})
