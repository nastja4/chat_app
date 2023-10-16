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
      <Stack.Navigator initialRouteName='Start'>        
        <Stack.Screen name="Start" component={Start} options={{ headerShown: false }} />
        {/* The title in the app bar for the "Chat" screen will be based on the name parameter that you pass when navigating to the "Chat" screen */}
        <Stack.Screen name="Chat" component={Chat} options={({ route }) => ({ title: route.params.name })} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;





// /* eslint-disable react/react-in-jsx-scope */
// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
// import Screen1 from './components/Screen1';
// import Screen2 from './components/Screen2';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// // Create the navigator
// const Stack = createNativeStackNavigator();

// const App = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator
//         initialRouteName='Screen1'
//       >
//         <Stack.Screen 
//           name="Screen1"
//           component={Screen1}
//         />
//         <Stack.Screen 
//           name="Screen2"
//           component={Screen2}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>

//     // <View style={styles.container}>
//     //   <Text>Open up App.js to start working on your app!</Text>
//     //   <StatusBar style="auto" />
//     // </View>
//   );
// }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#fff',
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //   },
// // });

// export default App;