/* eslint-disable react/react-in-jsx-scope */
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Start from './components/Start';
import Chat from './components/Chat';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


// Create the navigator
const Stack = createNativeStackNavigator();

const App = () => {
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
          component={Chat} 
          options={({ route }) => ({ title: route.params.name })} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;


