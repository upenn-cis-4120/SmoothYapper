import { SafeAreaView, ScrollView, StyleSheet, Text, View, TouchableOpacity, Touchable } from "react-native";
import { useLocalSearchParams, router } from "expo-router";

const { ColorsPalette } = require("@/constants/colors.tsx");
import Logger from "@/components/Logger";

export default function Improvement() {
    const { sentence } = useLocalSearchParams();
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Improvement</Text>
            <Text style={styles.secondLevelTitle}>Expression to be Improved:</Text>
            {/* <Text style={styles.sentencesToBeImproved}>{sentence}</Text> */}
            <Text style={styles.sentencesToBeImproved}>{"Sick. I'm going to Europe for winter break. I hope to eat a lot of European food."}</Text>
            <Text style={styles.SuggestionHeader}>Suggestions from AI:</Text>
            <ScrollView style={styles.SuggestionContainer}>
                <Text style={styles.suggestionTitle}>1. Add excitement:</Text>
                <Text style={styles.suggestionContent}>Adding enthusiasm with phrases like “That’s awesome!” and “Can’t wait” conveys genuine excitement, which helps build rapport in small talk. This makes the sentence feel more engaging and inviting for further conversation.</Text>
                <Text style={styles.suggestionTitle}>2. Make it more conversational</Text>
                <Text style={styles.suggestionContent}>Phrases like “Cool, right?” and “I’m really looking forward to…” make the tone sound more conversational and friendly, which encourages a natural flow in small talk. Using “local dishes” instead of “European food” shows curiosity and specificity.</Text>
                <Text style={styles.suggestionTitle}>3. Specify or personalize</Text>
                <Text style={styles.suggestionContent}>Adding specific foods and places (e.g., “pasta in Italy” or “croissants in France”) makes the sentence more vivid and personal. This invites the listener to ask follow-up questions like, “Are you visiting Italy and France?” or “Do you have a favorite dish in mind?”</Text>
                <Text style={styles.suggestionTitle}>4. Reduce redundancy</Text>
                <Text style={styles.suggestionContent}>The original sentence repeats “Europe” and “European food,” which can feel redundant. This version is more concise while keeping the casual tone. The phrase “dive into the food scene” adds personality and expresses excitement in a fresh way.</Text>
            </ScrollView>
            <View style={styles.bottomBar}>
                <TouchableOpacity style={styles.bottoms} onPress={() => {
                    Logger.info("Try Again button pressed");
                    router.replace({
                        pathname: "/(tabs)/practiceSelection",
                        params: {
                            scenario: "Social",
                        }
                    });
                }}>
                    <Text style={styles.buttonFonts}>Try Again</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottoms} onPress={() => {
                    Logger.info("Home button pressed");
                    router.replace({
                        pathname: "/(tabs)",
                    });
                }}>
                    <Text  style={styles.buttonFonts}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottoms} onPress={() => {
                    Logger.info("Return to Transcripts button pressed");
                    router.replace({
                        pathname: "/(tabs)/transcripts",
                    });                     
                }}>
                    <Text  style={styles.buttonFonts}>Return</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ColorsPalette.FullWhite,
        borderRadius: 8,
        alignItems: 'center',
    },
    bottomBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
    bottoms: {
        borderWidth: 1,
        borderColor: ColorsPalette.PrimaryColorLight,
        fontFamily: "NunitoSans_10pt-Black",
        fontWeight: 800,
        borderRadius: 8,
        margin: 8,
        padding: 8,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: ColorsPalette.PrimaryColorLight,
        fontFamily: "NunitoSans_10pt-Black",
        padding: 10,
    },
    secondLevelTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: ColorsPalette.PrimaryColorLight,
    }, 
    SuggestionContainer: {
        backgroundColor: ColorsPalette.NeutralColorLight,
        padding: 16,
        margin: 16,
        borderRadius: 8,
        width: "90%",
    },
    SuggestionHeader: {
        fontSize: 16,
        fontWeight: "bold",
        color: ColorsPalette.PrimaryColorLight,
    },
    sentencesToBeImproved: {
        fontSize: 16,
        color: ColorsPalette.SecondaryColorDeep,
        fontFamily: "NunitoSans_10pt-Bold",
        padding: 10,
        width: "90%",
    },
    suggestionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: ColorsPalette.PrimaryColorLight,
        paddingBottom: 5,
    },
    suggestionContent: {
        fontSize: 16,
        color: ColorsPalette.NeutralColorDeep,
        paddingVertical: 10,
    },
    buttonFonts: {
        fontFamily: "NunitoSans_10pt-Black",
        fontWeight: 900,
        color: ColorsPalette.PrimaryColorLight,
    },

});