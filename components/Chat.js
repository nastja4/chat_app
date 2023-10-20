/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { GiftedChat, Bubble, SystemMessage, Day } from 'react-native-gifted-chat';


const Chat = ({ route, navigation }) => {
  const { name, backgroundColor } = route.params; // extracts the name and backgroundColor parameters from the route.params object.
  const [messages, setMessages] = useState([]);

  // It's called when the component is mounted because the dependency array ([]) is empty. This means it will run only once after the initial render.
  // It dynamically sets the title of the chat screen based on the user's name.
  useEffect(()=> {
    navigation.setOptions({ title: name });
    //  sets the state with a static message so that you’ll be able to see each element of the UI displayed on the screen right away
    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
      {
        _id: 2,
        // text: "This is a system message",
        createdAt: new Date(),
        system: true,
      },
    ]);
  }, []);


  const  onSend = (newMessage) => {
    // The setMessages function takes a callback function as its argument, which receives the previous state of the messages as previousMessages. This is a common pattern when you want to update a state based on its previous value.
    // GiftedChat.append method is to append the newMessage to the previousMessages
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessage)) 
  }

  const renderSystemMessage = (props) => {
    return <SystemMessage
        {...props}
        textStyle={{color: 'black'}}  // Set the text (which is befor the chat) color - to black
      />     
  };

  const renderDay = (props) => {
    return (
      // <View style={{ backgroundColor: 'lightgray', borderRadius: 16, padding: 8 }}>
    <Day 
      {...props}
      textStyle={{
        color: 'black'
      }}
    />   
    // </View>
    );    
  };

  const renderBubble = (props) => {
    return <Bubble 
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: "#0148D5"   
        },
        left: {
          backgroundColor: "#FFF"
        }
      }}
    />
  };


 return (
   <View style={[styles.container, { backgroundColor: backgroundColor }]}>    
    {/* <Text style={styles.welcomeText}>Let's chat</Text> */}
    {/* // Gifted Chat provides its own component, GiftedChat, that comes with its own props */}
    <GiftedChat 
      messages={messages}
      renderBubble={renderBubble}
      renderSystemMessage={renderSystemMessage}
      renderDay={renderDay}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1
      }}
      placeholder="Type your message here"

    />
    <KeyboardAvoidingView
      behavior={Platform.OS === 'android' ? 'height' : Platform.OS === 'ios' ? 'padding' : undefined}
    />
   </View>
 );
}


const styles = StyleSheet.create({
 container: {
   flex: 1,
  //  justifyContent: 'center',
  //  alignItems: 'center',
 },

//  welcomeText: {
//   fontSize: 18,
//   fontWeight: '500',
//  },

});

export default Chat;

