import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, ScrollView, SafeAreaView } from "react-native";
import { useEffect, useRef, useState } from "react";
import Toast from "react-native-toast-message";
import { useLocalSearchParams, router, useFocusEffect } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import axios from 'axios';
import FormData from 'form-data';
import * as FileSystem from 'expo-file-system';

const { ColorsPalette } = require("@/constants/colors.tsx");
import baseURL from "@/constants/baseURL";

import HintModal from "@/components/HintModal";
import Timer from "@/components/Timer";
import Message from "@/components/Message";
import AudioRecorder from "@/components/AudioRecorder";
import AudioPlayer from "@/components/AudioPlayer";
import logger from "@/components/Logger";

import { Message as MessageType, Sentences as SentenceType } from "@/types/Message";

function splitIntoSentences(content: string): SentenceType[] {
    // Regex to match sentence-ending symbols and retain them
    const sentenceEndingRegex = /([。？！\.\?!])/g;

    // Split content into sentences while keeping the symbols
    const sentencesWithSymbols = content.split(sentenceEndingRegex);

    // Combine sentences and their ending symbols
    const sentences: string[] = [];
    for (let i = 0; i < sentencesWithSymbols.length; i += 2) {
        const sentence = sentencesWithSymbols[i]?.trim();
        const symbol = sentencesWithSymbols[i + 1] || "";
        if (sentence) {
            sentences.push(sentence + symbol); // Combine sentence with its symbol
        }
    }

    // Map to Sentences array
    return sentences.map((sentence, index) => ({
        index,
        content: sentence.trim(),
        highlight:( Math.random() > 0.7),
    }));
}

export default function Practice() {
    const { modelData, scenario } = useLocalSearchParams();
    const [ hintOpen, setHintOpen ] = useState(true);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [timerActive, setTimerActive] = useState(true);
    const [isInitialMount, setIsInitialMount] = useState(true); 
    const parsedModel = JSON.parse(decodeURIComponent(typeof modelData === "string" ? modelData : modelData[0]));
    const hintContents = [
        "Current Scenario: " + scenario,
        "Pick a random topic and talk about it. When you are ready, press the record button to start recording.",
        "When you are done, press the record button again to stop recording.",
    ]
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
    const [transcribeShown, setTranscribeShown] = useState(true);

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
        avatar: parsedModel.avatar,
    };

    const recordingMessage : MessageType = {
        id: messages.length+1,
        type: "sent",
        text: "Transcribing...",
        sentences: [
            {
                content: "Recording...",
                highlight: false,
                index: 0,
            },
        ],
        timestamp: new Date().toISOString(),
        avatar: parsedModel.avatar,
    };

    const getSessionId = async () => {
        logger.info("Initiating session...");
        logger.info(`Scenario: ${scenario}`);
        const response = await axios.post(`${baseURL}/initChat`, {
            scenario : scenario,
        });
        logger.info(`Session inited, sessionId: ${response.data.sessionId}`);
        sessionIdRef.current = response.data.sessionId;
    };

    useFocusEffect(() => {
        const initSession = async () => {
            await getSessionId();
            setIsSessionActive(true);
        }
        if(isInitialMount) {
            setElapsedTime(0);
            setTimerActive(false);
            setIsInitialMount(false);
            initSession();
        }
        return () => {};
    });

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
                logger.info(`Transcription: ${transcription.text}`);
                
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
                    avatar: parsedModel.avatar,
                };
                logger.info(`Parsed Message: ${message}`);
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
                    const responseJson = await textResponse.json();
                    logger.error(`Error ${responseJson.error.code}: ${responseJson.error.message}`);
                    return;
                }
                const textResponseJson = await textResponse.json();
                logger.info(`Text Response: ${textResponseJson.message}`);
                
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
                // FIXME: The audio player is not playing the audio when reentering the practice after a seccion ends
                // FIXME: The period symbols are missing at the end of each sentence
                const sentences = textResponseJson.message.match(/[^.!?]+[.!?]+/g) || [];
                setMessages((prevMessages) => [
                    ...prevMessages,
                    {
                        id: prevMessages.length + 1,
                        type: "received",
                        text: textResponseJson.message,
                        sentences: splitIntoSentences(textResponseJson.message),
                        timestamp: new Date().toISOString(),
                        avatar: parsedModel.avatar,
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
                        // TODO: Init an end session request
                        // however, the sessionId should not be deleted from Redis
                        // The sessionId should be deleted when the user ends the whole practice 
                        // aftering viewing the results and feedback
                        // FIXME: Check the resources cleanning and the session cleanning, which leads to existing bugs in no sounds and bad session state
                        console.log("End button pressed");
                        setElapsedTime(0);
                        setTimerActive(false);
                        setIsInitialMount(true);
                        setIsSessionActive(false);
                        setIsRecording(false);
                        setRecordAble(true);
                        setRecordingUri("");
                        setTtsAudioUri("");
                        setPlaying(false);
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
                                sessionId: sessionIdRef.current,
                            },
                        });
                        sessionIdRef.current = "";
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
            </View>
            <View style={styles.modelWrapper}>
                <Image source={parsedModel.avatar} style={styles.avatar} />
            </View>
            {
                transcribeShown ? (
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
                ) : (
                    <View style={styles.messageWrapper}>
                        <Text style={styles.title}>Transcription Hidden</Text>
                    </View>
                )
            }
            <View style={styles.bottomBar}>
                <View style={{flex: 1}}>
                    <TouchableOpacity onPress={
                        () => {
                            setTranscribeShown(!transcribeShown);
                        }
                    }>
                        {transcribeShown ? (
                            <MaterialIcons name="closed-caption" size={40} color={ColorsPalette.PrimaryColorLight} />
                        ) : (
                            <MaterialIcons name="closed-caption-disabled" size={40} color={ColorsPalette.PrimaryColorLight} />
                        )}
                    </TouchableOpacity>
                </View>
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
            <HintModal isVisible= {hintOpen} hintContents={hintContents} onClose={() => {
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
        fontFamily: "NunitoSans_10pt-Black",
        fontWeight: 900,
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
        height: "30%",
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
    avatar: {
        width: 212,
        height: 212,
        borderRadius: 106,
        borderColor: ColorsPalette.FullWhite,
        borderWidth: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: ColorsPalette.PrimaryColorLight,
        textAlign: "center",
        marginBottom: 20,
        marginTop: 20,
    }
});