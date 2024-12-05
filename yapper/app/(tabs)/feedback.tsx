import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { router } from "expo-router";
import { ColorsPalette } from "@/constants/colors";

export default function Feedback() {
    const [feedback, setFeedback] = useState("");

    const handleSubmit = () => {
        if (feedback.trim() === "") {
            Alert.alert("Feedback Required", "Please provide your feedback before submitting.");
        } else {
            // Handle feedback submission logic (e.g., send to server)
            Alert.alert("Thank You!", "Your feedback has been submitted.");
            setFeedback(""); // Clear the input after submission
            router.replace({
                pathname: "/(tabs)/setting",
            });
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>Feedback</Text>
            <TextInput
                style={styles.textInput}
                placeholder="Write your feedback here..."
                placeholderTextColor="#A9A9A9"
                value={feedback}
                onChangeText={setFeedback}
                multiline
            />
            <SafeAreaView style={styles.bottomButtons}>
                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => {
                        router.replace({
                            pathname: "/(tabs)/setting",
                        });
                    }}
                >
                    <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ColorsPalette.FullWhite,
        padding: 20,
    },
    header: {
        marginTop: 20,
        fontSize: 32,
        fontWeight: "bold",
        color: ColorsPalette.PrimaryColorLight,
        marginBottom: 20,
        marginLeft: "10%",
        fontFamily: "NunitoSans_10pt-Black",
    },
    textInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#EDEDED",
        borderRadius: 8,
        backgroundColor: ColorsPalette.NeutralColorLight,
        padding: 15,
        fontSize: 16,
        color: ColorsPalette.PrimaryColorLight,
        textAlignVertical: "top", // Ensures the text starts at the top
        marginBottom: 20,
        width: "90%",
        alignSelf: "center",
    },
    bottomButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "90%",
        alignSelf: "center",
        marginBottom: 20,
    },
    submitButton: {
        backgroundColor: ColorsPalette.FullWhite,
        paddingVertical: 15,
        borderRadius: 8,
        width: "40%",
        alignItems: "center",
        borderColor: ColorsPalette.PrimaryColorDeep,
        borderWidth: 1,
    },
    backButton: {
        borderColor: ColorsPalette.PrimaryColorDeep,
        borderWidth: 1,
        paddingVertical: 15,
        borderRadius: 8,
        width: "40%",
        alignItems: "center",
    },
    buttonText: {
        color: ColorsPalette.PrimaryColorDeep,
        fontWeight: "bold",
        fontSize: 16,
        fontFamily: "NunitoSans_10pt-Black",
    },
});