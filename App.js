import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SCREENS } from './misc/Constants.js';
import LandingScreen from './components/auth/Landing';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={SCREENS.landing} screenOptions={{ headerShown: false }} >
        <Stack.Screen name={SCREENS.landing} component={LandingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}