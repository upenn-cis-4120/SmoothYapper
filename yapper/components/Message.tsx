// src/components/Message.tsx
import { View, Text, Image, StyleSheet } from 'react-native';
import { Message as MessageType } from "@/types/Message";

const { ColorsPalette } = require("@/constants/colors.tsx");

type Props = {
    message: MessageType;
};

export default function Message({ message }: Props) {
    const { type, text, avatar } = message;

    const modelAvatar = require('@/assets/images/cropped-tom.jpg');
    const userAvatar = require('@/assets/images/user.png');

    return type === 'sent' ? (
        <View style={styles.container}>
            <View style={[styles.message, styles.sent, styles.textSent]}>
                <Text>{text}</Text>
            </View>
            <Image source={userAvatar} style={styles.avatar} />
        </View>
    ) : (
        <View style={styles.container}>
            <Image source={modelAvatar} style={styles.avatar} />
            <View style={[styles.message, styles.received, styles.textReceived]}>
                <Text>{text}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10,
        margin: 10,
        maxWidth: '80%',
        alignItems: 'flex-start',
    },
    message: {
        padding: 10,
        borderRadius: 10,
    },
    sent: {
        alignSelf: 'flex-end',
    },
    received: {
        alignSelf: 'flex-start',
    },
    avatar: {
        width: 30,
        height: 30,
        borderRadius: 15,
        // borderColor: ColorsPalette.SecondaryColorDeep,
        // borderWidth: 1,
        marginHorizontal: 10,
        marginVertical: 5,
    },
    textSent: {
        marginLeft: 10,
        borderRadius: 10,
        backgroundColor: '#dcf8c6',
    },
    textReceived: {
        marginRight: 10,
        borderRadius: 10,
        backgroundColor: ColorsPalette.NeutralColorLight,
    }
});