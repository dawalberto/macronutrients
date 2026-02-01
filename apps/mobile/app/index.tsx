import { MacroDonutChart } from '@/src/components/MacroDonutChart'
import { useNanostore } from '@/src/hooks/useNanostore'
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
import { useMemo } from 'react'
import { Alert, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'

export default function IndexScreen() {
	const user = useNanostore($userAttributes)
	const targets = useMemo(() => calculateMacroTargetsFromState(user), [user])

	return (
		<ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps='handled'>
			<Text style={styles.title}>MacroCalc</Text>

			<Section title='Basics'>
				<Row>
					<Segmented
						label='Gender'
						value={user.genre}
						options={[
							{ label: 'Male', value: 'male' },
							{ label: 'Female', value: 'female' },
						]}
						onChange={(v) => $updateUserGenre(v as Genre)}
					/>
				</Row>

				<Row>
					<NumberField label='Weight (kg)' value={user.weight} onChange={(v) => $updateUserWeight(v)} />
					<NumberField label='Height (cm)' value={user.height} onChange={(v) => $updateUserHeight(v)} />
				</Row>

				<Row>
					<NumberField label='Age (years)' value={user.age} onChange={(v) => $updateUserAge(v)} />
				</Row>
			</Section>

			<Section title='Goal'>
				<Segmented
					label='Goal'
					value={user.goal}
					options={[
						{ label: 'Maintain', value: 'Maintain' },
						{ label: 'Surplus', value: 'Surplus' },
						{ label: 'Definition', value: 'Definition' },
					]}
					onChange={(v) => $updateUserGoal(v as Goal)}
				/>
			</Section>

			<Section title='Energy'>
				<Segmented
					label='Exercise'
					value={user.bmrAndExercise.exerciseMultiplier}
					options={
						[
							{ label: 'Sed', value: 'Sedentary' },
							{ label: 'Light', value: 'Lightly active' },
							{ label: 'Mod', value: 'Moderately active' },
							{ label: 'Very', value: 'Very active' },
							{ label: 'Xtr', value: 'Extremely active' },
						] as const satisfies ReadonlyArray<{ label: string; value: ExerciseMultiplier }>
					}
					onChange={(v) => calculateAndUpdateBMR({ exerciseMultiplier: v as ExerciseMultiplier })}
				/>

				<Segmented
					label='BMR Equation'
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

			<Section title='LBM' helpText='Lean Body Mass - Total body weight minus fat mass'>
				<Segmented
					label='Formula'
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
						<NumberField label='Manual LBM (kg)' value={user.lbm.lbmKg} onChange={(v) => calculateAndUpdateLBM({ lbmManual: v })} />
					</Row>
				) : null}
			</Section>

			<Section title='Results'>
				<MacroDonutChart targets={targets} />
				<View style={styles.divider} />
				<KeyValue label='Kcal/day' value={targets.kcalPerDay} />
				<KeyValue label='Carbs' value={`${targets.carbsGrams} g`} />
				<KeyValue label='Fats' value={`${targets.fatsGrams} g`} />
				<KeyValue label='Proteins' value={`${targets.proteinsGrams} g`} />
				<View style={styles.divider} />
				<KeyValue label='LBM' value={`${user.lbm.lbmKg} kg`} />
				<KeyValue label='Body fat' value={`${user.lbm.bodyFatPercentage}%`} />
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
	title: {
		fontSize: 28,
		fontWeight: '800',
		textAlign: 'center',
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
