import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import visites from "@/assets/data/visites.json";

export default function VisitDetail() {
    const { id } = useLocalSearchParams();
    const visit = visites.find((v) => v.id === Number(id));

    if (!visit) {
        return <Text>Visite introuvable</Text>;
    }

    return (
        <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 24 }}>{visit.name}</Text>
            <Text>{visit.town}, {visit.country}</Text>
            <Text>{visit.address}</Text>
            <Text>Durée : {visit.duration} min</Text>
            <Text>Prix : {visit.price} €</Text>
        </View>
    );
}
