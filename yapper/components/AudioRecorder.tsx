import React, { useState, useEffect } from "react";
import { Audio } from "expo-av";

type AudioRecorderProps = {
    // onSegmentRecorded: (audioUri: string) => void;
    // slienceDuration: number;
    isRecording: boolean;
    setRecordingUri: React.Dispatch<React.SetStateAction<string | undefined>>;
};


export default function AudioRecorder({ isRecording, setRecordingUri }: AudioRecorderProps) {
    useEffect(() => {
        (async () => {
          const status = await Audio.requestPermissionsAsync();
          if (!status.granted) {
            alert('Permission to access microphone was denied');
            console.log("Audio permissions denied");
          }
          console.log("Audio permissions granted");
        })();
      }, []);
    
    const [recording, setRecording] = useState<Audio.Recording | null>(null);
    // const [silentTimeout, setSilentTimeout] = useState<NodeJS.Timeout | null>(null);
    // const silenceThreshold = -40;

    const startRecording = async () => {
        if(recording) {
            return;
        }

        await Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            playsInSilentModeIOS: true,
        });

        const { recording: newRecording } = await Audio.Recording.createAsync(
            Audio.RecordingOptionsPresets.HIGH_QUALITY
        );
        setRecording(newRecording);
        // monitorAudioLevel(newRecording);
    };

    const stopRecording = async () => {
        if (!recording) return;

        try {
            await recording.stopAndUnloadAsync();
            const uri = recording.getURI();
            console.log("Recording stopped and stored at", uri);
            setRecording(null);
            if (uri && setRecordingUri) {
                setRecordingUri(uri);
            }
        } catch (error) {
            console.error("Failed to stop recording", error);
        }
    };

    // const monitorAudioLevel = async (currentRecording: Audio.Recording) => {
    //     const intervalId = setInterval(async () => {
    //         const status = await currentRecording.getStatusAsync();
    //         if (status.metering && status.metering < silenceThreshold) {
    //             if (!silentTimeout) {
    //                 setSilentTimeout(
    //                     setTimeout(() => {
    //                         stopRecording();
    //                         clearInterval(intervalId);
    //                     }, slienceDuration)
    //                 );
    //             }
    //         } else if (silentTimeout) {
    //             clearTimeout(silentTimeout);
    //             setSilentTimeout(null);
    //         }
    //     }, 500);
    // };

    useEffect(() => {
        if(isRecording) {
            console.log("isRecording is true. Time to start recording");
            startRecording();
            console.log("Recording started");
        } else if (recording) {
            console.log("isRecording is false. Time to stop recording");
            stopRecording();
            console.log("Recording stopped");
        }

        // return () => {
        //     if(recording) {
        //         console.log("The recorder is still recording, Recording stopped");
        //         stopRecording();
        //     }
        // }
    }, [isRecording]);
    return null;
};

