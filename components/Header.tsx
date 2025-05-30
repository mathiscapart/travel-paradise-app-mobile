import { StyleSheet, View, TouchableOpacity, Modal, Text, Pressable } from "react-native";
import { useState } from "react";
import { useNavigation } from "expo-router";
import Logo from "@/components/Logo";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

function Header() {
    const [menuVisible, setMenuVisible] = useState(false);
    const navigation = useNavigation();
    const colorScheme = 'light';

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const navigateTo = (screen) => {
        navigation.navigate(screen);
        setMenuVisible(false); // Close menu after navigation
    };

    const styles = StyleSheet.create({
        container: {
            display: "flex",
            flexDirection: "row-reverse",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            backgroundColor: Colors[colorScheme ?? "light"].background,
            paddingTop: 10,
            paddingHorizontal: 15,
        },
        spacer: {
            height: 30,
            marginBottom: 20,
        },
        burgerIcon: {
            width: 28,
            height: 20,
            justifyContent: "space-between",
        },
        burgerLine: {
            width: "100%",
            height: 3,
            backgroundColor: Colors[colorScheme ?? "light"].tint,
            borderRadius: 1.5,
        },
        menuContainer: {
            flex: 1,
            backgroundColor: Colors[colorScheme ?? "light"].background,
            paddingTop: 60,
            paddingHorizontal: 20,
        },
        menuItem: {
            paddingVertical: 15,
            borderBottomWidth: 1,
            borderBottomColor: Colors[colorScheme ?? "light"].tint,
        },
        menuItemText: {
            fontSize: 18,
            color: Colors[colorScheme ?? "light"].text,
        },
    });

    return (
        <>
            <View style={styles.container}>
                <Logo />
                <TouchableOpacity onPress={toggleMenu}>
                    <View style={styles.burgerIcon}>
                        <View style={styles.burgerLine} />
                        <View style={styles.burgerLine} />
                        <View style={styles.burgerLine} />
                    </View>
                </TouchableOpacity>
            </View>
            <Modal
                visible={menuVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={toggleMenu}
            >
                <View style={styles.menuContainer}>
                    <Pressable style={styles.menuItem} onPress={() => navigateTo("index")}>
                        <Text style={styles.menuItemText}>Home</Text>
                    </Pressable>
                    <Pressable style={styles.menuItem} onPress={() => navigateTo("explore")}>
                        <Text style={styles.menuItemText}>Explore</Text>
                    </Pressable>
                    <Pressable style={styles.menuItem} onPress={() => navigateTo("login")}>
                        <Text style={styles.menuItemText}>Login</Text>
                    </Pressable>
                    <Pressable style={styles.menuItem} onPress={toggleMenu}>
                        <Text style={styles.menuItemText}>Close</Text>
                    </Pressable>
                </View>
            </Modal>
            <View style={styles.spacer} />
        </>
    );
}

export default Header;
