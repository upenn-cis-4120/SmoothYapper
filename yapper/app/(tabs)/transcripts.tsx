import { SafeAreaView, ScrollView, TouchableOpacity, View, Text } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import Message from "@/components/Message";

const { ColorsPalette } = require("@/constants/colors.tsx");

export default function Transcripts() {
    console.log("Transcripts Page");
    const { transcriptsData } = useLocalSearchParams();
    console.log(`Transcripts Data: ${transcriptsData}`);
    const parsedTranscripts = JSON.parse(decodeURIComponent(typeof transcriptsData === "string" ? transcriptsData : transcriptsData[0]));
    console.log(parsedTranscripts);
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {parsedTranscripts.map((message: any) => (
                    <Message key={message.id} message={message} />
                ))}
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
};

const styles = {
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
};