import { MaterialIcons } from "@expo/vector-icons";
import { View, Text, TouchableOpacity, StyleSheet} from "react-native";
import { useLocalSearchParams, router } from "expo-router";

const { ColorsPalette } = require("@/constants/colors.tsx");
import RatingDisplay from '@/components/StarRating';
import { useTabContext } from '@/contexts/TabContext';
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect } from "react";

import baseURI from "@/constants/host";

export default function PracticeResult() {

    const { modelData, practiceResultData, sessionId } = useLocalSearchParams();
    console.log(`Model Data: ${modelData}`);
    console.log(`Practice Result Data: ${practiceResultData}`);
    console.log(`Sample Message Data: ${sessionId}`);
    const parsedModel = JSON.parse(decodeURIComponent(typeof modelData === "string" ? modelData : modelData[0]));
    const parsedPracticeResult = JSON.parse(decodeURIComponent(typeof practiceResultData === "string" ? practiceResultData : practiceResultData[0]));
    console.log(parsedPracticeResult);

    // TODO: Receive the sessionId from the previous pactice page, fetching the practice conversaiton history and results.

    useEffect(() => {
        const getSessionHistory = async () => {
            const histotyResponse = await fetch(`${baseURI}/practice/${sessionId}`);
            const historyData = await histotyResponse.json();
            
        };
    }, [sessionId]);

    const { setPageAParams } = useTabContext();

    return (
        <SafeAreaView style={styles.feedbackContainer}>
            <Text style={styles.feedbackTitle}>FEEDBACK</Text>
            <View style={styles.feedbackStars}>
                <MaterialIcons name="star" size={64} color={ColorsPalette.SecondaryColorDeep} />
                <MaterialIcons name="star" size={64} color={ColorsPalette.SecondaryColorDeep} />
                <MaterialIcons name="star-border" size={64} color={ColorsPalette.SecondaryColorDeep} />
            </View>
            <Text style={styles.feedbackBreakdownTitle}>Breakdown</Text>
            <RatingDisplay 
                fluency={parsedPracticeResult.fluency}
                delivery={parsedPracticeResult.delivery}
                language={parsedPracticeResult.language}
                topic={parsedPracticeResult.topic} 
            />
            <View style={styles.overallPointContainer}>
                <Text style={styles.overallPointFonts}>Overall Points</Text>
                <Text style={styles.overallPointValue}>100</Text>
            </View>
            <View style={styles.feedbackButtonContainer}>
                <TouchableOpacity style={styles.feedbackButtons} onPress={ () => {
                    setPageAParams(messages);
                    router.replace({
                        pathname: "/(tabs)/transcripts",
                        params: {
                            transcriptsData: encodeURIComponent(JSON.stringify(messages)),
                        }
                    })
                }}>
                    <Text> View Transcripts</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.feedbackButtons} onPress={
                    () => {
                        router.replace({
                            pathname: "/(tabs)/practiceSelection",
                        });
                    }
                }>
                    <Text> Try Again</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.feedbackButtons} onPress={
                    () => {
                        router.replace({
                            pathname: "/(tabs)",
                        });
                    }
                }>
                    <Text> Home</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    feedbackContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    feedbackTitle: {
        fontSize: 36,
        fontWeight: "bold",
        color: ColorsPalette.PrimaryColorLight,
        padding: 10,
    },
    feedbackStars: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    feedbackBreakdown: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    feedbackBreakdownTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: ColorsPalette.PrimaryColorLight,
        padding: 10,
    },
    feedbackButtonContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    feedbackButtons: {
        borderWidth: 1,
        borderColor: ColorsPalette.PrimaryColorLight,
        borderRadius: 8,
        margin: 8,
        padding: 8,
    },
    overallPointFonts: {
        fontSize: 24,
        fontWeight: "bold",
        color: ColorsPalette.PrimaryColorLight,
    },
    overallPointValue: {
        fontSize: 24,
        fontWeight: "bold",
        color: ColorsPalette.SecondaryColorDeep,
    },
    overallPointContainer: {
        flexDirection: "row",
        width: "60%",
        // make it space between:
        justifyContent: "space-between",
        padding: 10,
    },
    
});