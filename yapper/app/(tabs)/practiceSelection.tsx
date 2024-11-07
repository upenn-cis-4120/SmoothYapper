import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";

import ModelSelection from "@/components/ModelSelection";
import { router } from "expo-router";

const { ColorsPalette } = require("@/constants/colors.tsx");

export default function practiceSelection() {
    const [points, setPoints] = useState<number>(0);
    const [selectedModel, setSelectedModel] = useState<{id: number; name: string; favoriteFood: string; age: number; avatar: any; scenario: string; fullImage: any } | undefined>(undefined);

    useEffect(() => {
        // Fetch data from the server
        // fetch("https://api.example.com/points")
        //     .then((response) => response.json())
        //     .then((data) => {
        //         setPoints(data);
        //     });
        setPoints(100);
    }, []);

    return (
        <View style={styles.componentWrapper}>
            <Text>Overall Poins {points}</Text>
            <ModelSelection setSelectedModel={setSelectedModel}/>
            <TouchableOpacity style={styles.playButton} onPress={
                ()=> {
                    console.log("Play button pressed");
                    console.log(selectedModel);
                    router.push({
                        pathname: "/(tabs)/practice",
                        params: {
                            modelData: encodeURIComponent(JSON.stringify(selectedModel)),
                        },
                    }
                    );
                }
            }>
                <MaterialIcons name="play-circle-outline" size={128} color={ColorsPalette.PrimaryColorLight}  />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    componentWrapper: {
        flex: 1,
        alignItems: "center",
        paddingTop: 80,
        backgroundColor: ColorsPalette.FullWhite,
    },
    playButton: {
        paddingTop: 40,
    }
});