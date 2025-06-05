import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { AuthProvider } from '@/hooks/useAuth';

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [loaded] = useFonts({
        'BeVietnam-Regular': require('../assets/fonts/BeVietnamPro/BeVietnamPro-Regular.ttf'),
    });

    if (!loaded) {
        return null;
    }

    return (
        <SafeAreaProvider>
            <AuthProvider>
                <ThemeProvider value={colorScheme === 'light' ? DarkTheme : DefaultTheme}>
                    <Stack screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                        <Stack.Screen name="login" options={{ headerShown: false }} />
                        <Stack.Screen name="+not-found" />
                    </Stack>

                    <StatusBar style="auto" />
                </ThemeProvider>
            </AuthProvider>
        </SafeAreaProvider>
    );
}
