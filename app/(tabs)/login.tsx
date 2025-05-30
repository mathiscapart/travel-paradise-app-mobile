import {StyleSheet, View} from "react-native";
import Logo from "@/components/Logo";

export default function Login() {
    const styles = StyleSheet.create({
        container: {
            display: 'flex'
        }
    })

    return (
        <View style={styles.container}>
            <Logo></Logo>
        </View>
    );
}
