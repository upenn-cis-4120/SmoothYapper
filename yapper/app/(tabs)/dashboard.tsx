import React from "react";
import { SafeAreaView, StyleSheet, Text, Image, View } from "react-native";

import { ColorsPalette } from "@/constants/colors";

interface ScenarioScore {
    title: string;
    score: number;
    maxScore: number; // Maximum score for calculating the bar width
}

const data: ScenarioScore[] = [
    { title: "Academic", score: 5210, maxScore: 6000 },
    { title: "Sports", score: 2333, maxScore: 6000 },
    { title: "Social", score: 4210, maxScore: 6000 },
];

const ProgressBar = ({ score, maxScore }: { score: number; maxScore: number }) => {
    const progress = (score / maxScore) * 100; // Calculate progress as a percentage

    return (
        <View style={styles.progressBarContainer}>
            <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
        </View>
    );
};

export default function Dashboard() {
    return (
        <SafeAreaView style={styles.container}>
            {/* Header Title */}
            <Text style={styles.title}>Statistics</Text>
            
            {/* Logo Section */}
            <View style={styles.logoWrapper}>
                <Image source={require("@/assets/images/logo.png")} style={styles.logo} />
            </View>

            {/* Learning Time */}
            <View style={styles.blockWrapper}>
                <Text style={styles.key}>Learning Time</Text>
                <Text style={styles.value}>51H 42M</Text>
            </View>

            {/* Practice Points */}
            <View style={styles.blockWrapper}>
                <Text style={styles.key}>Free Practice Points</Text>
                <Text style={styles.value}>4210</Text>
            </View>

            {/* Scenario Scores */}
            <View style={styles.blockWrapper}>
                <Text style={styles.key}>Scenario Scores</Text>
                {data.map((item, index) => (
                    <View key={index} style={styles.scoreContainer}>
                        <Text style={styles.scoreTitle}>{item.title}</Text>
                        <ProgressBar score={item.score} maxScore={item.maxScore} />
                        <Text style={styles.scoreValue}>{item.score}</Text>
                    </View>
                ))}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ColorsPalette.FullWhite,
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#001F54",
        textAlign: "center",
        marginBottom: 20,
        marginTop: 10,
        fontFamily: "NunitoSans_10pt-Black",
    },
    logoWrapper: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        marginBottom: 40,
    },
    logo: {
        width: 128,
        height: 128,
        resizeMode: "contain",
    },
    blockWrapper: {
        backgroundColor: "#E5E5E5",
        padding: 16,
        borderRadius: 10,
        marginBottom: 24,
        marginHorizontal: 16,
    },
    key: {
        fontSize: 18,
        fontWeight: "600",
        color: "#001F54",
        marginBottom: 10,
        fontFamily: "NunitoSans_10pt-Black",
    },
    value: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#FFA500",
        fontFamily: "NunitoSans_10pt-Black",
    },
    scoreContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 8,
    },
    scoreTitle: {
        flex: 1,
        fontSize: 16,
        fontWeight: "600",
        color: "#001F54",
        fontFamily: "NunitoSans_10pt-Regular",
    },
    progressBarContainer: {
        flex: 2,
        height: 10,
        backgroundColor: "#D0D0D0",
        borderRadius: 5,
        overflow: "hidden",
        marginHorizontal: 8,
    },
    progressBarFill: {
        height: "100%",
        backgroundColor: ColorsPalette.SecondaryColorDeep,
    },
    scoreValue: {
        fontSize: 16,
        fontWeight: "bold",
        color: ColorsPalette.SecondaryColorDeep,
    },
});
