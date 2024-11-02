import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useEffect, useState, Dispatch, SetStateAction } from "react";

const { ColorsPalette } = require("@/constants/colors.tsx");

type Props = {
    setSelectedModel: Dispatch<SetStateAction<{ id: number; name: string; favoriteFood: string; age: number; avatar: any; scenario: string; } | undefined>>;
}

export default function ModdlSelection({setSelectedModel} : Props) {
    const [propertiesList, setPropertiesList] = useState<{ id: number; name: string; favoriteFood: string; age: number; avatar: any; scenario: string; }[]>([]);
    const [index, setIndex] = useState<number>(0);

    useEffect(() => {
        // Fetch data from the server
        // fetch("https://api.example.com/properties")
        //     .then((response) => response.json())
        //     .then((data) => {
        //         setPropertiesList(data);
        //     });
        const monkResponse = [
            {
                id: 1,
                name: "Ray Liu",
                favoriteFood: "Sushi",
                age: 21,
                avatar: require('@/assets/images/cropped-tom.jpg'),
                scenario: "Academic",
            },
            {
                id: 2,
                name: "Doraemon",
                favoriteFood: "Dorayaki",
                age: 1000000,
                avatar: require('@/assets/images/cropped-doraemon.jpg'),
                scenario: "Social",
            },
        ];
        setPropertiesList(monkResponse);
        setIndex(0);
        setSelectedModel(monkResponse[0]);
    }
    , []);

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

    return (
        <View style={styles.componentWrapper}>
            {propertiesList.length > 0 && index < propertiesList.length && (
                <>
                <View style={styles.selectionContainer}>
                    <TouchableOpacity onPress={handlePrevious}>
                        <Text>Previous</Text>
                    </TouchableOpacity>
                    <Image source={propertiesList[index].avatar} style={styles.avatar}/>
                    <TouchableOpacity onPress={handleNext}>
                        <Text>Next</Text>
                    </TouchableOpacity>
                </View>
                    <Text>{propertiesList[index].name}</Text>
                    <Text>Favorite Food: {propertiesList[index].favoriteFood}</Text>
                    <Text>Age: {propertiesList[index].age}</Text>
                    <Text>Scenario: {propertiesList[index].scenario}</Text>
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
});