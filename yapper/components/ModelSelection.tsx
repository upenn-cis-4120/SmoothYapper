import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { useEffect, useState } from "react";

const { ColorsPalette } = require("@/constants/colors.tsx");
import logger from "@/components/Logger";

type Props = {
    handleModelSelection: (model: any) => void;
    selectedScenario: string;
};

const monkResponse = {
    socialScenario: [
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
        {
            id: 3,
            name: "Jose",
            favoriteFood: "Sushi",
            age: 21,
            avatar: require('@/assets/images/cropped-tom.jpg'),
            scenario: "socialScenario",
            fullImage: require('@/assets/images/full-tom.jpg'),
        },
        {
            id: 4,
            name: "Ze",
            favoriteFood: "Dorayaki",
            age: 1000000,
            avatar: require('@/assets/images/cropped-doraemon.jpg'),
            scenario: "socialScenario",
            fullImage: require('@/assets/images/full-doraemon.jpg'),
        },
    ],
    academicScenario: [
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
    casualScenario: [
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
    ],
};

type ScenarioKeys = keyof typeof monkResponse;

export default function ModelSelection({ handleModelSelection, selectedScenario }: Props) {
    const [propertiesList, setPropertiesList] = useState<
        {
            id: number;
            name: string;
            favoriteFood: string;
            age: number;
            avatar: any;
            scenario: string;
            fullImage: any;
        }[]
    >([]);

    useEffect(() => {
        setPropertiesList(monkResponse[selectedScenario as ScenarioKeys]);
        logger.info("Model Selection Component Mounted");
    }, [selectedScenario]);

    const handleSelection = (item: any) => {
        handleModelSelection(item);
        logger.info(`Selected Model: ${item.name}`);
    };

    const renderItem = ({ item }: { item: any }) => (
        <TouchableOpacity
            style={styles.gridItem}
            onPress={() => handleSelection(item)}
        >
            <Image source={item.avatar} style={styles.gridAvatar} />
            <Text style={styles.gridText}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <FlatList
            data={propertiesList}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2} // Adjust the number of columns as needed
            contentContainerStyle={styles.gridContainer}
        />
    );
}

const styles = StyleSheet.create({
    gridContainer: {
        // flex: 1,
        paddingHorizontal: 10,
        justifyContent: "center",
        width: "100%", // Ensure the grid spans the full width
    },
    gridItem: {
        flex: 1,
        margin: 10,
        alignItems: "center",
        backgroundColor: ColorsPalette.PrimaryColorLight,
        borderRadius: 20,
        padding: 10,
        minWidth: "40%", // Ensure each item has a minimum width
        maxWidth: "45%", // Prevent items from growing too wide
    },
    gridAvatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: ColorsPalette.SecondaryColorDeep,
    },
    gridText: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: "bold",
        color: ColorsPalette.FullWhite,
    },
});