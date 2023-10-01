import React, { useEffect } from "react";
import io from "socket.io-client";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegisterationScreen from "./screens/RegisterationScreen";
import SigninScreen from "./screens/SigninScreen";
import { StatusBar } from "expo-status-bar";
import BottomTabNavigator from "./Components/BottomTabNavigator";
import AddProductScreen from "./screens/AddProductScreen";
import ResultScreen from "./screens/ResultScreen";
import registerNNPushToken from "native-notify";
import store from "./Redux/Store";
import { Provider } from "react-redux";
import "expo-dev-client";
import "firebase/auth";
import AnalyticsScreen from "./screens/AnalyticsScreen";
import HomeScreen from "./screens/HomeScreen";

const Stack = createNativeStackNavigator();
function Home() {
  return <BottomTabNavigator />;
}

export default function App() {

  return (
    <Provider store={store}>
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
          <Stack.Screen
            name="AnalyticsScreen"
            component={AnalyticsScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
