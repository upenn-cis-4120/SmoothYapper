import * as Font from 'expo-font';

export const loadFonts = async () => {
    await Font.loadAsync({
        "NunitoSans-VariableItalic": require("@/assets/fonts/NunitoSans-Italic-VariableFont_YTLC,opsz,wdth,wght.ttf"),
        "NunitoSans-Variable": require("@/assets/fonts/NunitoSans-VariableFont_YTLC,opsz,wdth,wght.ttf"),
        "NunitoSans_10pt-Black": require("@/assets/fonts/NunitoSans_10pt-Black.ttf"),
        "NunitoSans_10pt-BlackItalic": require("@/assets/fonts/NunitoSans_10pt-BlackItalic.ttf"),
        "NunitoSans_10pt-Bold": require("@/assets/fonts/NunitoSans_10pt-Bold.ttf"),
        "NunitoSans_10pt-BoldItalic": require("@/assets/fonts/NunitoSans_10pt-BoldItalic.ttf"),
        "NunitoSans_10pt-ExtraBold": require("@/assets/fonts/NunitoSans_10pt-ExtraBold.ttf"),
        "NunitoSans_10pt-ExtraBoldItalic": require("@/assets/fonts/NunitoSans_10pt-ExtraBoldItalic.ttf"),
        "NunitoSans_10pt-ExtraLight": require("@/assets/fonts/NunitoSans_10pt-ExtraLight.ttf"),
        "NunitoSans_10pt-ExtraLightItalic": require("@/assets/fonts/NunitoSans_10pt-ExtraLightItalic.ttf"),
        "NunitoSans_10pt-Italic": require("@/assets/fonts/NunitoSans_10pt-Italic.ttf"),
        "NunitoSans_10pt-Light": require("@/assets/fonts/NunitoSans_10pt-Light.ttf"),
        "NunitoSans_10pt-LightItalic": require("@/assets/fonts/NunitoSans_10pt-LightItalic.ttf"),
        "NunitoSans_10pt-Medium": require("@/assets/fonts/NunitoSans_10pt-Medium.ttf"),
        "NunitoSans_10pt-MediumItalic": require("@/assets/fonts/NunitoSans_10pt-MediumItalic.ttf"),
        "NunitoSans_10pt-Regular": require("@/assets/fonts/NunitoSans_10pt-Regular.ttf"),
        "NunitoSans_10pt-SemiBold": require("@/assets/fonts/NunitoSans_10pt-SemiBold.ttf"),
        "NunitoSans_10pt-SemiBoldItalic": require("@/assets/fonts/NunitoSans_10pt-SemiBoldItalic.ttf"),
    });
}