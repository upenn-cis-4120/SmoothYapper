import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity, Switch, Alert } from "react-native";
import { router } from "expo-router";
import { ColorsPalette } from "@/constants/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";

export default function Notification() {
    const [notificationOpen, setNotificationOpen] = useState(false);
    const NOTIFY_KEY = "NOTIFY";

    useEffect(() => {
        const loadData = async () => {
            try {
                const savedNotification = await AsyncStorage.getItem(NOTIFY_KEY);
                if (savedNotification) setNotificationOpen(savedNotification === "true");
            } catch (error) {
                console.error("Failed to load data from AsyncStorage", error);
            }
        };

        loadData();
    }, []);

    const saveData = async () => {
        try {
            await AsyncStorage.setItem(NOTIFY_KEY, notificationOpen.toString());
            Alert.alert("Success", "Your changes have been saved!");
            router.replace({
                pathname: "/(tabs)/setting",
            });
        } catch (error) {
            console.error("Failed to save data to AsyncStorage", error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>Notification</Text>
            <View style={styles.menuContainer}>
                <View style={styles.menuItem}>
                    <Text style={styles.menuText}>Enable Notifications</Text>
                    <Switch
                        value={notificationOpen}
                        onValueChange={(value) => setNotificationOpen(value)}
                        thumbColor={notificationOpen ? ColorsPalette.PrimaryColorLight : ColorsPalette.NeutralColorLight}
                        trackColor={{ false: ColorsPalette.NeutralColorLight, true: ColorsPalette.FullWhite }}
                    />
                </View>
            </View>
            <View style={styles.bottomButtons}>
                <TouchableOpacity style={styles.saveButton} onPress={saveData}>
                    <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.saveButton}
                    onPress={async () => {
                        try {
                            const savedNotification = await AsyncStorage.getItem(NOTIFY_KEY);
                            if (savedNotification) setNotificationOpen(savedNotification === "true");
                        } catch (error) {
                            console.error("Failed to load data from AsyncStorage", error);
                        }
                        router.replace({
                            pathname: "/(tabs)/setting",
                        });
                    }}
                >
                    <Text style={styles.saveButtonText}>Back</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ColorsPalette.FullWhite,
        padding: 20,
    },
    header: {
        marginTop: 20,
        fontSize: 32,
        fontWeight: "bold",
        color: ColorsPalette.PrimaryColorLight,
        marginBottom: 20,
        marginLeft: "10%",
    },
    menuContainer: {
        marginTop: 20,
        width: "90%",
        alignSelf: "center",
    },
    menuItem: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 8,
        backgroundColor: ColorsPalette.NeutralColorLight,
        marginBottom: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderColor: "#EDEDED",
        borderWidth: 1,
    },
    menuText: {
        fontSize: 16,
        color: "#002F5D",
        fontWeight: "bold",
    },
    saveButton: {
        paddingVertical: 15,
        backgroundColor: "#002F5D",
        borderRadius: 8,
        alignItems: "center",
        width: "40%",
        alignSelf: "center",
    },
    saveButtonText: {
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: 16,
    },
    bottomButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "80%",
        alignSelf: "center",
    },
});