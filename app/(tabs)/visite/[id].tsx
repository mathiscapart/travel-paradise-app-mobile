import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import visites from "@/assets/data/visites.json";
import reservations from "@/assets/data/reservations.json";
import {User} from "@/services/authService";
import PrimaryButton from "@/components/PrimaryButton";
import { useRouter } from "expo-router";

export default function VisitDetail() {
    const { id } = useLocalSearchParams();
    const visit = visites.find((v) => v.id === Number(id));
    const reservation = reservations.find((r) => r.visit_id === Number(id));
    const router = useRouter();

    const handlePress = () => {
        router.push({
            pathname: "/"
        });
    };

    if (!visit || !reservation) {
        return <Text>Visite introuvable</Text>;
    }

    const isUserPresent = (user: User) => {
        return reservation.present_user.some((u) => u.id === user.id);
    };

    const styles = StyleSheet.create({
        title: {
            color: "#4353FE",
            fontSize: 18,
        },
        text: {
            fontFamily: "BeVietnam-Regular",
            margin: 3,
            color: "#161D53",
        },
        header: {
            fontWeight: "600",
            color: "#161D53",
            fontSize: 24,
        },
        number: {
            fontWeight: "600",
            marginLeft: 3,
            color: "#161D53",
            fontSize: 35,
        },
        section: {
            flex: 1,
            justifyContent: "flex-start",
            padding: 20,
            paddingTop: 5,
            backgroundColor: "#FFFFFF",
        },
        userRow: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: 10,
            borderBottomColor: "#E0E0E0",
            borderBottomWidth: 1,
        },
        userInfo: {
            flexDirection: "column",
        },
        userName: {
            fontWeight: "600",
            color: "#161D53",
        },
        userSurname: {
            color: "#888",
        },
        iconRow: {
            flexDirection: "row",
            gap: 10,
        },
    });

    return (
        <View style={styles.section}>
            <PrimaryButton title={"Back to the visite"} maxWidth={150} onPress={handlePress}></PrimaryButton>
            <Text style={[styles.text, styles.title]}>
                {visit.town}, {visit.country}
            </Text>
            <Text style={[styles.text, styles.header]}>{visit.name}</Text>
            <Text style={styles.text}>Secret Number</Text>
            <Text style={styles.number}>{reservation.secret_number}</Text>
            <Text style={styles.text}>{visit.address}</Text>
            <Text style={styles.text}>Durée : {visit.duration} min</Text>

            <View style={[styles.userRow, { marginTop: 10 }]}>
                <Text style={[styles.text]}>Name</Text>
                <Text style={[styles.text]}>Presence</Text>
            </View>
            {reservation.registered_user.map((user: User, index) => {
                const present = isUserPresent(user);
                return (
                    <View key={index} style={styles.userRow}>
                        <View style={styles.userInfo}>
                            <Text style={styles.userName}>{user.firstName}</Text>
                            <Text style={styles.userSurname}>{user.lastName}</Text>
                        </View>
                        <View style={styles.iconRow}>
                            <Ionicons
                                name="checkmark-circle"
                                size={24}
                                color={present ? "green" : "#D3FFD3"}
                            />
                            <Ionicons
                                name="close-circle"
                                size={24}
                                color={present ? "#FFD3D3" : "red"}
                            />
                        </View>
                    </View>
                );
            })}
        </View>
    );
}
