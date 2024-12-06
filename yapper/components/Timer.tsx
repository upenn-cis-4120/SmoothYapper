import { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";

import { ColorsPalette } from "@/constants/colors";
import Logger from "@/components/Logger";

type Props = {
    onPause: () => void;
    onResume: () => void;
    onFinish: () => void;
    isActive: boolean;
    elapsedTime: number;
    setElapsedTime: React.Dispatch<React.SetStateAction<number>>;
};

export default function Timer({ isActive, onPause, onResume, onFinish, elapsedTime, setElapsedTime} : Props) {
    useEffect(() => {
        let interval : NodeJS.Timeout;
        if(isActive) {
            interval = setInterval(() => {
                setElapsedTime((previousTime) => {
                    return previousTime + 1;
                });
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [isActive, setElapsedTime]);
    return (
        <View>
            <Text style={styles.timerText}>{formatTime(elapsedTime)}</Text>
        </View>
    );
}

const formatTime = (time : number) => {
    const mins = Math.floor(time / 60);
    const secs = time % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

const styles = StyleSheet.create({
    timerText: {
        fontSize: 20,
        color: ColorsPalette.PrimaryColorLight,
        padding: 8,
    },
});