import PrimaryButton from "@/components/PrimaryButton";
import {Text, View, StyleSheet} from "react-native";
import { useRouter } from "expo-router";


type Card = {
    title: string
    subtitle: string
    date: string
    visitId: number
}

function Card ({title, subtitle, date, visitId }: Card){
    const styles = StyleSheet.create({
        card:{
            backgroundColor: 'white',
            borderRadius: 15,
            shadowColor: 'black',
            shadowOffset: {
                width: 0,
                height: 4,
            },
            padding: 10,
            shadowOpacity: 0.3,
            shadowRadius: 6,
            elevation: 14,
            width: "80%",
            height: 200,
            marginBottom: 20,
            justifyContent: 'center',
            alignItems: "flex-start"
        },
        divtext:{
            alignContent: "space-around"
        },
        text:{
            fontFamily: '²',
            margin: 5,
        },
        header:{
            color: "#161D53",
            fontSize: 24
        },
        title:{
            color: "#4353FE",
            fontSize: 18
        },
        date:{
            fontSize: 12,
            color: "rgba(22,29,83,0.3)",
            marginBottom: 10
        }
    })

    const router = useRouter();

    const handlePress = () => {
        router.push({
            pathname: "/visite/[id]",
            params: { id: visitId.toString() },
        });
    };

    return(
            <View style={styles.card}>
                <View style={styles.divtext}>
                    <Text style={[styles.header, styles.text]}>{title}</Text>
                    <Text style={[styles.title, styles.text]}>{subtitle}</Text>
                    <Text style={[styles.date, styles.text]}>{date}</Text>
                </View>
                <PrimaryButton title="See more" maxWidth={100} onPress={handlePress}></PrimaryButton>
            </View>
    )
}

export default Card;
