import { SafeAreaView, ScrollView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useLocalSearchParams, router } from "expo-router";

const { ColorsPalette } = require("@/constants/colors.tsx");

export default function Improvement() {
    const { sentence } = useLocalSearchParams();
    // TODO: Add the return to transcripts button to the bottom bar
    // TODO: Polish the UI
    return (
        <SafeAreaView>
            <Text>Improvement</Text>
            <Text>Expression to be Improved:</Text>
            <Text>{sentence}</Text>
            <Text>Suggestions from AI:</Text>
            <ScrollView>
                <Text>Placeholders</Text>
                <Text>1. Use more complex sentences</Text>
                <Text>2. Use more descriptive words</Text>
                <Text>3. Use more idiomatic expressions</Text>
                <Text>4. Use more formal language</Text>
                <Text>5. Use more informal language</Text>
            </ScrollView>
            <View style={styles.bottomBar}>
                <TouchableOpacity style={styles.bottoms} onPress={() => {
                    console.log("Try Again button pressed");
                    router.replace({
                        pathname: "/(tabs)/practiceSelection",
                    });
                }}>
                    <Text>Try Again</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottoms} onPress={() => {
                    console.log("Home button pressed");
                    router.replace({
                        pathname: "/(tabs)",
                    });
                }}>
                    <Text>Home</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ColorsPalette.FullWhite,
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
    }
});