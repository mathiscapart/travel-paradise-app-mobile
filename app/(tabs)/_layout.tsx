import { Stack } from 'expo-router';
import React from 'react';

import Header from "@/components/Header";

export default function RootLayout() {
    return (
        <>
            <Header />
            <Stack
                screenOptions={{
                    headerShown: false, // On cache les headers par défaut car on a notre Header custom
                }}
            >
                <Stack.Screen
                    name="index"
                    options={{
                        title: 'Home',
                    }}
                />
                <Stack.Screen
                    name="explore"
                    options={{
                        title: 'Explore',
                    }}
                />
                <Stack.Screen
                    name="login"
                    options={{
                        title: 'Login',
                    }}
                />
            </Stack>
        </>
    );
}
