import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { loadFonts } from '@/components/FontLoader';
import { Link, useRouter } from 'expo-router';

const { ColorsPalette } = require("@/constants/colors.tsx");

export default function Home() {
  
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const router = useRouter();

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
      <Text style={styles.practiceText}>PRACTICE</Text>
        <TouchableOpacity style={styles.playButton} onPress={() => {
          router.replace("/practiceSelection");
        }}>
          <MaterialIcons name="play-circle-outline" size={164} color={ColorsPalette.PrimaryColorLight}  />
        </TouchableOpacity>
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
        fontFamily: 'NunitoSans-VariableItalic',
        fontSize: 36,
        fontWeight: 800,
        paddingTop: 20,
        paddingBottom: 60,
    },
    practiceText: {
        color: ColorsPalette.PrimaryColorLight,
        fontFamily: 'NunitoSans-Variable',
        fontSize: 48,
        fontWeight: 'black',
        paddingBottom: 60,
    },
    playButton: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});