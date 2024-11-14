import React, { useState, useEffect } from "react";
import { useAudioRecorder, AudioModule, RecordingPresets } from "expo-audio";
import * as FileSystem from "expo-file-system";
import OpenAI from 'openai';
import { OPENAPI_API_KEY } from "@env";

type AudioRecorderProps = {
    // onSegmentRecorded: (audioUri: string) => void;
    slienceDuration: number;
    isRecording: boolean;
};

const openai = new OpenAI({
    apiKey: OPENAPI_API_KEY,
})

export default function AudioRecorder({ slienceDuration = 3000, isRecording }: AudioRecorderProps) {
    const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
    const [transcription, setTranscription] = useState("");
    const [silentTimeout, setSilentTimeout] = useState<NodeJS.Timeout | null>(null);
    const silenceThreshold = -40;



    useEffect(() => {
        if(isRecording) {
            startRecording();
        } else {
            stopRecording();
        }

        return () => {
            if(audioRecorder.isRecording) {
                stopRecording();
            }
        }
    }, []);

    const startRecording = async () => {
        if(audioRecorder.isRecording) {
            return;
        }

        monitorAudioLevel();
        setTranscription("");
    };

    const stopRecording = async () => {
        if(!audioRecorder.isRecording) {
            return;
        }

        await audioRecorder.stop();

        if(audioRecorder.uri) {
            transcriptionTool(audioRecorder.uri);
        }
    };

    const monitorAudioLevel = async () => {
        const intervalId  = setInterval(async () => {
            const recorderStatus = audioRecorder.getStatus();
            if(recorderStatus.metering && recorderStatus.metering < silenceThreshold) {
                if(!silentTimeout) {
                    setSilentTimeout(setTimeout(() => {
                        stopRecording();
                        clearInterval(intervalId);
                    }, slienceDuration));
                }
            } else if (silentTimeout) {
                clearTimeout(silentTimeout);
                setSilentTimeout(null);
            }
        }, 500);
    };

    const transcriptionTool = async (audioUri : string) => {
        try {
            const formData = new FormData();
            formData.append("file", {
                uri: audioUri,
                type: "audio/x-wav",
                name: "audio.wav",
            } as any);
            formData.append("model", "whisper-1");

            const response = await fetch("https://api.openai.com/v1/engines/davinci/transcribe", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${OPENAPI_API_KEY}`,
                    "Content-Type": "multipart/form-data",
                },
                body: formData,
            });

            const data = await response.json();
            console.log(data);
            const transcriptedText = data.text || "";
            setTranscription(transcriptedText);
        } catch (error) {
            console.error(error);
        }
    };

    return {
        startRecording,
        stopRecording,
    };
};

