import { SafeAreaView, ScrollView, TouchableOpacity, View, Text } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import Message from "@/components/Message";
import { Message as MessageType } from "@/types/Message";
import { useTabContext } from "@/contexts/TabContext";
import { useEffect } from "react";

const { ColorsPalette } = require("@/constants/colors.tsx");

export default function Transcripts() {
    // TODO: Randomly select several long-enough sentences from the conversation history
    // TODO: Display the selected sentences in highlight and ask for improvements from chatGPT
    const { pageAParams } = useTabContext();
    console.log("Transcripts Page");
    // const { transcriptsData } = useLocalSearchParams();
    useEffect(() => {
        console.log("Transcripts Page");
        if (pageAParams) {
            console.log(`page params: ${pageAParams}`);
        }
    }
    , []);
    // console.log(`Transcripts Data: ${transcriptsData}`);
    // const parsedTranscripts = JSON.parse(decodeURIComponent(typeof transcriptsData === "string" ? transcriptsData : transcriptsData[0]));
    const parsedTranscripts = pageAParams || [];
    console.log(parsedTranscripts);
    parsedTranscripts.forEach((message: MessageType) => {
        const rawContent = message.text;
        const sentenceRegex = /(?<=[.!?])\s+(?=[A-Z])|(?<=[.!?])\s*$/g;
        const sentences: string[] = rawContent.split(sentenceRegex).filter(sentence => sentence.trim() !== '');
        message.sentences = sentences.map((sentence, index) => {
            return {
                index: index,
                content: sentence,
                highlight: Math.random() < 0.2,
            }
        });
    });
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