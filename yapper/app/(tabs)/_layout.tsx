import { Tabs } from "expo-router";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

const { ColorsPalette } = require("@/constants/colors.tsx");

export default function TabLayout() {
    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: ColorsPalette.SecondaryColorDeep,
            tabBarInactiveTintColor: ColorsPalette.PrimaryColorLight,
            // No header for the tabs
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
                backgroundColor: ColorsPalette.FullWhite,
                height: 96,
                borderTopWidth: 0,
            },
        }}>

            <Tabs.Screen name="index" options={{
                title: "Home",
                tabBarIcon: ({ color, focused }) => (
                    <MaterialIcons name={ focused ? "mic" : "mic-none"} size={64} color={color} />
                )
            }}/>

            <Tabs.Screen name="learn" options={{
                title: "Learn",
                tabBarIcon: ({ color, focused }) => (
                    <MaterialCommunityIcons name={ focused ? "book-multiple" : "book-multiple-outline"} size={64} color={color} />
                )
            }}/>

            <Tabs.Screen name="topic" options={{
                title: "Topic",
                tabBarIcon: ({ color, focused }) => (
                    <MaterialCommunityIcons name={ focused ? "chat-processing" : "chat-processing-outline" } size={64} color={color} />
                )
            }}/>

            <Tabs.Screen name="setting" options={{
                title: "Setting",
                tabBarIcon: ({ color, focused }) => (
                    <MaterialIcons name={ "settings" } size={64} color={color} />
                )
            }}/>

        </Tabs>
    );
}