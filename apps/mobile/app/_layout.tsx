import FontAwesome from '@expo/vector-icons/FontAwesome'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import 'react-native-reanimated'

import { initUserAttributesPersistence, type KeyValueStorage } from '@macronutrients/core'

import { useColorScheme } from '@/components/useColorScheme'
import { I18nProvider, useI18n } from '@/src/i18n'

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from 'expo-router'

export const unstable_settings = {
	// Ensure that reloading on `/modal` keeps a back button present.
	initialRouteName: 'index',
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
	const [loaded, error] = useFonts({
		SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
		...FontAwesome.font,
	})

	// Expo Router uses Error Boundaries to catch errors in the navigation tree.
	useEffect(() => {
		if (error) throw error
	}, [error])

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync()
		}
	}, [loaded])

	if (!loaded) {
		return null
	}

	return (
		<I18nProvider>
			<RootLayoutNav />
		</I18nProvider>
	)
}

function RootLayoutNav() {
	const colorScheme = useColorScheme()
	const { t } = useI18n()

	useEffect(() => {
		const storage: KeyValueStorage = {
			getItem: AsyncStorage.getItem,
			setItem: AsyncStorage.setItem,
			removeItem: AsyncStorage.removeItem,
		}

		let dispose: (() => void) | undefined
		void (async () => {
			dispose = await initUserAttributesPersistence({ storage })
		})()

		return () => {
			dispose?.()
		}
	}, [])

	return (
		<ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
			<Stack>
				<Stack.Screen name='index' options={{ headerShown: false }} />
				<Stack.Screen name='modal' options={{ presentation: 'modal', title: t('settings.title') }} />
			</Stack>
		</ThemeProvider>
	)
}
