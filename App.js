/* eslint-disable react/react-in-jsx-scope */
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Start from './components/Start';
import Chat from './components/Chat';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// initialization a connection for Firestore,
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { LogBox } from 'react-native';
LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';


// Create the navigator
const Stack = createNativeStackNavigator();


const App = () => {
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyB7T-KMjKOPT9qxCUD9a4CCCnM1QEe5X0U",
    authDomain: "chatapp-cc0be.firebaseapp.com",
    projectId: "chatapp-cc0be",
    storageBucket: "chatapp-cc0be.appspot.com",
    messagingSenderId: "691865239512",
    appId: "1:691865239512:web:cdb4226bcd21e443b87cad"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);


  return (
    <NavigationContainer>
      {/* Stack navigators are used in React Navigation to manage a stack of screens, where you can navigate forward (push) and backward (pop). */}
      <Stack.Navigator initialRouteName='Start'>        
        <Stack.Screen 
          name="Start" 
          component={Start} 
          options={{ headerShown: false }} />
        {/* The title in the app bar for the "Chat" screen will be based on the name parameter that you pass when navigating to the "Chat" screen */}
        <Stack.Screen 
          name="Chat" 
          // component={Chat} 
          options={({ route }) => ({ title: route.params.name })} 
          
        > 
          {props => <Chat db={db} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;


