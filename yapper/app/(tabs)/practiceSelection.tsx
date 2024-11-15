import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";

import ModelSelection from "@/components/ModelSelection";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const { ColorsPalette } = require("@/constants/colors.tsx");

export default function PracticeSelection() {
    const [selectedModel, setSelectedModel] = useState<{
        id: number;
        name: string;
        favoriteFood: string;
        age: number;
        avatar: any;
        scenario: string;
        fullImage: any;
    } | undefined>(undefined);

    const [selectedScenario, setSelectedScenario] = useState<string>("Social");
    const [scenarios, setScenarios] = useState<string[]>([]);
    const [isPickerVisible, setIsPickerVisible] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

    useEffect(() => {
        const monkResponse = ["Social", "Academic", "Sports"];
        setScenarios(monkResponse);
        setSelectedScenario("Social");
    }, []);

    const handleButtonLayout = (event: any) => {
        const { x, y, height } = event.nativeEvent.layout;
        setDropdownPosition({ top: y + height, left: x });
    };

    return (
        <SafeAreaView style={styles.componentWrapper}>
            <View style={styles.scenarioSelectionWrapper}>
                <Text style={styles.label}>Select Scenario:</Text>
                <TouchableOpacity
                    style={styles.hiddenPickerButton}
                    onPress={() => setIsPickerVisible(!isPickerVisible)}
                    onLayout={handleButtonLayout} // Capture button position
                >
                    <Text style={styles.buttonText}>{selectedScenario}</Text>
                    <MaterialIcons
                        name={isPickerVisible ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                        size={24}
                        color={ColorsPalette.PrimaryColorLight}
                    />
                </TouchableOpacity>

                {/* Dropdown Picker */}
                {isPickerVisible && (
                    <View
                        style={[
                            styles.dropdownContainer,
                            {
                                top: dropdownPosition.top,
                                left: dropdownPosition.left,
                                width: 200, // Match button width
                            },
                        ]}
                    >
                        <Picker
                            selectedValue={selectedScenario}
                            onValueChange={(itemValue) => {
                                setSelectedScenario(itemValue);
                                setIsPickerVisible(false); // Close dropdown after selection
                            }}
                            style={styles.picker}
                        >
                            {scenarios.map((scenario, index) => (
                                <Picker.Item
                                    key={index}
                                    label={scenario}
                                    value={scenario}
                                    style={styles.pickerItem}
                                />
                            ))}
                        </Picker>
                    </View>
                )}
            </View>

            <View style={styles.modelSelectionWrapper}>
                <ModelSelection setSelectedModel={setSelectedModel} selectedScenario={selectedScenario} />
            </View>

            <TouchableOpacity
                style={styles.playButton}
                onPress={() => {
                    console.log("Play button pressed");
                    console.log(selectedModel);
                    router.replace({
                        pathname: "/(tabs)/practice",
                        params: {
                            modelData: encodeURIComponent(JSON.stringify(selectedModel)),
                        },
                    });
                }}
            >
                <MaterialIcons name="play-circle-outline" size={128} color={ColorsPalette.PrimaryColorLight} />
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    componentWrapper: {
        flex: 1,
        backgroundColor: ColorsPalette.FullWhite,
    },
    scenarioSelectionWrapper: {
        marginBottom: 20,
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        zIndex: 1, // Ensure it's above the dropdown
    },
    modelSelectionWrapper: {
        flex: 2,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    label: {
        fontSize: 18,
        fontWeight: "bold",
        color: ColorsPalette.PrimaryColorLight,
        marginBottom: 10,
    },
    hiddenPickerButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        height: 50,
        width: 200,
        borderWidth: 1,
        borderColor: ColorsPalette.PrimaryColorLight,
        borderRadius: 8,
        paddingHorizontal: 10,
        backgroundColor: ColorsPalette.FullWhite,
        elevation: 2, // Shadow for Android
    },
    dropdownContainer: {
        position: "absolute",
        backgroundColor: ColorsPalette.FullWhite,
        borderWidth: 1,
        borderColor: ColorsPalette.PrimaryColorLight,
        borderRadius: 8,
        elevation: 3, // Shadow for Android
        zIndex: 2, // Ensure it overlays other elements
    },
    picker: {
        width: "100%",
        height: 150,
    },
    pickerItem: {
        fontSize: 16,
        color: ColorsPalette.PrimaryColorDeep,
    },
    playButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: ColorsPalette.FullWhite,
        borderRadius: 8,
        alignSelf: "center",
    },
    buttonText: {
        fontSize: 16,
        color: ColorsPalette.PrimaryColorLight,
        fontWeight: "bold",
    },
});