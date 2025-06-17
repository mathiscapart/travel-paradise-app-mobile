import {StyleSheet, Text, View, ScrollView} from 'react-native';
import Card from "@/components/Card";
import visites from "@/assets/data/visites.json";
import reservations from "@/assets/data/reservations.json";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
        <ScrollView  style={styles.container_card}>
            <Text style={styles.text}>Your next visits</Text>
            {reservations.map((res) => {
                const visit = visites.find((v) => v.id === res.visit_id);

                return (
                    <Card
                        key={res.id}
                        title={visit ? visit.name : `Reservation #${res.id}`}
                        subtitle={`Start: ${new Date(res.start_date).toLocaleString()}`}
                        date={`Visitors: ${res.attendance}/${res.max_visitor} ${res.is_finished ? '(Finished)' : ''}`}
                        visitId={res.id}
                    />
                );
            })}
        </ScrollView>
     </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff',
      flexDirection: "column",
      justifyContent: 'flex-start',
  },
    container_card: {
        flex: 1,
        paddingLeft: "10%",
        backgroundColor: '#fff',
        flexDirection: "column",
    },
    text: {
      color: "#161D53",
      fontSize: 32,
      fontFamily: 'BeVietnam-Regular',
        padding: 10,
    }
});
