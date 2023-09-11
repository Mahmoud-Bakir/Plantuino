import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import RegisterationScreen from './screens/RegisterationScreen';
import SigninScreen from './screens/SigninScreen'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="RegisterScreen" component={RegisterationScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SigninScreen" component={SigninScreen} options={{ headerShown: false }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
