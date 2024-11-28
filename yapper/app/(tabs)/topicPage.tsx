import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, SafeAreaView, Linking } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";

const { ColorsPalette } = require("@/constants/colors.tsx");

interface Topic {
    id: number;
    rank: string;
    thumbnail: string;
    duration: string;
    title: string;
    description: string;
    url: string;
    recommendations: Recommendation[];
  }

  interface Recommendation {
    phrase: string;
    reason: string;
    sampleSentence: string;
  }

export default function TopicPage() {
    const router = useRouter();

    const {topicItemString} = useLocalSearchParams();
    const topicItem: Topic = JSON.parse(topicItemString as string);

    const handlePlayButtonPress = async (url: string) => {
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            await Linking.openURL(url); // Opens the URL in Safari or default browser
        } else {
            console.error("Failed to open URL: " + url);
        }
    };

    const phrases = [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    ];

    return (
        <SafeAreaView style={styles.container}>
        <View style={styles.container}>
            {/* Back Button */}
            <TouchableOpacity onPress={() => {
                router.replace({
                    pathname: "/(tabs)/topic",
                });
            }} style={styles.backButton}>
                <MaterialIcons name="arrow-back" size={32} color={ColorsPalette.SecondaryColorDeep} />
            </TouchableOpacity>

            {/* Heading */}
            <Text style={styles.heading}>Trending #1</Text>

            {/* Image Section */}
            <View style={styles.imageContainer}>
                <Image
                    source={topicItem.thumbnail} // Replace with your image path
                    style={styles.image}
                    resizeMode="cover"
                />
                <TouchableOpacity style={styles.playButton} onPress={() => handlePlayButtonPress(topicItem.url)}>
                    <MaterialIcons name="play-circle-outline" size={64} color={ColorsPalette.FullWhite} />
                </TouchableOpacity>
            </View>

            {/* Summary Section */}
            <Text style={styles.subheading}>Summary</Text>
            <Text style={styles.summary}>
                {topicItem.description}
            </Text>

            {/* Phrases Section */}
            <Text style={styles.subheading}>Try Using these Phrases:</Text>
            <FlatList
                
                data={topicItem.recommendations}
                keyExtractor={(item) => item.phrase}
                renderItem={({ item, index }) => (
                    <View style={styles.phrasesContainer}>
                        <Text style={styles.phrase}>{`${index+1}. ${item.phrase}`}</Text>
                        <Text style={{ fontWeight: "bold", color: ColorsPalette.SecondaryColorDeep }}>{`Reason:`}</Text>
                        <Text>{item.reason}</Text>
                        <Text style={{ fontWeight: "bold", color: ColorsPalette.SecondaryColorDeep }}>{`Sample:`}</Text>
                        <Text>{item.sampleSentence}</Text>
                    </View>
                )}
            />
        </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ColorsPalette.FullWhite,
        padding: 20,
    },
    backButton: {
        alignSelf: "flex-start",
        marginBottom: 10,
    },
    heading: {
        fontSize: 32,
        fontWeight: "bold",
        color: ColorsPalette.PrimaryColorDeep,
        marginBottom: 20,
    },
    imageContainer: {
        position: "relative",
        alignItems: "center",
        marginBottom: 20,
    },
    image: {
        width: "100%",
        height: 200,
        borderRadius: 10,
    },
    playButton: {
        position: "absolute",
        transform: [{ translateX: -32 }, { translateY: -32 }],
        top: "50%",
        left: "50%",
    },
    subheading: {
        fontSize: 20,
        fontWeight: "bold",
        color: ColorsPalette.PrimaryColorDeep,
        marginBottom: 10,
    },
    summary: {
        fontSize: 16,
        color: "#555",
        marginBottom: 20,
    },
    phrasesContainer: {
        paddingTop: 10,
    },
    phrase: {
        fontSize: 16,
        color: ColorsPalette.SecondaryColorDeep,
        marginBottom: 8,
        fontWeight: "bold",
    },
});
