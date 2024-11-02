import { Tabs } from "expo-router";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

const ColorsPalette = require("@/constants/colors.tsx");

export default function TabLayout() {
    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: ColorsPalette.FullWhite,
            tabBarInactiveTintColor: ColorsPalette.SecondaryColorDeep,
            // No header for the tabs
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
                backgroundColor: ColorsPalette.NeutralColorLight,
                height: 96,
                borderTopWidth: 0,
            },
        }}>

            <Tabs.Screen name="index" options={{
                title: "Home",
                tabBarIcon: ({ color }) => (
                    <MaterialIcons name={"mic"} size={64} color={color} />
                )
            }}/>

            <Tabs.Screen name="learn" options={{
                title: "Learn",
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name={"book-multiple"} size={64} color={color} />
                )
            }}/>

            <Tabs.Screen name="topic" options={{
                title: "Topic",
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name={"chat-processing"} size={64} color={color} />
                )
            }}/>

            <Tabs.Screen name="setting" options={{
                title: "Setting",
                tabBarIcon: ({ color }) => (
                    <MaterialIcons name={"settings"} size={64} color={color} />
                )
            }}/>

        </Tabs>
    );
}