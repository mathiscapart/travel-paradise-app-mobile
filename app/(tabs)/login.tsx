import {StyleSheet, View} from "react-native";
import PrimaryButton from "@/components/PrimaryButton";
import Logo from "@/components/Logo";
import {Image} from "expo-image";

export default function Login() {
    return (
        <View style={styles.container}>
            {/* Image d'arrière-plan - N'affecte pas la disposition */}
            <Image
                style={styles.backgroundImage}
                onError={() => console.log('Image failed to load')}
                source={require('@/assets/images/background-travel.png')}
            />

            {/* Contenu principal par-dessus l'arrière-plan */}
            <View style={styles.content}>
                <Logo />
                <PrimaryButton title="Login in" maxWidth="30%" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
    backgroundImage: {
        position: 'absolute',
        top: '10%',
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '90%', // Prend 50% de l'écran
        resizeMode: 'cover',
        zIndex: -1, // Derrière tous les autres éléments
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        zIndex: 1, // Au-dessus de l'arrière-plan
    }
});
