import { View, Text, Dimensions, ScrollView, StyleSheet } from 'react-native';
import { BarChart, LineChart } from 'react-native-chart-kit';
import reservations from "@/assets/data/reservations.json";

const screenWidth = Dimensions.get('window').width;

const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    fillShadowGradient: "#8A4DFF",
    fillShadowGradientOpacity: 1,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(67, 83, 254, ${opacity})`,
    labelColor: () => "#161D53",
    propsForDots: {
        r: "4",
        strokeWidth: "1",
        stroke: "#8A4DFF"
    }
};

export default function Dashboard() {
    const lastVisits = [...reservations]
        .filter(r => r.is_finished)
        .sort((a, b) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime())
        .slice(0, 5);

    const barData = {
        labels: lastVisits.length > 0 ? lastVisits.map((v, i) => (i + 1).toString()) : ['No Data'],
        datasets: [{ data: lastVisits.length > 0 ? lastVisits.map(v => v.notation ?? 0) : [0] }]
    };

    const allVisits = [...reservations].sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime());

    // CORRECTION: Structure correcte pour LineChart
    const lineData = {
        labels: allVisits.length > 0 ? allVisits.map((v, i) => (i + 1).toString()) : ['No Data'],
        datasets: [
            {
                data: allVisits.length > 0 ? allVisits.map(v => v.notation ?? 0) : [0],
                strokeWidth: 2,
            }
        ]
    };

    if (!reservations || reservations.length === 0) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <Text>No reservation data available</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Last visits</Text>
            <BarChart
                data={barData}
                yAxisSuffix=""
                yAxisLabel=""
                width={screenWidth - 32}
                height={220}
                fromZero
                chartConfig={chartConfig}
                style={styles.chart}
            />

            <Text style={styles.header}>Notation variation</Text>
            <LineChart
                data={lineData}
                width={screenWidth - 32}
                height={200}
                bezier
                chartConfig={chartConfig}
                style={styles.chart}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#FFFFFF"
    },
    chart: {
        marginVertical: 8,
        borderRadius: 16,
    },
    header: {
        fontSize: 18,
        fontWeight: '700',
        marginTop: 16,
        marginBottom: 8,
        color: "#161D53"
    },
});
