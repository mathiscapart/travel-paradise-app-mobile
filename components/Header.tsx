import { StyleSheet, View, TouchableOpacity, Modal, Text, Pressable } from "react-native";
import { useState } from "react";
import { useRouter, usePathname } from "expo-router";
import Logo from "@/components/Logo";

type RouteNames = "/" | "/explore" | "/login";

function Header() {
    const [menuVisible, setMenuVisible] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    if (pathname === '/login') {
        return null;
    }

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const navigateTo = (screen: RouteNames) => {
        router.push(screen);
        setMenuVisible(false);
    };

    const isCurrentPage = (route: RouteNames) => {
        return pathname === route;
    };

    const getMenuItemColor = (route: RouteNames) => {
        return isCurrentPage(route) ? '#8C52FF' : '#FFFFFF';
    };

    return (
        <>
            <View style={styles.container}>
                <Logo />
                <TouchableOpacity onPress={toggleMenu} activeOpacity={0.7}>
                    <View style={styles.burgerIcon}>
                        <View style={styles.burgerLine} />
                        <View style={styles.burgerLine} />
                        <View style={styles.burgerLine} />
                    </View>
                </TouchableOpacity>
            </View>

            <Modal
                visible={menuVisible}
                animationType="fade"
                transparent={false}
                onRequestClose={toggleMenu}
            >
                <View style={styles.fullScreenMenu}>
                      <View style={styles.menuHeader}>
                        <TouchableOpacity onPress={toggleMenu} activeOpacity={0.7} style={styles.closeButton}>
                            <View style={styles.closeIcon}>
                                <View style={styles.closeLine1} />
                                <View style={styles.closeLine2} />
                            </View>
                        </TouchableOpacity>
                    </View>

                    {/* Menu items */}
                    <View style={styles.menuContent}>
                        <Pressable style={styles.menuItem} onPress={() => navigateTo("/")}>
                            <Text style={[styles.menuItemText, { color: getMenuItemColor("/") }]}>Home</Text>
                        </Pressable>
                        <Pressable style={styles.menuItem} onPress={() => navigateTo("/explore")}>
                            <Text style={[styles.menuItemText, { color: getMenuItemColor("/explore") }]}>Explore</Text>
                        </Pressable>
                        <Pressable style={styles.menuItem} onPress={() => navigateTo("/login")}>
                            <Text style={[styles.menuItemText, { color: getMenuItemColor("/login") }]}>Login</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row-reverse",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        paddingTop: 10,
        paddingHorizontal: 15,
        backgroundColor: "#FFFFFF"
    },
    burgerIcon: {
        width: 28,
        height: 20,
        justifyContent: "space-between",
    },
    burgerLine: {
        width: "100%",
        height: 3,
        borderRadius: 1.5,
        backgroundColor: "#161D53"
    },
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    fullScreenMenu: {
        flex: 1,
        backgroundColor: '#161D53',
        paddingHorizontal: 20,
    },
    menuHeader: {
        paddingTop: 50,
        paddingBottom: 20,
        alignItems: 'flex-end',
    },
    closeButton: {
        padding: 10,
    },
    closeIcon: {
        width: 28,
        height: 28,
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeLine1: {
        position: 'absolute',
        width: 28,
        height: 3,
        backgroundColor: '#FFFFFF',
        borderRadius: 1.5,
        transform: [{ rotate: '45deg' }],
    },
    closeLine2: {
        position: 'absolute',
        width: 28,
        height: 3,
        backgroundColor: '#FFFFFF',
        borderRadius: 1.5,
        transform: [{ rotate: '-45deg' }],
    },
    menuContent: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingTop: 40,
    },
    menuContainer: {
        width: '80%',
        maxWidth: 300,
        borderRadius: 10,
        paddingVertical: 20,
        paddingHorizontal: 20,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    menuItem: {
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.2)',
        width: '100%',
    },
    menuItemText: {
        fontSize: 24,
        fontWeight: '500',
    },
});

export default Header;
