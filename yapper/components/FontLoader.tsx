import * as Font from 'expo-font';

export const loadFonts = async () => {
    await Font.loadAsync({
        "NunitoSans-VariableItalic": require("@/assets/fonts/NunitoSans-Italic-VariableFont_YTLC,opsz,wdth,wght.ttf"),
        "NunitoSans-Variable": require("@/assets/fonts/NunitoSans-VariableFont_YTLC,opsz,wdth,wght.ttf"),
    });
}