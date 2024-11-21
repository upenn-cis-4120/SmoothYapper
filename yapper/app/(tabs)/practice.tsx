import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, ScrollView, SafeAreaView } from "react-native";
import { useEffect, useRef, useState } from "react";
import Toast from "react-native-toast-message";
import { useLocalSearchParams, router, useFocusEffect } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import axios from 'axios';
import FormData from 'form-data';
import * as FileSystem from 'expo-file-system';

import { Message as MessageType } from "@/types/Message";

const { ColorsPalette } = require("@/constants/colors.tsx");
import sampleMessages from '@/assets/sampleData/MessageSamples';

import HintModal from "@/components/HintModal";
import Timer from "@/components/Timer";
import Message from "@/components/Message";
import AudioRecorder from "@/components/AudioRecorder";
import AudioPlayer from "@/components/AudioPlayer";

const baseURL = "http://100.110.220.66:3000";

export default function Practice() {
    const { modelData } = useLocalSearchParams();
    const [ hintOpen, setHintOpen ] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [timerActive, setTimerActive] = useState(true);
    const [isInitialMount, setIsInitialMount] = useState(true); 
    const parsedModel = JSON.parse(decodeURIComponent(typeof modelData === "string" ? modelData : modelData[0]));
    const [isRecording, setIsRecording] = useState(false);
    const [messages, setMessages] = useState<MessageType[]>([]);
    const [isSessionActive, setIsSessionActive] = useState(true);
    const [latestuserMessage, setLatestUserMessage] = useState<string>();
    const [recordAble, setRecordAble] = useState(true);
    const [recordingUri, setRecordingUri] = useState<string>();
    const sessionIdRef = useRef<string>("");
    const [ttsAudioUri, setTtsAudioUri] = useState<string>();
    const [playing, setPlaying] = useState(false);
    const [generating, setGenerating] = useState(false);
    const [transcribing, setTranscribing] = useState(false);

    const generatingMessage : MessageType = {
        id: messages.length+1,
        type: "received",
        text: "Generating response...",
        sentences: [
            {
                content: "Generating response...",
                highlight: false,
                index: 0,
            },
        ],
        timestamp: new Date().toISOString(),
        avatar: "@/assets/images/cropped-tom.jpg",
    };

    const recordingMessage : MessageType = {
        id: messages.length+1,
        type: "sent",
        text: "Recording...",
        sentences: [
            {
                content: "Recording...",
                highlight: false,
                index: 0,
            },
        ],
        timestamp: new Date().toISOString(),
        avatar: "@/assets/images/cropped-tom.jpg",
    };

    useFocusEffect(() => {
        if(isInitialMount) {
            setElapsedTime(0);
            setTimerActive(false);
            setIsInitialMount(false);
        }
        return () => {};
    });

    useEffect(() => {
        const getSessionId = async () => {
            const response = await axios.post(`${baseURL}/initChat`, {
                scenario : "Academic",
            });
            console.log(`SessionId: ${response.data.sessionId}`);
            sessionIdRef.current = response.data.sessionId;
        };

        if(isSessionActive && isInitialMount && sessionIdRef.current === "") {
            getSessionId();
        }
    },[]);

    useEffect(() => {
        const postAudioForTranscription = async () => {
            try {
                setTranscribing(true);
                const formData = new FormData();
                formData.append('audio', {
                    uri: recordingUri, // The file URI
                    name: 'recording.m4a', // A name for the file
                    type: 'audio/m4a', // MIME type of the file
                  });
                const response = await fetch(`${baseURL}/transcribe`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    body: formData as any,
                });

                const transcription = await response.json();
                console.log(`Transcription: ${transcription.text}`);
                
                const message: MessageType = {
                    id: messages.length+1,
                    type: "sent",
                    text: transcription.text,
                    sentences: transcription.text
                        .split('. ') // Example splitting by sentences
                        .map((content: string, index: number) => ({
                        content,
                        highlight: false, // or some logic to determine highlighting
                        index,
                    })),
                    timestamp: new Date().toISOString(),
                    avatar: "@/assets/images/cropped-tom.jpg",
                };
                console.log(`Message: ${message.text}`);
                setTranscribing(false);
                setMessages((prevMessages) => [...prevMessages, message]);
                setLatestUserMessage(transcription.text);
            } catch (error) {
                console.error(error);
            }
        };

        if(recordingUri) {
            postAudioForTranscription();
        }
    }, [recordingUri]);

    useEffect(() => {
        const getGPTResponse = async () => {
            if(latestuserMessage) {
                setGenerating(true);
                const formData = new FormData();
                formData.append('sessionId', sessionIdRef.current);
                formData.append('message', latestuserMessage);

                const textResponse = await fetch(`${baseURL}/chat`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    body: formData as any,
                });
                if(!textResponse.ok) {
                    console.error(`GPT Response Error: ${textResponse.text}`);
                    return;
                }
                const textResponseJson = await textResponse.json();
                console.log(`GPT Response: ${textResponseJson.message}`);
                
                const ttsResponse = await fetch(`${baseURL}/speech`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        text: textResponseJson.message,
                    }),
                });
                if(!ttsResponse.ok) {
                    console.error(`TTS Response Error: ${ttsResponse.text}`);
                    return;
                }
                const ttsResponseJson = await ttsResponse.json();
                const base64Audio = ttsResponseJson.audio;
                const fileUri = `${FileSystem.cacheDirectory}${new Date().toISOString()}temp_audio.mp3`;
                await FileSystem.writeAsStringAsync(fileUri, base64Audio, {
                    encoding: FileSystem.EncodingType.Base64,
                });
                console.log("Setting TTS Audio URI: ", fileUri);
                setTtsAudioUri(fileUri);

                setMessages((prevMessages) => [
                    ...prevMessages,
                    {
                        id: prevMessages.length+1,
                        type: "received",
                        text: textResponseJson.message,
                        sentences: textResponseJson.message
                            .split('. ') // Example splitting by sentences
                            .map((content: string, index: number) => ({
                            content,
                            highlight: false, // or some logic to determine highlighting
                            index,
                        })),
                        timestamp: new Date().toISOString(),
                        avatar: "@/assets/images/cropped-tom.jpg",
                    },
                ]);
                setGenerating(false);
            }
        };

        if(latestuserMessage) {
            getGPTResponse();
        }
    }, [latestuserMessage]);

    const toggleRecording = () => {
        if(!recordAble){
            Toast.show({
                type: 'error',
                text1: 'Please wait for the model to finish speaking',
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
            return;
        }
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
            // Stop the timer
            setTimerActive(false);
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
            // Start the timer
            setTimerActive(true);
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
        <SafeAreaView style={styles.componentWrapper}>
            <AudioRecorder
                isRecording={isRecording}
                setRecordingUri={setRecordingUri}
            />
            <AudioPlayer
                audioUri={ttsAudioUri}
                setPlaying={setPlaying}
                isSessionActive={isSessionActive}
                setRecordAble={setRecordAble}
            />
            <View style={styles.topBarWrapper}>
               <View style={styles.leftBarWrapper}>
                <TouchableOpacity style={styles.outlinedButton} onPress={() => {
                    console.log("Home button pressed");
                    setElapsedTime(0);
                    setTimerActive(false);
                    setIsInitialMount(true);
                    setIsSessionActive(false);
                    setMessages([]);
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
                        setIsSessionActive(false);
                        setMessages([]);
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
            <ScrollView style={styles.messageWrapper}>
                {messages.map((message, index) => (
                    <Message key={index} message={message} />
                ))}
                {(isRecording || transcribing) && (
                    <Message key={2} message={recordingMessage} />
                )}
                {(generating) && (
                    <Message key={1} message={generatingMessage} />
                )}
            </ScrollView>
            <View style={styles.bottomBar}>
                <View style={{flex: 1}}></View>
                <View style={styles.recordingWrapper}>
                    <TouchableOpacity onPress={toggleRecording} style={styles.recordingButton}>
                        {
                            recordAble ? isRecording ? (
                                <MaterialIcons name="mic" size={40} color={ColorsPalette.PrimaryColorLight} />
                            ): (
                                <MaterialIcons name="mic-none" size={40} color={ColorsPalette.PrimaryColorLight} />
                            ) : (
                                <MaterialIcons name="mic-off" size={40} color={ColorsPalette.PrimaryColorLight} />
                            )
                        }
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <TouchableOpacity onPress={() => {
                        console.log("Hint button pressed");
                        setHintOpen(true);
                        setTimerActive(false);
                    }} style={styles.hintButton}>
                        <MaterialIcons name="lightbulb-outline" size={40} color={ColorsPalette.PrimaryColorLight} />
                    </TouchableOpacity>
                </View>
            </View>
            <HintModal isVisible= {hintOpen} hintContents={["Hint 1: You only live once", "Hint 2: Never choose math courses"]} onClose={() => {
                console.log("Hint modal closed");
                setHintOpen(false);
                setTimerActive(true);
            }} />
            <Toast/>
        </SafeAreaView>
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
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center",
        width: "90%",
        height: "75%",
        borderWidth: 1,
        borderColor: ColorsPalette.PrimaryColorLight,
        borderRadius: 8,
    },
    bottomBar: {
        flexDirection: "row",
        width: "100%",
        paddingHorizontal: 24,
        marginTop: 24,
        justifyContent: "space-between",
        alignItems: "center",
    },
    recordingWrapper: {
        flex: 1,
        alignItems: "center",
    },
    recordingButton: {
        backgroundColor: ColorsPalette.SecondaryColorLight,
        borderRadius: 25,
        padding: 10,
    },
    hintButton: {
        alignSelf: 'flex-end',
    },
    messageWrapper: {
        flex: 1,
        width: "90%",
        paddingHorizontal: 10,
        backgroundColor: ColorsPalette.FullWhite,
        borderRadius: 8,
    },
});