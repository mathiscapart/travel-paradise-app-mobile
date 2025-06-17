import { Stack } from 'expo-router';
import React from 'react';

import Header from "@/components/Header";
import {useAuth} from "@/hooks/useAuth";

export default function RootLayout() {
    const { isAuthenticated } = useAuth();

    return (
        <>
            <Header />
            <Stack
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Protected guard={isAuthenticated}>
                    <Stack.Screen
                        name="index"
                        options={{
                            title: 'Home',
                        }}
                    />
                    <Stack.Screen
                        name="profil"
                        options={{
                            title: 'Profil',
                        }}
                    />
                    <Stack.Screen
                        name="logout"
                        options={{
                            title: 'Logout',
                        }}
                    />
                    <Stack.Screen
                        name="visite/[id]"
                        options={{ title: 'Visit detail' }}
                    />
                </Stack.Protected>
                <Stack.Protected guard={!isAuthenticated}>
                    <Stack.Screen
                        name="login"
                        options={{
                            title: 'Login',
                        }}
                    />
                </Stack.Protected>
            </Stack>
        </>
    );
}
