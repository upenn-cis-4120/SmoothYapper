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
        scenario: string;
        fullImage: any;
    } | undefined>>
    selectedScenario: string;
};

const monkResponse = {
    socialScenario:
        [
            {
                id: 1,
                name: "Ray Liu",
                favoriteFood: "Sushi",
                age: 21,
                avatar: require('@/assets/images/cropped-tom.jpg'),
                scenario: "socialScenario",
                fullImage: require('@/assets/images/full-tom.jpg'),
            },
            {
                id: 2,
                name: "Doraemon",
                favoriteFood: "Dorayaki",
                age: 1000000,
                avatar: require('@/assets/images/cropped-doraemon.jpg'),
                scenario: "socialScenario",
                fullImage: require('@/assets/images/full-doraemon.jpg'),
            },
        ],
    academicScenario:
        [
            {
                id: 1,
                name: "Einstein",
                favoriteFood: "Strawberries",
                age: 76,
                avatar: require('@/assets/images/cropped-tom.jpg'),
                scenario: "academicScenario",
                fullImage: require('@/assets/images/full-tom.jpg'),
            },
            {
                id: 2,
                name: "Newton",
                favoriteFood: "Apple",
                age: 84,
                avatar: require('@/assets/images/cropped-doraemon.jpg'),
                scenario: "academicScenario",
                fullImage: require('@/assets/images/full-doraemon.jpg'),
            },
        ],
    casualScenario:
        [
            {
                id: 1,
                name: "Giannis",
                favoriteFood: "Nuggets",
                age: 29,
                avatar: require('@/assets/images/cropped-tom.jpg'),
                scenario: "casualScenario",
                fullImage: require('@/assets/images/full-tom.jpg'),
            },
            {
                id: 2,
                name: "Maxey",
                favoriteFood: "CheeseSteak",
                age: 24,
                avatar: require('@/assets/images/cropped-doraemon.jpg'),
                scenario: "casualScenario",
                fullImage: require('@/assets/images/full-doraemon.jpg'),
            },
        ]
};

type ScenarioKeys = keyof typeof monkResponse;

export default function ModdlSelection({ setSelectedModel, selectedScenario }: Props) {
    const [propertiesList, setPropertiesList] = useState<{ id: number; name: string; favoriteFood: string; age: number; avatar: any; scenario: string; fullImage: any; }[]>([]);
    const [index, setIndex] = useState<number>(0);

    useEffect(() => {
        // Fetch data from the server
        // fetch("https://api.example.com/properties")
        //     .then((response) => response.json())
        //     .then((data) => {
        //         setPropertiesList(data);
        //     });
        
        setPropertiesList(monkResponse.socialScenario);
        logger.info("Model Selection Component Mounted");
        setSelectedModel(monkResponse.socialScenario[0]);
        logger.info("Selected Model: " + monkResponse.socialScenario[0].name);
    }, [selectedScenario, setSelectedModel]);

    useEffect(() => {
        console.log(selectedScenario);
        setPropertiesList(monkResponse[selectedScenario as ScenarioKeys]);
        if (propertiesList.length > 0) {
            setSelectedModel(propertiesList[index]);
        }
    }, [index, setSelectedModel, selectedScenario]);

    const handlePrevious = () => {
        setIndex((prevIndex) => (prevIndex - 1 + propertiesList.length) % propertiesList.length);
    };

    const handleNext = () => {
        setIndex((prevIndex) => (prevIndex + 1) % propertiesList.length);
    };

    return (
        <View style={styles.componentWrapper}>
            {propertiesList.length > 0 && index < propertiesList.length && (
                <>
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
                    <Text style={styles.attribute}>Favorite Food: {propertiesList[index].favoriteFood}</Text>
                    <Text style={styles.attribute}>Age: {propertiesList[index].age}</Text>
                    <Text style={styles.attribute}>Scenario: {propertiesList[index].scenario}</Text>
                </>
            )}
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
        width: 256,
        height: 256,
        borderRadius: 128,
        borderColor: ColorsPalette.SecondaryColorDeep,
        borderWidth: 5,
    },
    attribute: {
        padding: 5,

    },
    name: {
        fontSize: 24,
    }
});