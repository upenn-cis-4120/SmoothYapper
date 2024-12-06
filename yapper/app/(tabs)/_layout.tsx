import { Tabs } from "expo-router";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useTabContext } from "@/contexts/TabContext";

const { ColorsPalette } = require("@/constants/colors.tsx");
import Logger from "@/components/Logger";

export default function TabLayout() {
    const tabContext = useTabContext();
    if (!tabContext) {
        throw new Error("useTabContext must be used within a TabProvider");
    }
    const { activeTab, setActiveTab } = tabContext;
    const hiddenTabsList = ["practice", "feedback", "improvement", "practiceResult", "transcripts", "topicPage", "profile", "notification"];
    
    return (
        <Tabs screenOptions={({route}) =>({
            tabBarActiveTintColor: ColorsPalette.SecondaryColorDeep,
            tabBarInactiveTintColor: ColorsPalette.PrimaryColorLight,
            // No header for the tabs
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
                backgroundColor: ColorsPalette.FullWhite,
                height: 96,
                borderTopWidth: 0,
                display: hiddenTabsList.includes(route.name) ? "none" : "flex",
            },
            tabBarItemStyle: {
                justifyContent: 'center',
                alignItems: 'center',
                // paddindVertical: 10,
            },
            tabBarLabelStyle: {
                fontSize: 16,
                fontFamily: 'NuunitoSans_10pt-Regular',
                fontWeight: 300,
            },
            tabBarIconStyle: {
                width: 64,
                height: 64,
            },
        })}>

            <Tabs.Screen 
                name="index" 
                options={{
                    title: "Home",
                    tabBarIcon: ({ color, focused }) => (
                        <MaterialIcons name={ focused || (activeTab === "Home") ? "mic" : "mic-none"} size={64} color={activeTab === "Home" ? ColorsPalette.SecondaryColorDeep : color} />
                    )
                }}
                listeners= {{
                    focus: () => setActiveTab("Home"),
                }}
            />

            <Tabs.Screen 
                name="dashboard" 
                options={{
                    title: "Dashboard",
                    tabBarIcon: ({ color, focused }) => (
                        <MaterialIcons name={ focused ? "star" : "star-border"} size={64} color={color} />
                    ),
                }} 
                listeners= {{
                    focus: () => setActiveTab("Learn"),
                }}
            />

            <Tabs.Screen 
                name="topic" 
                options={{
                    title: "Topic",
                    tabBarIcon: ({ color, focused }) => (
                        <MaterialCommunityIcons name={ focused || (activeTab === "topic")  ? "chat-processing" : "chat-processing-outline" } size={64} color={activeTab === "topic" ? ColorsPalette.SecondaryColorDeep : color} />
                    ),
                }}
                listeners= {{
                    focus: () => setActiveTab("Topic"),
                }}
            />

            <Tabs.Screen 
                name="setting" 
                options={{
                    title: "Setting",
                    tabBarIcon: ({ color, focused }) => (
                        <MaterialIcons name={ "settings" } size={64} color={color} />
                    ),
                }}
                listeners= {{
                    focus: () => setActiveTab("Setting"),
                }}
            />

            <Tabs.Screen 
                name="practiceSelection" 
                options={{
                    title: "Practice Seletcion",
                    href: null,
                }}
            />

            <Tabs.Screen
                name="practice"
                options={{
                    title: "Practice",
                    href: null,
                }}
            />

            <Tabs.Screen
                name="practiceResult"
                options={{
                    title: "Practice Result",
                    href: null,
                }}
            />

            <Tabs.Screen
                name="transcripts"
                options={{
                    title: "Transcript",
                    href: null,
                }}
            />

            <Tabs.Screen
                name="improvement"
                options={{
                    title: "Improvement",
                    href: null,
                }}
            />

            <Tabs.Screen
                name="topicPage"
                options={{
                    title: "Topic Page",
                    href: null,
                }}
            />

            <Tabs.Screen
                name="feedback"
                options={{
                    title: "Feedback",
                    href: null,
                }}
            />

            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    href: null,
                }}
            />

            <Tabs.Screen
                name="notification"
                options={{
                    title: "Notification",
                    href: null,
                }}
            />

        </Tabs>
    );
}