import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { MaterialIcons } from "@expo/vector-icons";

const { ColorsPalette } = require("@/constants/colors.tsx");

import logger from "@/components/Logger";

type Props = {
    setSelectedModel: React.Dispatch<React.SetStateAction<{
        id: number;
        name: string;
        favoriteFood: string;
        age: number;
        avatar: any;
        fullImage: any;
    } | undefined>>
    selectedScenario: string;
};

const monkResponse = {
    Social:
        [
            {
                id: 1,
                name: "Lewis",
                favoriteFood: "Sushi",
                age: 21,
                avatar: require('@/assets/images/memoji-1.png'),
                fullImage: require('@/assets/images/memoji-1.png'),
            },
            {
                id: 2,
                name: "Jose",
                favoriteFood: "Dorayaki",
                age: 24,
                avatar: require('@/assets/images/memoji-2.png'),
                fullImage: require('@/assets/images/memoji-2.png'),
            },
        ],
    Academic:
        [
            {
                id: 1,
                name: "Aaliyah",
                favoriteFood: "Strawberries",
                age: 36,
                avatar: require('@/assets/images/memoji-3.png'),
                fullImage: require('@/assets/images/memoji-3.png'),
            },
            {
                id: 2,
                name: "Kim",
                favoriteFood: "Apple",
                age: 18,
                avatar: require('@/assets/images/memoji-4.png'),
                fullImage: require('@/assets/images/memoji-4.png'),
            },
        ],
    Sports:
        [
            {
                id: 1,
                name: "Giannis",
                favoriteFood: "Nuggets",
                age: 29,
                avatar: require('@/assets/images/cropped-tom.jpg'),
                fullImage: require('@/assets/images/full-tom.jpg'),
            },
            {
                id: 2,
                name: "Maxey",
                favoriteFood: "CheeseSteak",
                age: 24,
                avatar: require('@/assets/images/cropped-doraemon.jpg'),
                fullImage: require('@/assets/images/full-doraemon.jpg'),
            },
        ]
};

type ScenarioKeys = keyof typeof monkResponse;

export default function ModelSelection({ setSelectedModel, selectedScenario }: Props) {
    const [propertiesList, setPropertiesList] = useState<
        { id: number; name: string; favoriteFood: string; age: number; avatar: any; fullImage: any }[]
    >([]);
    const [index, setIndex] = useState<number>(0);

    useEffect(() => {
        const scenarioList = monkResponse[selectedScenario as ScenarioKeys];
        if (scenarioList) {
            setPropertiesList(scenarioList);
            setSelectedModel(scenarioList[0]); // Default to the first model
        } else {
            setPropertiesList([]); // Handle edge cases where scenario doesn't exist
        }
    }, [selectedScenario, setSelectedModel]);

    useEffect(() => {
        if (propertiesList.length > 0) {
            setSelectedModel(propertiesList[index]);
        }
    }, [index, propertiesList, setSelectedModel]);

    const handlePrevious = () => {
        setIndex((prevIndex) => (prevIndex - 1 + propertiesList.length) % propertiesList.length);
    };

    const handleNext = () => {
        setIndex((prevIndex) => (prevIndex + 1) % propertiesList.length);
    };

    if (propertiesList.length === 0 || index >= propertiesList.length) {
        // Safeguard against accessing out-of-bounds or undefined data
        return (
            <View style={styles.componentWrapper}>
                <Text style={styles.attribute}>No models available for this scenario.</Text>
            </View>
        );
    }

    return (
        <View style={styles.componentWrapper}>
            <View style={styles.selectionContainer}>
                <TouchableOpacity onPress={handlePrevious}>
                    <MaterialIcons name="arrow-left" size={96} color={ColorsPalette.PrimaryColorLight} />
                </TouchableOpacity>
                <Image source={propertiesList[index].avatar} style={styles.avatar} />
                <TouchableOpacity onPress={handleNext}>
                    <MaterialIcons name="arrow-right" size={96} color={ColorsPalette.PrimaryColorLight} />
                </TouchableOpacity>
            </View>
            <Text style={[styles.attribute, styles.name]}>{propertiesList[index].name}</Text>
            <Text style={[styles.attribute, styles.regularFont]}>Favorite Food: {propertiesList[index].favoriteFood}</Text>
            <Text style={[styles.attribute, styles.regularFont]}>Age: {propertiesList[index].age}</Text>
        </View>
    );
}


const styles = StyleSheet.create({
    componentWrapper: {
        alignItems: "center",
    },
    selectionContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        padding: 20,
    },
    avatar: {
        width: 212,
        height: 212,
        borderRadius: 106,
        borderColor: ColorsPalette.SecondaryColorDeep,
        borderWidth: 5,
    },
    attribute: {
        paddingBottom: 5
    },
    name: {
        fontFamily: 'NunitoSans_10pt-Bold',
        fontSize: 36,
    },
    regularFont: {
        fontFamily: 'NunitoSans_10pt-Regular',
        fontSize: 18,
    }
});