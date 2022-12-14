import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FIREBASE_CONFIG, SCREENS } from './misc/Constants.js';
import LandingScreen from './components/auth/Landing';
import RegisterScreen from './components/auth/Register';
import LoginScreen from './components/auth/Login';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import AppLoading from 'expo-app-loading';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './components/redux/reducers';
import MainScreen from './components/Main.js';
import thunk from 'redux-thunk';
import SaveScreen from './components/main/Save.js';

const Stack = createNativeStackNavigator();
const store = createStore(rootReducer, applyMiddleware(thunk));

export default function App() {
  initializeApp(FIREBASE_CONFIG);
  const [loggedIn, setLoggedIn] = useState(null)
  const [loaded, setLoaded] = useState(null)

  getAuth().onAuthStateChanged((user) => {
    if (!user) {
      setLoaded(true)
      setLoggedIn(false)
    } else {
      setLoaded(true)
      setLoggedIn(true)
    }
  })

  if (!loaded) return <AppLoading />

  if (!loggedIn) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={SCREENS.landing}>
          <Stack.Screen name={SCREENS.landing} component={LandingScreen} options={{ headerShown: false }} />
          <Stack.Screen name={SCREENS.register} component={RegisterScreen} />
          <Stack.Screen name={SCREENS.login} component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  } else {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={SCREENS.main}>
            <Stack.Screen name={SCREENS.main} component={MainScreen} options={{ headerShown: false }} />
            <Stack.Screen name={SCREENS.save} component={SaveScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    )
  }
}