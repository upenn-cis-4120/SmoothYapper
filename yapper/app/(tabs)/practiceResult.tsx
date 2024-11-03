import { MaterialIcons } from "@expo/vector-icons";
import { View, Text, TouchableOpacity, StyleSheet} from "react-native";
import { useLocalSearchParams, router } from "expo-router";

const { ColorsPalette } = require("@/constants/colors.tsx");
import RatingDisplay from '@/components/StarRating';

export default function PracticeResult() {

    const { modelData, practiceResultData, sampleMessageData } = useLocalSearchParams();
    console.log(`Model Data: ${modelData}`);
    console.log(`Practice Result Data: ${practiceResultData}`);
    console.log(`Sample Message Data: ${sampleMessageData}`);
    const parsedModel = JSON.parse(decodeURIComponent(typeof modelData === "string" ? modelData : modelData[0]));
    const parsedPracticeResult = JSON.parse(decodeURIComponent(typeof practiceResultData === "string" ? practiceResultData : practiceResultData[0]));
    console.log(parsedPracticeResult);
    const messages = JSON.parse(decodeURIComponent(typeof sampleMessageData === "string" ? sampleMessageData : sampleMessageData[0]));
    console.log(messages);
    return (
        <View style={styles.feedbackContainer}>
            <Text style={styles.feedbackTitle}>FEEDBACK</Text>
            <View style={styles.feedbackStars}>
                <MaterialIcons name="star" size={40} color={ColorsPalette.PrimaryColorLight} />
                <MaterialIcons name="star" size={40} color={ColorsPalette.PrimaryColorLight} />
                <MaterialIcons name="star-border" size={40} color={ColorsPalette.PrimaryColorLight} />
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
                    router.replace({
                        pathname: "/(tabs)/transcripts",
                        params: {
                            transcriptsData: encodeURIComponent(JSON.stringify(messages)),
                        }
                    })
                }}>
                    <Text> View Transcripts</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.feedbackButtons}>
                    <Text> Try Again</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.feedbackButtons}>
                    <Text> Home</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    feedbackContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    feedbackTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: ColorsPalette.PrimaryColorLight,
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
        fontSize: 16,
        fontWeight: "bold",
        color: ColorsPalette.PrimaryColorLight,
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
        fontSize: 16,
        fontWeight: "bold",
        color: ColorsPalette.PrimaryColorLight,
    },
    overallPointValue: {
        fontSize: 16,
        fontWeight: "bold",
        color: ColorsPalette.SecondaryColorDeep,
    },
    overallPointContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    
});