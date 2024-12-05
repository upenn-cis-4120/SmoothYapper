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
  const avatarImage = require("@/assets/images/user.png");

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
      <View style={styles.profileContainer}>
      <View style={styles.avatarContainer}>
        <Image source={avatarImage} style={styles.avatar} />
        {/* <TouchableOpacity style={styles.editAvatarButton}>
          <Text style={styles.editAvatarText}>Edit Avatar</Text>
        </TouchableOpacity> */}
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
      flex: 1, // Use full height of the screen
      backgroundColor: ColorsPalette.FullWhite,
      padding: 20,
  },
  header: {
      marginTop: 20,
      fontSize: 32,
      fontWeight: "bold",
      color: ColorsPalette.PrimaryColorLight,
      marginLeft: "10%",
      marginBottom: 20,
      fontFamily: "NunitoSans_10pt-Black",
  },
  avatarContainer: {
      alignItems: "center",
      marginBottom: 20, // Reduce margin for tighter spacing
  },
  avatar: {
      width: 120,
      height: 120,
      borderRadius: 60,
      borderWidth: 2,
      borderColor: "#EDEDED",
  },
  profileContainer: {
      flexDirection: "column",
      flexGrow: 1,
      alignItems: "center",
      marginTop: 10, // Push the profile container higher on the screen
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
      marginBottom: 20, // Adjust for tighter spacing
      width: "90%",
      alignSelf: "center",
  },
  infoItem: {
      marginBottom: 20,
  },
  label: {
      fontSize: 16,
      fontWeight: "bold",
      color: ColorsPalette.PrimaryColorLight,
      marginBottom: 5,
      fontFamily: "NunitoSans_10pt-Black",
  },
  input: {
      padding: 10,
      fontSize: 16,
      borderColor: "#EDEDED",
      borderWidth: 1,
      borderRadius: 8,
      backgroundColor: ColorsPalette.NeutralColorLight,
  },
  saveButton: {
      paddingVertical: 15,
      borderRadius: 8,
      borderColor: ColorsPalette.PrimaryColorDeep,
      borderWidth: 1,
      alignItems: "center",
      width: "40%",
  },
  saveButtonText: {
      color: ColorsPalette.PrimaryColorDeep,
      fontWeight: "bold",
      fontSize: 16,
      fontFamily: "NunitoSans_10pt-Blac",
  },
  botomButtons: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "80%",
      alignSelf: "center",
      marginBottom: 20, // Ensure buttons have margin from the bottom
  },
});