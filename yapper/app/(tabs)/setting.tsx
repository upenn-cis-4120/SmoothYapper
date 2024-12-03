import { SafeAreaView, Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";

import { ColorsPalette } from "@/constants/colors";
import { router } from "expo-router";

const Logo  = require('@/assets/images/logo.png');

export default function Setting() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Settings</Text>

      <View style={styles.logoContainer}>
        <Image
          style={styles.logoImage}
          source={Logo}
        />
        <View style={styles.logoTextContainer}>
          <Text style={styles.logoMainText}>SMOOTH</Text>
          <Text style={styles.logoSubText}>YAPPER</Text>
        </View>
      </View>

      {/* Menu Options */}
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem} onPress={() => {
          router.push({
            pathname: "/(tabs)/notification",
          });
        }}>
          <Text style={styles.menuText}>Notification</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={()=> {
          router.push({
            pathname: "/(tabs)/profile",
          });
        }}>
          <Text style={styles.menuText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={()=> {
          router.push({
            pathname: "/(tabs)/feedback",
          });
        }}>
          <Text style={styles.menuText}>Feedback</Text>
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
  logoContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  logoImage: {
    width: 100,
    height: 100,
  },
  logoTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  logoMainText: {
    fontSize: 18,
    fontWeight: "bold",
    color: ColorsPalette.SecondaryColorDeep,
  },
  logoSubText: {
    fontSize: 18,
    fontWeight: "bold",
    color: ColorsPalette.PrimaryColorLight,
    marginLeft: 5,
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
});