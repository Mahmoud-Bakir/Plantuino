import React, { useEffect, Alert } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import RegisterationScreen from "./screens/RegisterationScreen";
import SigninScreen from "./screens/SigninScreen";
import { StatusBar } from "expo-status-bar";
import BottomTabNavigator from "./Components/BottomTabNavigator";
import AddProductScreen from "./screens/AddProductScreen";
import ResultScreen from "./screens/ResultScreen";
import registerNNPushToken from "native-notify";

import "expo-dev-client";
import "firebase/auth";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Home() {
  return <BottomTabNavigator />;
}

export default function App() {
  registerNNPushToken(12377, "YCjAsF4USBdjSLbUwETH8H");

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log("Authorization status:", authStatus);
    }
  }

  return (
    <NavigationContainer>
      <StatusBar backgroundColor="black" />
      <Stack.Navigator>
        <Stack.Screen
          name="SigninScreen"
          component={SigninScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterationScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddProductScreen"
          component={AddProductScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ResultScreen"
          component={ResultScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
