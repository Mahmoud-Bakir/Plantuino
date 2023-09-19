import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import RegisterationScreen from "./screens/RegisterationScreen";
import SigninScreen from "./screens/SigninScreen";
import { StatusBar } from "expo-status-bar";
import BottomTabNavigator from "./Components/BottomTabNavigator";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


function Home() {
  return (
    <BottomTabNavigator/>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="black"/>
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

