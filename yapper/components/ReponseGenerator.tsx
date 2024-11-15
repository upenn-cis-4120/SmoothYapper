import { OPENAI_API_KEY } from "@env";
import * as Speech from 'expo-speech';
import { useEffect } from "react";

// Pass a setRecordAble hook as a paramter
async function getChatGPTResponse(input: string, setRecordAble: React.Dispatch<React.SetStateAction<boolean>>) {

    console.log("Requesting ChatGPT");
    console.log("Input:", input);

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${OPENAI_API_KEY}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            model: "gpt-4o",
            messages: [{ role: "user", content: input }],
        }),
    });
    console.log("Request Sent to ChatGPT");
    const data = await response.json();
    console.log(data);
    console.log("Response From ChatGPT:", data.choices[0].message.content || data.error.message);

    // const ttsResponse = await fetch("https://api.openai.com/v1/audio/speech", {
    //     method: "POST",
    //     headers: {
    //         Authorization: `Bearer ${OPENAI_API_KEY}`,
    //         "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //         model: "tts-1-hd",
    //         input: data.choices[0].message.content || data.error.message,
    //         voice: "alloy",
    //     }),
    // });

    // const ttsData = await ttsResponse.json();
    // console.log("ttsData", ttsData);
    // const audio = new Audio.Sound();
    // await audio.loadAsync({ uri: ttsData.audio });
    // await audio.playAsync();
    
    console.log("Speaking:");
    setRecordAble(false);
    Speech.speak(data.choices[0].message.content, {
        language: "en-US",
        pitch: 1.0,
        rate: 1.0,
        onDone: () => {
            console.log("Speech finished");
            setRecordAble(true);
        },
        onError: (error) => {
            console.error("Speech error:", error);
            setRecordAble(true);
        },
    });    
    return data.choices[0].message.content || data.error.message;
}

export default function ChatGPTComponent({ input, active, onResponse, setRecordAble }: { input: string; active: boolean, onResponse: (response: string) => void, setRecordAble: React.Dispatch<React.SetStateAction<boolean>> }) {
    useEffect(() => {
        if (!active) {
            Speech.stop();
        }
    }, [active]);

    useEffect(() => {
        if (active && input) {
            console.log("Calling getChatGPTResponse with input:", input);
            getChatGPTResponse(input, setRecordAble).then((response) => {
                console.log("Response:", response);
                onResponse(response);
            });
        }
    }, [input, active]);

    return null;
}