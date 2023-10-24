/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { GiftedChat, Bubble, SystemMessage, Day, isSameDay, InputToolbar } from 'react-native-gifted-chat';
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomActions from './CustomActions';
import MapView from 'react-native-maps';


const Chat = ({ route, navigation, db, isConnected, storage }) => {
  const { name, backgroundColor, userID } = route.params; // extracts the name and backgroundColor parameters from the route.params object.
  const [messages, setMessages] = useState([]);    

  // outside the useEffect() in order not to lose the reference to the old unsubscribe function
  let unsubMessages;
  
  useEffect(()=> {
    // It dynamically sets the title of the chat screen based on the user's name.
    navigation.setOptions({ title: name });
    
    if (isConnected === true) {
      // unregister current onSnapshot() listener to avoid registering multiple listeners when
      // useEffect code is re-executed.
      if (unsubMessages) unsubMessages();
      unsubMessages = null;

      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
      // onSnapshot() listener is created on a query that targets the messages collection. The createdAt property sorts the query results in descending order - orderBy("createdAt", "desc")
      unsubMessages = onSnapshot(q, (docs) => {
        let newMessages = [];  
        docs.forEach(doc => {
          const messageData = doc.data();
          const createdAt = new Date(messageData.createdAt.toMillis());            

          newMessages.push({ 
            _id: doc.id, 
            ...messageData,
            createdAt,

            // _id: 1,
            // text: 'My message',
            // createdAt: new Date(Date.UTC(2016, 5, 11, 17, 20, 0)),
            // user: {
            //   _id: 2,
            //   name: 'React Native',
            //   avatar: 'https://facebook.github.io/react-native/img/header_logo.png',
            // },
            // image: 'https://facebook.github.io/react-native/img/header_logo.png',
          });        
        });
        cacheMessages(newMessages);
        setMessages(newMessages);
      });  
    } else loadCachedMessages();

    // Clean up code
    return () => {
      if (unsubMessages) unsubMessages();
    }     
  }, [isConnected]);    // Passing isConnected to the dependency array of useEffect(). As a result, Chat’s useEffect() callback function can be called multiple times (not once the component is mounted), as isConnected’s status can change at any time.
  

  // Uses AsyncStorage.setItem method to store the messagesToCache array as a JSON string under the 'messages' key
  const cacheMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(messagesToCache));
    } catch (error) {
      console.log(error.message);
    }
  };

  // This function is called if the isConnected prop is false in useEffect(). Fetches the data from AsyncStorage
  const loadCachedMessages = async () => {
    const cachedMessages = await AsyncStorage.getItem('messages') || [];
    setMessages(JSON.parse(cachedMessages));
  };


  // GiftedChat onSend function
  const  onSend = (newMessages) => {    
    // setMessages(previousMessages => GiftedChat.append(previousMessages, newMessage)) 
    addDoc(collection(db, "messages"), newMessages[0]); // the addDoc() Firestore function to save the passed message to the function in the database. The message to be added is the first item in the newMessages array (newMessages[0])
  }

  const renderInputToolbar = (props) => 
    (isConnected ? <InputToolbar {...props} /> : null);  

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

  const renderCustomActions = (props) => {
    return <CustomActions storage={storage} userID={userID} {...props} />;
  }

  // renders the map in a message bubble
  const renderCustomView = (props) => {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{width: 150,
            height: 100,
            borderRadius: 13,
            margin: 3}}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }
    return null;
  }


 return (
   <View style={[styles.container, { backgroundColor: backgroundColor }]}>    
    {/* // Gifted Chat provides its own component, GiftedChat, that comes with its own props */}
    <GiftedChat 
      messages={messages}      
      renderInputToolbar={renderInputToolbar}
      renderBubble={renderBubble}
      renderSystemMessage={renderSystemMessage}
      renderDay={renderDay}
      onSend={messages => onSend(messages)}
      renderActions={renderCustomActions}
      renderCustomView={renderCustomView}
      user={{
        //_id: 1
        _id: userID, // User ID from route.params
        name: name, // Name from route.params
        // avatar: "https://placeimg.com/140/140/any",
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

