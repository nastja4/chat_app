/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, ImageBackground, TouchableOpacity, Image, KeyboardAvoidingView, Platform, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Svg, { Path } from 'react-native-svg';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { getAuth, signInAnonymously } from "firebase/auth";


const Start = ({ navigation }) => {
  const [name, setName] = useState('');
  const [backgroundColor, setbackgroundColor] = useState('#F8A387'); // (coral) set the default backgrcolor

  const auth = getAuth();

  const signInUser = () => {
    signInAnonymously(auth)
      .then(result => {
        navigation.navigate("Chat", {
          userID: result.user.uid, 
          name: name, 
          backgroundColor: backgroundColor
        });
        // Alert.alert("Signed in Successfully!");
      })
      .catch((error) => {
        Alert.alert("Unable to sign in, try later again.", error);
      })
  }


  return (    
    // <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
    
    <ImageBackground 
      source={require('../assets/Background-image.png')} 
      style={styles.StartImage} 
      accessibilityLabel="Large image of sakura"
    >
      <View style={styles.mainContainer}>
      {/* <KeyboardAwareScrollView
        contentContainerStyle={styles.containerMain}
        enableOnAndroid={true}
        extraScrollHeight={Platform.OS === 'ios' ? 30 : 0}
      > */}
        <View style={styles.container}>
          {/* <Text style={styles.appTitle}>Bona Chat</Text> */}
          <Image 
            source={require('../assets/bona-chat2.png')} 
            style={styles.logoImage} 
            accessibilityLabel="Bona Chat Logo"
          />    
        </View >  
        
        {/* <KeyboardAvoidingView
          behavior="padding" // This will move the `inputContainer` up without resizing
          style={[styles.container, styles.inputContainer]}
        > */}
        <View style={[styles.container, styles.inputContainer]}> 
          <View style={styles.textInputSector}>
            <View style={styles.inputContent}>             
              <Svg
                style={styles.icon}
                accessibilityLabel="User Icon"
                width={30}
                height={30}
                viewBox="-8 -5 30 30"
              >
                <Path 
                  d="M12,13.2533333 C15.24,13.2533333 21.6,14.830125 21.6,18.105 L21.6,20.5308333 L2.4,20.5308333 L2.4,18.105 C2.4,14.830125 8.76,13.2533333 12,13.2533333 Z M20.64,19.5708333 L20.64,18.105 C20.64,16.0913979 15.9773097,14.2133333 12,14.2133333 C8.02269035,14.2133333 3.36,16.0913979 3.36,18.105 L3.36,19.5708333 L20.64,19.5708333 Z M12,11.36 C9.624,11.36 7.68,9.443 7.68,7.1 C7.68,4.757 9.624,2.84 12,2.84 C14.376,2.84 16.32,4.757 16.32,7.1 C16.32,9.443 14.376,11.36 12,11.36 Z M12,10.4 C13.8487889,10.4 15.36,8.90977792 15.36,7.1 C15.36,5.29022208 13.8487889,3.8 12,3.8 C10.1512111,3.8 8.64,5.29022208 8.64,7.1 C8.64,8.90977792 10.1512111,10.4 12,10.4 Z" 
                  fill="#000" 
                  />
              </Svg>             
              {/* <Icon name="user" style={styles.icon} /> */}
              <TextInput 
                style={styles.textInput}
                value={name}
                onChangeText={setName}
                placeholder='Your name'
                accessibilityLabel="Enter your name"
                caretHidden={true} // Hide the cursor
                selectionColor="black" // the desired cursor color
              />
            </View>
          </View>

          <View style={styles.BgColorSelector}>
            <Text style={styles.textBgColorSelector}>Choose background color:</Text>
            <View style={styles.colorOptionsContainer}>
              <TouchableOpacity 
                style={[
                  styles.coloredCircle,
                  backgroundColor === '#F8A387' && styles.selectedCircle,
                  {backgroundColor: '#F8A387'} // 1.coral          
                ]}
                accessibilityLabel="Define the coral background color for the chat option"
                onPress={() => setbackgroundColor('#F8A387') }
              />                      
              <TouchableOpacity 
                style={[
                  styles.coloredCircle,
                  backgroundColor === '#85B80F' && styles.selectedCircle,
                  {backgroundColor: '#85B80F'} // 2.light green          
                ]}     
                accessibilityLabel="Define the light green background color for the chat option"       
                onPress={() => setbackgroundColor('#85B80F') }
              />
              <TouchableOpacity 
                style={[
                  styles.coloredCircle,
                  backgroundColor === '#E4A5C4' && styles.selectedCircle,
                  {backgroundColor: '#E4A5C4'} // 3.violet          
                ]}
                accessibilityLabel="Define the violet background color for the chat option"
                onPress={() => setbackgroundColor('#E4A5C4') }
              />
              <TouchableOpacity 
                style={[
                  styles.coloredCircle,
                  backgroundColor === '#D9F7F7' && styles.selectedCircle,
                  {backgroundColor: '#D9F7F7'} // 4.light teal          
                ]}
                accessibilityLabel="Define the light teal background color for the chat option"
                onPress={() => setbackgroundColor('#D9F7F7') }
              />            
            </View>
          </View>

          <TouchableOpacity 
            style={styles.startChattingBtn}
            title="Start Chatting"
            accessibilityLabel="Confirm the swithch to the chat option"
            accessibilityRole="button"
            // onPress={() => navigation.navigate('Chat', { name: name, backgroundColor: backgroundColor } )}
            onPress={signInUser}
          >
            <Text style={styles.startChattingButtonText}>Start Chatting</Text>
          </TouchableOpacity>
        </View>

        {/* </KeyboardAvoidingView>   */}
      {/* </KeyboardAwareScrollView>         */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'android' ? 'height' : Platform.OS === 'ios' ? 'padding' : undefined}
      />
      </View> 
    </ImageBackground> 
    
    // </KeyboardAvoidingView>  
  );
}

const styles = StyleSheet.create({

  mainContainer: {
    flex: 1,
  },

  StartImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',   
  },

  container: {
    flex: 1,
    justifyContent: 'center',  // Center items vertically
    alignItems: 'center',
    padding: '3%',
    margin: '6%',
  }, 

  logoImage: {
    width: 600, 
    height: 600, 
    resizeMode: 'contain', 
  },

  inputContainer: {        // white conainer with elements
    backgroundColor: 'white',  
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',  
  },

  textInputSector: {                        // box for the input
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    width: '100%',
    borderColor: '#000000',
    height: 55,
  },

  inputContent: {  // (svg + textInput) content
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    opacity: 0.7,
  },

  icon: {
    // fontSize: 22, // the desired font size for the icon 'user'
    // marginHorizontal: 10,
  },
  // iconContainer: {
  //   alignItems: 'center',  // Center vertically
  //   marginHorizontal: 10,   
  // }, 

  textInput: {    
    fontSize: 18,
    padding: 10,  
    width: '100%',  
  },

  BgColorSelector: {                        // "Choose background color:" + colorOptions
    width: '100%',
  },

  textBgColorSelector: {  
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 10,
    width: '100%',    
  },

  colorOptionsContainer: {
    flexDirection: 'row',        
    width: '100%',    
  },

  coloredCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,          
    borderWidth: 1, 
    borderColor: 'rgba(0, 0, 0, 0.7)',  
    marginHorizontal: 10,   
  },

  selectedCircle: {    
    borderWidth: 3,     
},

  startChattingBtn: {                         // blue Button
    backgroundColor: '#0039BF', // bright blue  
    borderRadius: 8,    
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 55,
  },

  startChattingButtonText: {                 
    color: '#FFFFFF',
    fontSize: 18,
    // fontWeight: 'bold',
  },
    
});

export default Start;

