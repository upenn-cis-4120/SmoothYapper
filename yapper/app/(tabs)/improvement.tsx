import { SafeAreaView, ScrollView, StyleSheet, Text, View, TouchableOpacity, Touchable } from "react-native";
import { useLocalSearchParams, router } from "expo-router";

const { ColorsPalette } = require("@/constants/colors.tsx");

export default function Improvement() {
    const { sentence } = useLocalSearchParams();
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Improvement</Text>
            <Text style={styles.secondLevelTitle}>Expression to be Improved:</Text>
            <Text style={styles.sentencesToBeImproved}>{sentence}</Text>
            <Text style={styles.SuggestionHeader}>Suggestions from AI:</Text>
            <ScrollView style={styles.SuggestionContainer}>
                <Text style={styles.suggestionTitle}>1. Use more complex sentences</Text>
                <Text style={styles.suggestionContent}>Duis congue, eros a hendrerit dapibus, neque leo sollicitudin enim, in bibendum odio velit quis urna. Morbi porta dictum dui, ac iaculis urna eleifend id.</Text>
                <Text style={styles.suggestionTitle}>2. Use more descriptive words</Text>
                <Text style={styles.suggestionContent}>Tiam sit amet justo eget tortor faucibus ornare ac vel velit. Morbi lobortis, felis sed placerat porttitor, purus tellus mollis dui, eget vestibulum lacus quam non orci. Nunc fringilla massa ac ligula posuere rhoncus.</Text>
                <Text style={styles.suggestionTitle}>3. Use more idiomatic expressions</Text>
                <Text style={styles.suggestionContent}>Aliquam eget eros enim. Aenean quis venenatis nibh, non ultricies nisi. Nunc porttitor ipsum lacus, at cursus ante suscipit ac. Phasellus leo odio, rutrum et bibendum tincidunt, accumsan sit amet tellus. Mauris at blandit nunc, finibus feugiat nunc.</Text>
                <Text style={styles.suggestionTitle}>4. Use more formal language</Text>
                <Text style={styles.suggestionContent}>Maecenas ultricies, odio nec congue lacinia, tortor libero fermentum quam, nec ultricies metus dolor vel nisi. Nullam nec nunc vel nunc ultricies lacinia.</Text>
                <Text style={styles.suggestionTitle}>5. Use more informal language</Text>
                <Text style={styles.suggestionContent}>Duis congue, eros a hendrerit dapibus, neque leo sollicitudin enim, in bibendum odio velit quis urna. Morbi porta dictum dui, ac iaculis urna eleifend id. Aliquam eget eros enim. Aenean quis venenatis nibh, non ultricies nisi. Nunc porttitor ipsum lacus, at cursus ante suscipit ac. Phasellus leo odio, rutrum et bibendum tincidunt, accumsan sit amet tellus. Mauris at blandit nunc, finibus feugiat nunc.</Text>
            </ScrollView>
            <View style={styles.bottomBar}>
                <TouchableOpacity style={styles.bottoms} onPress={() => {
                    console.log("Try Again button pressed");
                    router.push({
                        pathname: "/(tabs)/practiceSelection",
                    });
                }}>
                    <Text>Try Again</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottoms} onPress={() => {
                    console.log("Home button pressed");
                    router.push({
                        pathname: "/(tabs)",
                    });
                }}>
                    <Text>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottoms} onPress={() => {
                    console.log("Return to Transcripts button pressed");
                    router.push({
                        pathname: "/(tabs)/transcripts",
                    });                     
                }}>
                    <Text>Return</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ColorsPalette.FullWhite,
        padding: 10,
        margin: 10,
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
        borderRadius: 8,
        margin: 8,
        padding: 8,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: ColorsPalette.PrimaryColorLight,
        padding: 10,
    },
    secondLevelTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: ColorsPalette.PrimaryColorLight,
    }, 
    SuggestionContainer: {
        backgroundColor: ColorsPalette.NeutralColorLight,
        padding: 10,
        margin: 10,
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
        padding: 10,
        width: "90%",
    },
    suggestionTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: ColorsPalette.PrimaryColorLight,
    },
    suggestionContent: {
        fontSize: 16,
        color: ColorsPalette.NeutralColorDeep,
        paddingVertical: 10,
    }

});