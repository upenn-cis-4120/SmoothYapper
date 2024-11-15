import { OPENAI_API_KEY } from "@env";
import { Audio } from "expo-av";
import * as Speech from 'expo-speech';

export default async function getChatGPTResponse(input: string) {
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

    const data = await response.json();
    // console.log(data);
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
    Speech.speak(data.choices[0].message.content, {
        language: "en-US",
        pitch: 1.0,
        rate: 1.0,
        onDone: () => console.log("Speech finished"),
        onError: (error) => console.error("Speech error:", error),
    });
    console.log("Spoken");
    return data.choices[0].message.content || data.error.message;

}