import React from 'react';
import MapScreen from './src/screens/MapScreen';
import StartScreen from './src/screens/StartScreen';
import ContactScreen from './src/screens/ContactScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="StartScreen">
        <Stack.Screen
          name="StartScreen"
          component={StartScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MapScreen"
          component={MapScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ContactScreen"
          component={ContactScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};