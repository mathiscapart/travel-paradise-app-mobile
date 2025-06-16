import {useAuth} from "@/hooks/useAuth";
import {useRouter} from "expo-router";
import {Alert, Text, View} from "react-native";
import {useEffect, useState} from "react";

export default function Logout() {
    const { logout } = useAuth();
    const router = useRouter();
    const [, setIsLoading] = useState(false);

    const handleLogout = async () => {
        try{
            setIsLoading(true);
            await logout();
            router.replace('/');
        } catch (error) {
            console.error('Erreur de connexion:', error);

            const errorMessage = error instanceof Error ? error.message : 'Erreur de connexion';

            Alert.alert(
                'Erreur de connexion',
                errorMessage,
                [{ text: 'OK' }]
            );
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        handleLogout().catch(console.error);
    },);

    return(
        <>
            <View>
                <Text>Logout</Text>
            </View>
        </>
    )
}
