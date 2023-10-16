/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';


const Chat = ({ route, navigation }) => {
  const { name, backgroundColor } = route.params; // extracts the name and backgroundColor parameters from the route.params object.

  // It's called when the component is mounted because the dependency array ([]) is empty. This means it will run only once after the initial render.
  // It dynamically sets the title of the chat screen based on the user's name.
  useEffect(()=> {
    navigation.setOptions({ title: name });
  }, []);


 return (
   <View style={[styles.container, { backgroundColor: backgroundColor }]}>
     <Text style={styles.welcomeText}>Let's chat</Text>
   </View>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center'
 },

 welcomeText: {
  fontSize: 18,
  fontWeight: '500',
 },
});

export default Chat;

