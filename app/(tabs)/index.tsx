import {StyleSheet, Text, View, ScrollView} from 'react-native';
import Card from "@/components/Card";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
        <ScrollView  style={styles.container_card}>
            <Text style={styles.text}>Your next visits</Text>
            <Card subtitle={"Paris, France"} title={"Visit of Tour Eiffeil"} date={"20 avril 2004"}></Card>
            <Card subtitle={"Paris, France"} title={"Visit of Tour Eiffeil"} date={"20 avril 2004"}></Card>
            <Card subtitle={"Paris, France"} title={"Visit of Tour Eiffeil"} date={"20 avril 2004"}></Card>
            <Card subtitle={"Paris, France"} title={"Visit of Tour Eiffeil"} date={"20 avril 2004"}></Card>
            <Card subtitle={"Paris, France"} title={"Visit of Tour Eiffeil"} date={"20 avril 2004"}></Card>
            <Card subtitle={"Paris, France"} title={"Visit of Tour Eiffeil"} date={"20 avril 2004"}></Card>
            <Card subtitle={"Paris, France"} title={"Visit of Tour Eiffeil"} date={"20 avril 2004"}></Card>
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
