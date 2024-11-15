import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { useLocalSearchParams, router, useFocusEffect } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

import { Message as MessageType } from "@/types/Message";

const { ColorsPalette } = require("@/constants/colors.tsx");
import sampleMessages from '@/assets/sampleData/MessageSamples';

import HintModal from "@/components/HintModal";
import Timer from "@/components/Timer";
import Message from "@/components/Message";
import AudioRecorder from "@/components/AudioRecorder";
import getChatGPTResponse from "@/components/ReponseGenerator";

export default function Practice() {
    const { modelData } = useLocalSearchParams();
    // console.log(modelData);
    const [ hintOpen, setHintOpen ] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [timerActive, setTimerActive] = useState(true);
    const [isInitialMount, setIsInitialMount] = useState(true); 
    const parsedModel = JSON.parse(decodeURIComponent(typeof modelData === "string" ? modelData : modelData[0]));
    const [isRecording, setIsRecording] = useState(true);
    const [messages, setMessages] = useState<MessageType[]>([]);

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

    const handleTranscription = async (transcription: string) => {
        console.log("Transcription: ", transcription);
        const newMessage: MessageType = {
            id: new Date().getTime(),
            type: "sent",
            text: transcription,
            avatar: require('@/assets/images/user.png'),
            sentences: [ {content: transcription, highlight: false, index: 0} ],
            timestamp: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, newMessage]);
        const response = await getChatGPTResponse(transcription);
        const responseMessage: MessageType = {
            id: new Date().getTime(),
            type: "received",
            text: response,
            avatar: require('@/assets/images/full-tom.jpg'),
            sentences: [ {content: response, highlight: false, index: 0} ],
            timestamp: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, responseMessage]);
    }

    const toggleRecording = () => {
        setIsRecording((prev) => !prev);
        if (isRecording) {
            Toast.show({
                type: 'info',
                text1: 'Recording Paused',
                position: 'top',
                autoHide: true,
                topOffset: 80,
                text1Style: {
                    fontFamily: "NunitoSans-Variable",
                    fontWeight: "800",
                    color: ColorsPalette.PrimaryColorLight,
                },
                visibilityTime: 1000,
            });
        } else {
            Toast.show({
                type: 'info',
                text1: 'Recording Resumed',
                position: 'top',
                autoHide: true,
                topOffset: 80,
                text1Style: {
                    fontFamily: "NunitoSans-Variable",
                    fontWeight: "800",
                    color: ColorsPalette.PrimaryColorLight,
                },
                visibilityTime: 1000,
            });
        }
    };

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
            <AudioRecorder
                isRecording={isRecording}
                onTranscription={handleTranscription}
                slienceDuration={3000}
            />
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
            {/* <View style={styles.modelWrapper}>
                <Image source={parsedModel.fullImage} style={styles.fullImage}/>
            </View> */}
            <View style={styles.recordingWrapper}>
                <TouchableOpacity onPress={toggleRecording} style={styles.recordingButton}>
                    {isRecording ? (
                        <MaterialIcons name="pause-circle-outline" size={40} color={ColorsPalette.PrimaryColorLight} />
                    ) : (
                        <MaterialIcons name="play-circle-outline" size={40} color={ColorsPalette.PrimaryColorLight} />
                    )}
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.messageWrapper}>
                {messages.map((message, index) => (
                    <Message key={index} message={message} />
                ))}
            </ScrollView>
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
    },
    recordingWrapper: {
        backgroundColor: '#d3d3d3', // Debug background color for visibility
        paddingVertical: 20,
        alignItems: "center",
    },
    recordingButton: {
        backgroundColor: '#ffcccb', // Debug background color for button visibility
        borderRadius: 25,
        padding: 10,
    },
    messageWrapper: {
        flex: 1,
        width: "90%",
        paddingHorizontal: 10,
        backgroundColor: '#e0e0e0', // Debug background color
        borderRadius: 8,
    },
});