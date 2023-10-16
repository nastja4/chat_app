/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, ImageBackground, TouchableOpacity, Image, KeyboardAvoidingView} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
// import { Svg, Image as SvgImage } from 'react-native-svg';


const Start = ({ navigation }) => {
  const [name, setName] = useState('');
  const [backgroundColor, setbackgroundColor] = useState('#F8A387'); // (coral) set the default backgrcolor


  return (    
    // <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>

    <ImageBackground source={require('../assets/Background-image.png')} style={styles.StartImage} >
      <View style={styles.container}>
        {/* <Text style={styles.appTitle}>Bona Chat</Text> */}
        <Image source={require('../assets/bona-chat.png')} style={{ width: 600, height: 600 }} />    
      </View >  
      
      <View style={[styles.container, styles.inputContainer]}> 
        <View style={styles.textInputSector}>
          <View style={styles.inputContent}>          
            <Icon name="user" style={styles.icon} />
            <TextInput 
              style={styles.textInput}
              value={name}
              onChangeText={setName}
              placeholder='Your name'
              caretHidden={true} // Hide the cursor
              selectionColor="black" // the desired cursor color
            />
          </View>
        </View>

        <Text style={styles.textBgColorSelectot}>Choose background color:</Text>
        <View style={styles.colorOptionsContainer}>
          <TouchableOpacity 
            style={[
              styles.coloredCircle,
              backgroundColor === '#F8A387' && styles.selectedCircle,
              {backgroundColor: '#F8A387'} // 1.coral          
            ]}
            onPress={() => setbackgroundColor('#F8A387') }
          />                      
          <TouchableOpacity 
            style={[
              styles.coloredCircle,
              backgroundColor === '#85B80F' && styles.selectedCircle,
              {backgroundColor: '#85B80F'} // 2.light green          
            ]}            
            onPress={() => setbackgroundColor('#85B80F') }
          />
          <TouchableOpacity 
            style={[
              styles.coloredCircle,
              backgroundColor === '#E4A5C4' && styles.selectedCircle,
              {backgroundColor: '#E4A5C4'} // 3.violet          
            ]}
            onPress={() => setbackgroundColor('#E4A5C4') }
          />
          <TouchableOpacity 
            style={[
              styles.coloredCircle,
              backgroundColor === '#D9F7F7' && styles.selectedCircle,
              {backgroundColor: '#D9F7F7'} // 4.light teal          
            ]}
            onPress={() => setbackgroundColor('#D9F7F7') }
          />            
        </View>

        <TouchableOpacity 
          style={styles.startChattingBtn}
          onPress={() => navigation.navigate('Chat', { name: name, backgroundColor: backgroundColor } )}
        >
          <Text style={styles.startChattingButtonText}>Start Chatting</Text>
        </TouchableOpacity>

      </View>        
    </ImageBackground>  
    // </KeyboardAvoidingView>  
  );
}

const styles = StyleSheet.create({
  StartImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',    
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: '3%',
    margin: '6%',
  }, 

  textInputSector: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    padding: 3,
    width: '100%',
    borderColor: '#000000',
  },

  inputContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    opacity: 0.7,
  },

  icon: {
    fontSize: 18, // the desired font size for the icon 'user'
    marginRight: 5,
  },

  // appTitle: {    
  //   fontSize: 55,
  //   fontWeight: '800',
  //   color: '#0039BF',  // bright blue  
  // },

  inputContainer: {
    backgroundColor: 'white',    
  },

  textInput: {    
    flex: 1,
    fontSize: 14,
    padding: 5,    
  },

  textBgColorSelectot: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
    width: '100%',
    marginTop: 35,
  },

  colorOptionsContainer: {
    flexDirection: 'row',        
    width: '100%',
    marginBottom: 35,
  },

  coloredCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,          
    borderWidth: 1, 
    borderColor: 'rgba(0, 0, 0, 0.7)',  
    marginHorizontal: 10,   
  },

  selectedCircle: {    
    borderWidth: 3,     
},

  startChattingBtn: {
    backgroundColor: '#0039BF', // bright blue  
    borderRadius: 5,    
    height: 40,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  startChattingButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
    
});

export default Start;

