import { SafeAreaView, View, Image, TouchableOpacity, Text, TextInput, StyleSheet, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

import { ColorsPalette } from "@/constants/colors";

export default function Profile() {

    const [accountName, setAccountName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const ACCOUNT_NAME_KEY = "ACCOUNT_NAME";
  const EMAIL_KEY = "EMAIL";

  useEffect(() => {
    const loadData = async () => {
      try {
        const savedAccountName = await AsyncStorage.getItem(ACCOUNT_NAME_KEY);
        const savedEmail = await AsyncStorage.getItem(EMAIL_KEY);

        if (savedAccountName) setAccountName(savedAccountName);
        if (savedEmail) setEmail(savedEmail);
      } catch (error) {
        console.error("Failed to load data from AsyncStorage", error);
      }
    };

    loadData();
  }, []);

  const saveData = async () => {
    try {
      await AsyncStorage.setItem(ACCOUNT_NAME_KEY, accountName);
      await AsyncStorage.setItem(EMAIL_KEY, email);
      Alert.alert("Success", "Your changes have been saved!");
      router.replace({
        pathname: "/(tabs)/setting",
      });
    } catch (error) {
      console.error("Failed to save data to AsyncStorage", error);
      Alert.alert("Error", "Failed to save changes. Please try again.");
    }
  };

    return (
        <SafeAreaView style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Profile</Text>

      {/* Avatar */}
      <View style={styles.avatarContainer}>
        <Image
          style={styles.avatar}
          source={{
            uri: "https://via.placeholder.com/150.png?text=Avatar", // Replace with actual avatar URL
          }}
        />
        <TouchableOpacity style={styles.editAvatarButton}>
          <Text style={styles.editAvatarText}>Edit Avatar</Text>
        </TouchableOpacity>
      </View>

      {/* Account Information */}
      <View style={styles.infoContainer}>
        {/* Account Name */}
        <View style={styles.infoItem}>
          <Text style={styles.label}>Account Name</Text>
          <TextInput
            style={styles.input}
            value={accountName} // Dynamic value from state
            editable={true} // Allow editing
            onChangeText={(text) => setAccountName(text)} // Update state when edited
          />
        </View>

        {/* Email */}
        <View style={styles.infoItem}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email} // Replace with dynamic value
            editable={true} // Allow editing
            onChangeText={(text) => setEmail(text)} // Update state when edited
          />
        </View>
      </View>

      {/* Save Button */}
      <View style={styles.botomButtons}>
      <TouchableOpacity style={styles.saveButton} onPress={saveData}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.saveButton} onPress={()=> {
        router.replace({
          pathname: "/(tabs)/setting",
        });
      }}>
        <Text style={styles.saveButtonText}>Back</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#FFFFFF",
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
    avatarContainer: {
      alignItems: "center",
      marginBottom: 30,
    },
    avatar: {
      width: 120,
      height: 120,
      borderRadius: 60,
      borderWidth: 2,
      borderColor: "#EDEDED",
    },
    editAvatarButton: {
      marginTop: 10,
      paddingVertical: 8,
      paddingHorizontal: 15,
      backgroundColor: "#F5A623",
      borderRadius: 20,
    },
    editAvatarText: {
      color: "#FFFFFF",
      fontWeight: "bold",
    },
    infoContainer: {
      marginBottom: 30,
      width: "90%",
      alignSelf: "center",
    },
    infoItem: {
      marginBottom: 20,
    },
    label: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#002F5D",
      marginBottom: 5,
    },
    input: {
      padding: 10,
      fontSize: 16,
      borderColor: "#EDEDED",
      borderWidth: 1,
      borderRadius: 8,
      backgroundColor: "#F9F9F9",
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
    botomButtons: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "80%",
        alignSelf: "center",
    },
  });