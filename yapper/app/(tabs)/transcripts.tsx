import { SafeAreaView, ScrollView, TouchableOpacity, View, Text } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";

import Message from "@/components/Message";
import { useTabContext } from "@/contexts/TabContext";
import { useEffect } from "react";
import Logger from "@/components/Logger";
import baseURL from "@/constants/baseURL";

const { ColorsPalette } = require("@/constants/colors.tsx");
import { Message as MessageType, Sentences as SentenceType } from "@/types/Message";

function parseMessagesToMessageArray(data: any): MessageType[] {
    const messagesObject = data.messages;
    const length = messagesObject.length;

    const messagesArray: MessageType[] = [];

    for (let i = 0; i < length; i++) {
        const message = messagesObject[i];
        if (!message) continue;

        messagesArray.push({
            id: i,
            type: message.role === 'user' ? 'sent' : 'received',
            text: message.content,
            sentences: splitIntoSentences(message.content),
            timestamp: new Date().toISOString(), // Add logic for the correct timestamp
            avatar: message.role === 'user' ? 'user-avatar-url' : 'assistant-avatar-url', // Replace with actual URLs
        });
    }

    return messagesArray;
}

function splitIntoSentences(content: string): SentenceType[] {
    // Regex to match sentence-ending symbols and retain them
    const sentenceEndingRegex = /([。？！\.\?!])/g;

    // Split content into sentences while keeping the symbols
    const sentencesWithSymbols = content.split(sentenceEndingRegex);

    // Combine sentences and their ending symbols
    const sentences: string[] = [];
    for (let i = 0; i < sentencesWithSymbols.length; i += 2) {
        const sentence = sentencesWithSymbols[i]?.trim();
        const symbol = sentencesWithSymbols[i + 1] || "";
        if (sentence) {
            sentences.push(sentence + symbol); // Combine sentence with its symbol
        }
    }

    // Map to Sentences array
    return sentences.map((sentence, index) => ({
        index,
        content: sentence.trim(),
        highlight:( Math.random() > 0.7),
    }));
}


export default function Transcripts() {
    const { pageAParams } = useTabContext();
    console.log("Transcripts Page");
    const [transcribe, setTranscribe] = useState<MessageType[]>([]);
    const { sessionId } = useLocalSearchParams();
    useEffect(() => {
        Logger.info("Transcript Page, loading session with id:", sessionId);
        const getTranscript = async () => {
            const response = await fetch(`${baseURL}/practice/${sessionId}`);
            const data = await response.json();
            Logger.info("Transcript Data:", data);
            
            const messages = parseMessagesToMessageArray(data);
            setTranscribe(messages);
        };

        getTranscript();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Transcript</Text>
            <ScrollView>
                {transcribe.map((message: MessageType) => (
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
                    // Clean up the session
                    setTranscribe([]);
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
    title:{
        color: ColorsPalette.PrimaryColorLight,
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 10,
    },
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