import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { loadFonts } from '@/components/FontLoader';
import { useRouter } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { useTabContext } from '@/contexts/TabContext';

const { ColorsPalette } = require("@/constants/colors.tsx");
import Logger from "@/components/Logger";

interface GridItem {
  title: string;
  destination: string;
  icon: string; // Icon name from MaterialIcons
  color: string; // Background color
}

const gridData: GridItem[] = [
  { title: "Social", destination: "practiceSelection", icon: "message-badge", color: ColorsPalette.PrimaryColorLight },
  { title: "Academic", destination: "practiceSelection", icon: "ruler-square-compass", color: ColorsPalette.PrimaryColorLight },
  { title: "Sports", destination: "practiceSelection", icon: "football", color: ColorsPalette.PrimaryColorLight },
  { title: "Random", destination: "practiceSelection", icon: "shuffle", color: ColorsPalette.PrimaryColorLight },
];

const GridItemComponent = ({ item, router }: { item: GridItem, router: any }) => {

  return (
      <TouchableOpacity
          style={[styles.gridItem, { backgroundColor: item.color }]}
          onPress={() => {
              Logger.info(`Navigating to ${item.destination}`);
              router.replace({
                  pathname: `/(tabs)/${item.destination}`,
                  params: { scenario: item.title },
              });
          }}
      >
          <MaterialCommunityIcons name={item.icon} size={40} color="#FFFFFF" />
          <Text style={styles.gridText}>{item.title}</Text>
      </TouchableOpacity>
  );
};

export default function Home() {
  
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const router = useRouter();
  const tabContext = useTabContext();
  const setActiveTab = tabContext?.setActiveTab;

  useEffect(() => {
    async function loadResources() {
      try{
        await loadFonts();
        setFontsLoaded(true);
      } catch (error) {
        console.error(error);
      }
    }

    loadResources();
  }, [])

  return (
    <View style={styles.wrapperContainer}>
      <Text style={styles.welcomeText}>WELCOME, YAPPER!</Text>
      <Text style={styles.practiceText}>What Do You Want To Practice Today?</Text>
      <View style={styles.gridContainer}>
            {gridData.map((item, index) => (
                <GridItemComponent key={index} item={item} router={router} />
            ))}
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapperContainer: {
      backgroundColor: ColorsPalette.FullWhite,
      paddingTop: 80,
      flex: 1,
      alignItems: 'center',
  },
  welcomeText: {
      color: ColorsPalette.SecondaryColorDeep,
      fontFamily: 'NunitoSans_10pt-BoldItalic',
      fontStyle: 'italic',
      fontSize: 36,
      fontWeight: '800',
      paddingTop: 20,
      paddingBottom: 40,
      textAlign: 'center',
  },
  practiceText: {
      color: ColorsPalette.PrimaryColorLight,
      fontFamily: 'NunitoSans_10pt-Black',
      fontSize: 36,
      fontWeight: '900',
      paddingBottom: 40,
      textAlign: 'center',
  },
  gridContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center", // Center horizontally
      alignItems: "center", // Center vertically within available space
      marginHorizontal: 10,
      marginVertical: 10,
  },
  gridItem: {
      width: "40%", // Increase the size slightly to center
      aspectRatio: 1, // Make it square
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 16,
      margin: 10, // Add margin to separate items
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      elevation: 2,
  },
  gridText: {
      fontSize: 18, // Adjusted size for better fit
      fontWeight: "bold",
      color: "#FFFFFF",
      marginTop: 8,
      textAlign: "center",
      fontFamily: "NunitoSans_10pt-Black",
  },
});
