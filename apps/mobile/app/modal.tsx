import FontAwesome from '@expo/vector-icons/FontAwesome'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'

import { LANGUAGES, useI18n } from '@/src/i18n'

export default function SettingsModalScreen() {
	const { t, preference, setPreference } = useI18n()

	return (
		<ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps='handled'>
			<Text style={styles.title}>{t('settings.title')}</Text>

			<View style={styles.card}>
				<Text style={styles.sectionTitle}>{t('settings.language')}</Text>

				<LanguageRow label={t('settings.system')} selected={preference === 'system'} onPress={() => setPreference('system')} />

				<View style={styles.divider} />

				{LANGUAGES.map((lng) => (
					<LanguageRow
						key={lng.code}
						label={`${lng.nativeName} — ${lng.englishName}`}
						selected={preference === lng.code}
						onPress={() => setPreference(lng.code)}
					/>
				))}
			</View>
		</ScrollView>
	)
}

function LanguageRow({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) {
	return (
		<Pressable onPress={onPress} style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}>
			<Text style={styles.rowLabel}>{label}</Text>
			{selected ? <FontAwesome name='check' size={16} color='#111827' /> : <View style={styles.checkSpacer} />}
		</Pressable>
	)
}

const styles = StyleSheet.create({
	container: {
		padding: 16,
		paddingBottom: 32,
	},
	title: {
		fontSize: 22,
		fontWeight: '800',
		marginBottom: 12,
	},
	card: {
		borderWidth: StyleSheet.hairlineWidth,
		borderColor: '#e5e7eb',
		borderRadius: 12,
		padding: 12,
		backgroundColor: '#fff',
	},
	sectionTitle: {
		fontSize: 14,
		fontWeight: '800',
		marginBottom: 8,
		color: '#111827',
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingVertical: 10,
		gap: 10,
	},
	rowPressed: {
		opacity: 0.65,
	},
	rowLabel: {
		fontSize: 14,
		fontWeight: '700',
		color: '#111827',
		flexShrink: 1,
	},
	checkSpacer: {
		width: 16,
		height: 16,
	},
	divider: {
		height: 1,
		backgroundColor: '#e5e7eb',
		marginVertical: 10,
	},
})
