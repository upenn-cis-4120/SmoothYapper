import { Modal, View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useRef, useState } from "react";
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

    const [selectedScenario, setSelectedScenario] = useState<string>("socialScenario");
    const [scenarios, setScenarios] = useState<string[]>([]);
    const [isPickerVisible, setIsPickerVisible] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
    const [isModalVisible, setIsModalVisible] = useState(false);
    const firstLaunch = useRef(true);

    useEffect(() => {
        const monkResponse = ["socialScenario", "academicScenario", "casualScenario"];
        setScenarios(monkResponse);
        setSelectedScenario("socialScenario");
    }, []);

    useEffect(() => {
        if(firstLaunch.current) {
            firstLaunch.current = false;
            return;
        }
        // Open a modal to display the selected model
        if (selectedModel) {
            setIsModalVisible(true); // Open the modal when a model is selected
        }
    }, [selectedModel]);

    const handleButtonLayout = (event: any) => {
        const { x, y, height } = event.nativeEvent.layout;
        setDropdownPosition({ top: y + height, left: x });
    };

    const handleModelSelection = (model: any) => {
        setSelectedModel(model); // Update the selected model
        setIsModalVisible(true); // Open the modal
    };

    return (
        <SafeAreaView style={styles.componentWrapper}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => setIsModalVisible(false)} // Close modal when requested
            >
                    <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        {selectedModel && (
                            <>
                                <Image source={selectedModel.avatar} style={styles.modalImage} />
                                <Text style={styles.modalTitle}>{selectedModel.name}</Text>
                                <Text style={styles.modalText}>Favorite Food: {selectedModel.favoriteFood}</Text>
                                <Text style={styles.modalText}>Age: {selectedModel.age}</Text>
                                <Text style={styles.modalText}>Scenario: {selectedModel.scenario}</Text>
                                <TouchableOpacity
                                    onPress={() => setIsModalVisible(false)} // Close modal
                                    style={styles.closeButton}
                                >
                                    <Text style={styles.closeButtonText}>Close</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        console.log("Play button pressed");
                                        console.log(selectedModel);
                                        setIsModalVisible(false);
                                        firstLaunch.current = true;
                                        router.replace({
                                            pathname: "/(tabs)/practice",
                                            params: {
                                                modelData: encodeURIComponent(JSON.stringify(selectedModel)),
                                            },
                                        });
                                    }}
                                    style={styles.closeButton}  
                                >
                                    <Text style={styles.closeButtonText}>Start</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </View>
                </View>
            </Modal>
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
                <ModelSelection handleModelSelection={handleModelSelection} selectedScenario={selectedScenario} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    componentWrapper: {
        flex: 1,
        backgroundColor: ColorsPalette.FullWhite,
    },
    scenarioSelectionWrapper: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        zIndex: 1, // Ensure it's above the dropdown
    },
    modelSelectionWrapper: {
        flex: 2,
        width: "100%",
        height: "100%",
        // justifyContent: "center",
        // alignItems: "center",
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
    },
    dropdownContainer: {
        position: "absolute",
        backgroundColor: ColorsPalette.FullWhite,
        borderWidth: 1,
        borderColor: ColorsPalette.PrimaryColorLight,
        borderRadius: 8,
        zIndex: 2, // Ensure it overlays other elements
    },
    buttonText: {
        fontSize: 16,
        color: ColorsPalette.PrimaryColorLight,
        fontWeight: "bold",
    },
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    },
    modalContent: {
        width: "80%",
        backgroundColor: ColorsPalette.FullWhite,
        borderRadius: 10,
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5, // Shadow for Android
    },
    modalImage: {
        width: 150,
        height: 150,
        borderRadius: 10,
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
        color: ColorsPalette.PrimaryColorLight,
    },
    modalText: {
        fontSize: 16,
        marginBottom: 10,
        color: ColorsPalette.PrimaryColorDeep,
    },
    closeButton: {
        marginTop: 20,
        backgroundColor: ColorsPalette.PrimaryColorLight,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    closeButtonText: {
        color: ColorsPalette.FullWhite,
        fontWeight: "bold",
    },
});