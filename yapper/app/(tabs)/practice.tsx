import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { useLocalSearchParams, router, useFocusEffect } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { Audio } from "expo-av";

import { Message as MessageType } from "@/types/Message";

const { ColorsPalette } = require("@/constants/colors.tsx");
import sampleMessages from '@/assets/sampleData/MessageSamples';

import HintModal from "@/components/HintModal";
import Timer from "@/components/Timer";

export default function Practice() {
    const { modelData } = useLocalSearchParams();
    // console.log(modelData);
    const [ hintOpen, setHintOpen ] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [timerActive, setTimerActive] = useState(true);
    const [isInitialMount, setIsInitialMount] = useState(true); 
    const parsedModel = JSON.parse(decodeURIComponent(typeof modelData === "string" ? modelData : modelData[0]));

    useFocusEffect(() => {
        console.log("Focused on Practice screen");
        if(isInitialMount) {
            setElapsedTime(0);
            setTimerActive(true);
            setIsInitialMount(false);
        }
        return () => {
            console.log("Left Practice screen");
        };
    });

    const showPauseToast = () => {
        Toast.show({
            type: 'info',
            text1: 'Timer Paused',
            position: 'top',
            autoHide: true,
            topOffset: 80,
            text1Style: {
                fontFamily: "NunitoSans-Variable",
                fontWeight: "800",
                color: ColorsPalette.PrimaryColorLight,
            },
            visibilityTime: 1000, // Display for 1 second
        });
    };
    const showResumeToast = () => {
        Toast.show({
            type: 'info',
            text1: 'Timer Resumed',
            position: 'top',
            autoHide: true,
            topOffset: 80,
            text1Style: {
                fontFamily: "NunitoSans-Variable",
                fontWeight: "800",
                color: ColorsPalette.PrimaryColorLight,
            },
            visibilityTime: 1000, // Display for 1 second
        });
    };

    return (
        <View style={styles.componentWrapper}>
            <View style={styles.topBarWrapper}>
               <View style={styles.leftBarWrapper}>
                <TouchableOpacity style={styles.outlinedButton} onPress={() => {
                    console.log("Home button pressed");
                    setElapsedTime(0);
                    setTimerActive(false);
                    setIsInitialMount(true);
                    router.replace({
                        pathname: "/(tabs)",
                    })
                }}>
                        <Text style={styles.buttonFonts}>Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.outlinedButton} onPress={() => {
                        console.log("End button pressed");
                        setElapsedTime(0);
                        setTimerActive(false);
                        setIsInitialMount(true);
                        router.replace({
                            pathname: "/(tabs)/practiceResult",
                            params: {
                                modelData: encodeURIComponent(JSON.stringify(parsedModel)),
                                practiceResultData: encodeURIComponent(JSON.stringify({
                                    fluency: 3,
                                    delivery: 3,
                                    language: 3,
                                    topic: 2,
                                })),
                                sampleMessageData: encodeURIComponent(JSON.stringify(sampleMessages)),
                            },
                        });
                    }}>
                        <Text style={styles.buttonFonts}>End</Text>
                    </TouchableOpacity>
               </View>
               <Timer 
                isActive={timerActive}
                onPause={() => {
                    console.log("Pause button pressed");
                }}
                onResume={() => {
                    console.log("Resume button pressed");
                }}
                onFinish={() => {
                    console.log("Finish button pressed");
                }}
                elapsedTime={elapsedTime}
                setElapsedTime={setElapsedTime}
                />
                <TouchableOpacity onPress={() => {
                    setTimerActive(!timerActive);
                    if(timerActive) {
                        console.log("Pause button pressed");   
                        showPauseToast();                     
                    } else {
                        console.log("Resume button pressed");
                        showResumeToast();
                    }
                }}>
                    {timerActive ? <MaterialIcons name="pause-circle-outline" size={40} color={ColorsPalette.PrimaryColorLight} /> : <MaterialIcons name="play-circle-outline" size={40} color={ColorsPalette.PrimaryColorLight} />}
                </TouchableOpacity>
            </View>
            <View style={styles.modelWrapper}>
                <Image source={parsedModel.fullImage} style={styles.fullImage}/>
            </View>
            <View style={styles.bottomBar}>
                <TouchableOpacity onPress={() => {
                    console.log("Hint button pressed");
                    setHintOpen(true);
                    setTimerActive(false);
                }}>
                    <MaterialIcons name="lightbulb-outline" size={40} color={ColorsPalette.PrimaryColorLight} />
                </TouchableOpacity>
            </View>
            <HintModal isVisible= {hintOpen} hintContents={["Hint 1: You only live once", "Hint 2: Never choose math courses"]} onClose={() => {
                console.log("Hint modal closed");
                setHintOpen(false);
                setTimerActive(true);
            }} />
            <Toast/>
        </View>
    )
};

const styles = StyleSheet.create({
    componentWrapper: {
        flex: 1,
        alignItems: "center",
        paddingTop: 80,
        backgroundColor: ColorsPalette.FullWhite,
    },
    topBarWrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        paddingHorizontal: 24,
        marginBottom: 24,
    },
    outlinedButton: {
        borderWidth: 2,
        borderColor: ColorsPalette.PrimaryColorLight,
        borderRadius: 8,
        padding: 8,
    },
    buttonFonts: {
        fontFamily: "NunitoSans-Variable",
        fontWeight: 800,
        color: ColorsPalette.PrimaryColorLight,
    },
    leftBarWrapper:{
        flexDirection: "row",
        width: "40%",
        justifyContent: "space-between",
    },
    modelWrapper:{
        // flex: 1,
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center",
        width: "90%",
        height: "75%",
        borderWidth: 1,
        borderColor: ColorsPalette.PrimaryColorLight,
        borderRadius: 8,
    },
    fullImage: {
        width: "100%",
        height: undefined, // Allow the height to adjust based on the aspect ratio
        aspectRatio: 1, // Adjust the aspect ratio to suit your image (e.g., 1:1 for square images)
        resizeMode: "contain", // Ensures the entire image fits within the container without cropping
        maxWidth: 400, // Set maxWidth to limit the image size
        maxHeight: 400,
    },
    bottomBar: {
        flexDirection: "row",
        width: "100%",
        paddingHorizontal: 24,
        marginTop: 24,
        // Right align the items
        justifyContent: "flex-end",
    }
});

/* // A possible solution for audio recording with auto-pause functionality
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Audio } from "expo-av";

export default function AutoPauseRecording() {
    const [recording, setRecording] = useState<Audio.Recording | null>(null);
    const [isRecording, setIsRecording] = useState(false);
    const [silenceDuration, setSilenceDuration] = useState(0);
    const SILENCE_THRESHOLD = 0.02; // Adjust this threshold based on sensitivity needs
    const SILENCE_TIMEOUT = 2000; // Duration in ms to pause after silence

    useEffect(() => {
        startRecording();

        return () => {
            stopRecording();
        };
    }, []);

    const startRecording = async () => {
        try {
            const { granted } = await Audio.requestPermissionsAsync();
            if (!granted) {
                alert("Permission to access microphone is required!");
                return;
            }

            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });

            const newRecording = new Audio.Recording();
            await newRecording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
            await newRecording.startAsync();
            setRecording(newRecording);
            setIsRecording(true);

            // Start monitoring for silence
            monitorAudioLevels(newRecording);
            console.log("Recording started");
        } catch (error) {
            console.error("Failed to start recording:", error);
        }
    };

    const stopRecording = async () => {
        if (!recording) return;
        try {
            await recording.stopAndUnloadAsync();
            const uri = recording.getURI();
            console.log("Recording stopped and stored at", uri);
            setRecording(null);
            setIsRecording(false);
        } catch (error) {
            console.error("Failed to stop recording:", error);
        }
    };

    const monitorAudioLevels = async (currentRecording) => {
        const interval = setInterval(async () => {
            try {
                const status = await currentRecording.getStatusAsync();
                if (status.isRecording) {
                    const volumeLevel = status.metering; // Use audio metering if available

                    if (volumeLevel < SILENCE_THRESHOLD) {
                        setSilenceDuration((prev) => prev + 500); // Increase silence duration
                        if (silenceDuration >= SILENCE_TIMEOUT) {
                            // Pause recording after silence timeout
                            clearInterval(interval);
                            stopRecording();
                            console.log("Recording paused due to silence");
                        }
                    } else {
                        setSilenceDuration(0); // Reset silence duration if sound is detected
                    }
                }
            } catch (error) {
                console.error("Error monitoring audio levels:", error);
            }
        }, 500); // Check every 500ms
    };

    return (
        <View>
            <Text>{isRecording ? "Recording..." : "Recording paused due to silence."}</Text>
        </View>
    );
}
*/