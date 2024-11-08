import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

const { ColorsPalette } = require("@/constants/colors.tsx");

type Props = {
    isVisible: boolean;
    hintContents: string[];
    onClose: () => void;
};

const HintModal = ({ isVisible, hintContents, onClose } : Props) => {
    return (
        <Modal
            transparent={true}
            animationType="fade"
            visible={isVisible}
            onRequestClose={onClose}
        >
            {/* Background overlay */}
            <View style={styles.modalOverlay}>
                {/* Centered Modal Content */}
                <View style={styles.modalContent}>
                    {hintContents.map((hint, index) => (
                        <Text key={index} style={styles.hintText}>{hint}</Text>
                    ))}
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: ColorsPalette.FullWhite,
        borderRadius: 16,
        alignItems: 'center',
        elevation: 5,
    },
    hintText: {
        fontSize: 16,
        marginBottom: 10,
        textAlign: 'center',
    },
    closeButton: {
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: ColorsPalette.PrimaryColorLight,
        borderRadius: 8,
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default HintModal;