import { Stack } from "expo-router";
import { TabProvider } from "@/contexts/TabContext";

export default function RootLayout() {
  return (
    <TabProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{headerShown: false}} />
      </Stack>
    </TabProvider>
  );
}