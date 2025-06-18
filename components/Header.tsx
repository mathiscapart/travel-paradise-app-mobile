import { StyleSheet, View, TouchableOpacity, Modal, Text, Pressable, Dimensions } from "react-native";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "expo-router";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Logo from "@/components/Logo";
import {useAuth} from "@/hooks/useAuth";

type RouteNames = "/" | "/login" | "/logout" | "/profil" | "/dashboard";

const getResponsiveDimensions = () => {
    const { width, height } = Dimensions.get('window');
    const isTablet = width >= 768;
    const isLargePhone = width >= 414;
    const isSmallPhone = width < 375;

    return {
        screenWidth: width,
        screenHeight: height,
        isTablet,
        isLargePhone,
        isSmallPhone,
        headerPadding: isTablet ? 25 : isLargePhone ? 20 : 15,
        burgerSize: isTablet ? 32 : isSmallPhone ? 24 : 28,
        fontSize: isTablet ? 28 : isLargePhone ? 26 : 24,
        menuItemPadding: isTablet ? 25 : 20,
    };
};

function Header() {
    const [menuVisible, setMenuVisible] = useState(false);
    const [dimensions, setDimensions] = useState(getResponsiveDimensions());
    const router = useRouter();
    const pathname = usePathname();
    const insets = useSafeAreaInsets();
    const { isAuthenticated } = useAuth();


    useEffect(() => {
        const subscription = Dimensions.addEventListener('change', () => {
            setDimensions(getResponsiveDimensions());
        });

        return () => subscription?.remove();
    }, []);

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

    const dynamicStyles = StyleSheet.create({
        container: {
            ...styles.container,
            paddingTop: insets.top + 10,
            paddingHorizontal: dimensions.headerPadding,
            paddingBottom: dimensions.isTablet ? 25 : 20,
        },
        burgerIcon: {
            ...styles.burgerIcon,
            width: dimensions.burgerSize,
            height: dimensions.burgerSize * 0.7,
            marginRight: dimensions.isTablet ? "35%" : "40%",
        },
        burgerLine: {
            ...styles.burgerLine,
            height: dimensions.isSmallPhone ? 2.5 : 3,
        },
        menuHeader: {
            ...styles.menuHeader,
            paddingTop: insets.top + 20,
            paddingHorizontal: dimensions.headerPadding,
        },
        closeIcon: {
            ...styles.closeIcon,
            width: dimensions.burgerSize,
            height: dimensions.burgerSize,
        },
        closeLine: {
            width: dimensions.burgerSize,
            height: dimensions.isSmallPhone ? 2.5 : 3,
        },
        menuContent: {
            ...styles.menuContent,
            paddingHorizontal: dimensions.headerPadding,
            paddingTop: dimensions.isTablet ? 60 : 40,
        },
        menuItem: {
            ...styles.menuItem,
            paddingVertical: dimensions.menuItemPadding,
            ...(dimensions.isTablet && {
                alignSelf: 'center',
                width: '60%',
                maxWidth: 400,
            }),
        },
        menuItemText: {
            ...styles.menuItemText,
            fontSize: dimensions.fontSize,
            textAlign: dimensions.isTablet ? 'center' : 'left',
        },
    });

    return (
        <>
            <View style={dynamicStyles.container}>
                <TouchableOpacity
                    onPress={toggleMenu}
                    activeOpacity={0.7}
                    accessibilityLabel="Ouvrir le menu"
                    accessibilityRole="button"
                    style={styles.touchableArea}
                >
                    <View style={dynamicStyles.burgerIcon}>
                        <View style={dynamicStyles.burgerLine} />
                        <View style={dynamicStyles.burgerLine} />
                        <View style={dynamicStyles.burgerLine} />
                    </View>
                </TouchableOpacity>
                <Logo />
            </View>

            <Modal
                visible={menuVisible}
                animationType="fade"
                transparent={false}
                onRequestClose={toggleMenu}
                statusBarTranslucent={true}
            >
                <View style={styles.fullScreenMenu}>
                    <View style={dynamicStyles.menuHeader}>
                        <TouchableOpacity
                            onPress={toggleMenu}
                            activeOpacity={0.7}
                            style={styles.closeButton}
                            accessibilityLabel="Fermer le menu"
                            accessibilityRole="button"
                        >
                            <View style={dynamicStyles.closeIcon}>
                                <View style={[styles.closeLine1, dynamicStyles.closeLine]} />
                                <View style={[styles.closeLine2, dynamicStyles.closeLine]} />
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={dynamicStyles.menuContent}>
                        <Pressable
                            style={dynamicStyles.menuItem}
                            onPress={() => navigateTo("/")}
                            accessibilityLabel="Aller à l'accueil"
                        >
                            <Text style={[dynamicStyles.menuItemText, { color: getMenuItemColor("/") }]}>
                                Home
                            </Text>
                        </Pressable>
                        <Pressable
                            style={dynamicStyles.menuItem}
                            onPress={() => navigateTo("/profil")}
                            accessibilityLabel="Profil"
                        >
                            <Text style={[dynamicStyles.menuItemText, { color: getMenuItemColor("/profil") }]}>
                                Profil
                            </Text>
                        </Pressable>
                        <Pressable
                            style={dynamicStyles.menuItem}
                            onPress={() => navigateTo("/dashboard")}
                            accessibilityLabel="Dashboard"
                        >
                            <Text style={[dynamicStyles.menuItemText, { color: getMenuItemColor("/dashboard") }]}>
                                Dashboard
                            </Text>
                        </Pressable>
                        {isAuthenticated ? <Pressable
                            style={dynamicStyles.menuItem}
                            onPress={() => navigateTo("/logout")}
                            accessibilityLabel="Se déconnecter"
                        >
                            <Text style={[dynamicStyles.menuItemText]}>
                                Logout
                            </Text>
                        </Pressable> : <Pressable
                            style={dynamicStyles.menuItem}
                            onPress={() => navigateTo("/login")}
                            accessibilityLabel="Se connecter"
                        >
                            <Text style={[dynamicStyles.menuItemText, { color: getMenuItemColor("/login") }]}>
                                Login
                            </Text>
                        </Pressable>}

                    </View>
                </View>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        width: "100%",
        backgroundColor: "#FFFFFF",
    },
    touchableArea: {
        padding: 8,
    },
    burgerIcon: {
        justifyContent: "space-between",
    },
    burgerLine: {
        width: "100%",
        borderRadius: 1.5,
        backgroundColor: "#161D53"
    },
    fullScreenMenu: {
        flex: 1,
        backgroundColor: '#161D53',
    },
    menuHeader: {
        alignItems: 'flex-end',
    },
    closeButton: {
        padding: 12, // Zone de touch plus grande
    },
    closeIcon: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeLine1: {
        position: 'absolute',
        backgroundColor: '#FFFFFF',
        borderRadius: 1.5,
        transform: [{ rotate: '45deg' }],
    },
    closeLine2: {
        position: 'absolute',
        backgroundColor: '#FFFFFF',
        borderRadius: 1.5,
        transform: [{ rotate: '-45deg' }],
    },
    menuContent: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    menuItem: {
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.2)',
        width: '100%',
    },
    menuItemText: {
        fontWeight: '500',
        color: '#FFFFFF',
    },
});

export default Header;
