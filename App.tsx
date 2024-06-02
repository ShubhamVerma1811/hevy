import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Home } from "./src/screens";
import { Add } from "./src/screens/Add";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    "Karla-Bold": require("./src/assets/fonts/Karla/Karla-Bold.ttf"),
    "Karla-ExtraBold": require("./src/assets/fonts/Karla/Karla-ExtraBold.ttf"),
    "Karla-ExtraLight": require("./src/assets/fonts/Karla/Karla-ExtraLight.ttf"),
    "Karla-Light": require("./src/assets/fonts/Karla/Karla-Light.ttf"),
    "Karla-Medium": require("./src/assets/fonts/Karla/Karla-Medium.ttf"),
    "Karla-Regular": require("./src/assets/fonts/Karla/Karla-Regular.ttf"),
    "Karla-SemiBold": require("./src/assets/fonts/Karla/Karla-SemiBold.ttf"),
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1">
        <NavigationContainer>
          <Stack.Navigator>
            <Tab.Screen
              name="Home"
              component={Home}
              options={{
                header: () => null,
                headerTitle: "Hevy",
              }}
            />
            <Stack.Screen
              name="Add"
              component={Add}
              options={{
                headerTitle: "Add",
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
