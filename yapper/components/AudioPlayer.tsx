import React, { useEffect, useState } from 'react';
import { Audio } from 'expo-av';

type Props = {
    audioUri: string | undefined;
    setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
    isSessionActive: boolean;
    setRecordAble: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AudioPlayer ( { audioUri, setPlaying, isSessionActive, setRecordAble} : Props) {
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    console.log('audioUri', audioUri);
    console.log('isSessionActive', isSessionActive);
    useEffect( () => {
        const playAudio  = async () => {
            console.log('Starting playAudio with audioUri:', audioUri);
            if(!audioUri || !isSessionActive) {
                return;
            }
            console.log('playing audio', audioUri);
            if(sound) {
                await sound.unloadAsync();
            }

            const { sound : newSound } = await Audio.Sound.createAsync({
                uri: audioUri,
            });
            setSound(newSound);
            setRecordAble(false);
            setPlaying(true);
            newSound.playAsync();
            // When the sound has finished playing, unload it and reset the state
            newSound.setOnPlaybackStatusUpdate((status) => {
                if (status.isLoaded && status.didJustFinish) {
                    console.log('Audio finished playing');
                    setRecordAble(true);
                    setPlaying(false);
                    newSound.unloadAsync();
                    setSound(null);
                }
            });
        };

        if(isSessionActive && audioUri) {
            playAudio();
        }

        return () => {
            // Unload sound when component is unmounted or dependencies change
            if (sound) {
                sound.unloadAsync();
                setSound(null);
            }
        };

    }, [audioUri, isSessionActive]);

    useEffect( () => {
        if(!isSessionActive) {
            setPlaying(false);
            setRecordAble(true);
            sound?.unloadAsync();
        }
    }, [isSessionActive]);

    return null;
}