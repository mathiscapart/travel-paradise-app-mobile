import {StyleSheet, TextInput, View} from "react-native";
import PrimaryButton from "@/components/PrimaryButton";
import Logo from "@/components/Logo";
import {Image} from "expo-image";

export default function Login() {
    return (
        <View style={styles.container}>
            <Image
                style={styles.backgroundImage}
                onError={() => console.log('Image failed to load')}
                source={require('@/assets/images/background-travel.png')}
            />
            <View style={styles.content}>
                <View style={styles.logoSection}>
                    <Logo />
                </View>
                <View style={styles.formSection}>
                    <TextInput
                        placeholderTextColor='#161D53'
                        placeholder="Email"
                        style={styles.input}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    <TextInput
                        placeholderTextColor='#161D53'
                        placeholder="Password"
                        style={styles.input}
                        secureTextEntry={true}
                        autoCapitalize="none"
                    />
                    <PrimaryButton title="Log in" maxWidth="30%" />
                </View>
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
        height: '90%',
        resizeMode: 'cover',
        zIndex: -1,
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
        zIndex: 1,
    },
    logoSection: {
        flex: 0.4,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingTop: 10,
    },
    formSection: {
        flex: 0.4,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 10,
    },
    input: {
        width: "80%",
        borderRadius: 10,
        color: '#161D53',
        backgroundColor: '#e7e4e4',
        fontFamily: "BeVietnam-Regular",
        borderColor: "#000000",
        fontSize: 16,
        paddingHorizontal: 20,
        paddingVertical: 15,
        marginBottom: 20,
    }
});
