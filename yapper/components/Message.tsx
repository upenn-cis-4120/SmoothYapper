import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import { ColorsPalette } from '@/constants/colors';

type Props = {
    message: {
        type: string;
        text: string;
        avatar: any;
        sentences: { content: string; highlight: boolean; index: number }[];
    };
};

export default function Message({ message }: Props) {
    const { type, text, avatar, sentences } = message;

    const userAvatar = require('@/assets/images/user.png');
    
    return type === 'sent' ? (
        <View style={styles.sentContainer}>
            <View style={[styles.message, styles.sent]}>
                {sentences.map((sentence, index) => (
                    sentence.highlight ? (
                        <TouchableOpacity key={sentence.index} onPress={() => {
                            router.replace({
                                pathname: "/(tabs)/improvement",
                                params: {
                                    sentence: sentence.content,
                                },
                            });
                        }}>
                            <Text style={{ color: ColorsPalette.SecondaryColorDeep }}>
                                {sentence.content}
                            </Text>
                        </TouchableOpacity>
                    ) : (
                        <Text key={sentence.index} style={styles.textSent}>
                            {sentence.content}
                        </Text>
                    )
                ))}
            </View>
            <View style={styles.avatarContainer}>
                <Image source={userAvatar} style={styles.avatar} />
            </View>
        </View>
    ) : (
        <View style={styles.container}>
            <View style={styles.avatarContainer}>
                <Image source={avatar} style={styles.avatar} />
            </View>
            <View style={[styles.message, styles.received]}>
                {sentences.map((sentence, index) => (
                    <Text key={sentence.index} style={styles.textReceived}>
                        {sentence.content}
                    </Text>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginVertical: 12,
    },
    sentContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginVertical: 5,
    },
    message: {
        maxWidth: '70%',
        padding: 10,
        borderRadius: 10,
    },
    sent: {
        backgroundColor: ColorsPalette.PrimaryColorLight,
        alignSelf: 'flex-end',
        marginLeft: 'auto',
    },
    textSent: {
        color: ColorsPalette.FullWhite,
        fontFamily: 'NunitoSans_10pt-Regular',
    },
    received: {
        backgroundColor: ColorsPalette.SecondaryColorLight,
        alignSelf: 'flex-start',
        marginRight: 'auto',
    },
    textReceived: {
        color: "#000",
        fontFamily: 'NunitoSans_10pt-Regular',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginHorizontal: 10,
    },
    avatarContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});