/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { GiftedChat, Bubble, SystemMessage, Day } from 'react-native-gifted-chat';
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";


const Chat = ({ route, navigation, db }) => {
  const { name, backgroundColor, userID } = route.params; // extracts the name and backgroundColor parameters from the route.params object.
  
  const [messages, setMessages] = useState([]);

  // It's called when the component is mounted because the dependency array ([]) is empty. This means it will run only once after the initial render.
  // It dynamically sets the title of the chat screen based on the user's name.
  useEffect(()=> {
    navigation.setOptions({ title: name });
    //  sets the state with a static message so that you’ll be able to see each element of the UI displayed on the screen right away
    
    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
    // onSnapshot() listener is created on a query that targets the messages collection. The createdAt property sorts the query results in descending order - orderBy("createdAt", "desc")
    const unsubMessages = onSnapshot(q, (docs) => {
      let newMessages = [];
      docs.forEach(doc => {
        newMessages.push({ 
          id: doc.id, 
          ...doc.data(),
          createdAt: new Date(doc.data().createdAt.toMillis()),
          // createdAt: message.data().createdAt.toDate(),
        })
      });
      setMessages(newMessages);
    });  
    // Clean up code
    return () => {
      if (unsubMessages) unsubMessages();
    }    
    // setMessages([
    //   {
    //     _id: 1,
    //     text: "Hello developer",
    //     createdAt: new Date(),
    //     user: {
    //       _id: 2,
    //       name: "React Native",
    //       avatar: "https://placeimg.com/140/140/any",
    //     },
    //   },
    //   {
    //     _id: 2,
    //     // text: "This is a system message",
    //     createdAt: new Date(),
    //     system: true, // This property indicates that the message is a system message. System messages are typically used to display non-user-generated messages or notifications. For example, they can be used to show messages like "User A has joined the chat" or "User B has left the chat."
    //   },
    // ]);
  }, []);


  // GiftedChat onSend function
  const  onSend = (newMessages) => {    
    // setMessages(previousMessages => GiftedChat.append(previousMessages, newMessage)) 
    addDoc(collection(db, "messages"), newMessages[0]); // the addDoc() Firestore function to save the passed message to the function in the database. The message to be added is the first item in the newMessages array (newMessages[0])
  }

  const renderSystemMessage = (props) => {
    return <SystemMessage
        {...props}
        textStyle={{color: 'black'}}  // Set the text (which is over the chat) color - to black
      />   
  };

  const renderDay = (props) => {
    return (
      // <View style={{ backgroundColor: 'lightgray', borderRadius: 16, padding: 8 }}>
    <Day 
      {...props}
      textStyle={{color: 'black'}}
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
    {/* // Gifted Chat provides its own component, GiftedChat, that comes with its own props */}
    <GiftedChat 
      messages={messages}
      renderBubble={renderBubble}
      renderSystemMessage={renderSystemMessage}
      renderDay={renderDay}
      onSend={messages => onSend(messages)}
      user={{
        //_id: 1
        _id: userID, // User ID from route.params
        name: name, // Name from route.params
      }}
      placeholder="Type your message here..."

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

});

export default Chat;

