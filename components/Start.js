/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, ImageBackground, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';


const Start = ({ navigation }) => {
  const [name, setName] = useState('');
  const [backgroundColor, setbackgroundColor] = useState('#F8A387'); // (coral) set the default backgrcolor


  return (    
    <ImageBackground source={require('../assets/Background-image.png')} style={styles.StartImage} >
      <View style={styles.container}>
        {/* <Text style={styles.appTitle}>Bona Chat</Text> */}
        <Image source={require('../assets/bona-chat.png')} style={{ width: 600, height: 600 }} />    
      </View >  
      <View style={[styles.container, styles.inputContainer]}> 
        <View style={styles.inputSector}>
          {/* <Icon name='user' style={styles.icon} /> */}
          {/* <Image source={require('../assets/icon.svg')} style={styles.icon}/> */}
          <TextInput 
            style={styles.textInput}
            value={name}
            onChangeText={setName}
            placeholder='Your name'
          />
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
          >            
          </TouchableOpacity>


          <TouchableOpacity 
            style={[
              styles.coloredCircle,
              backgroundColor === '#85B80F' && styles.selectedCircle,
              {backgroundColor: '#85B80F'} // 2.light green          
            ]}
            // style={[
            //   styles.coloredCircle,
            //   styles.selectedCircle,
            //   {backgroundColor: '#85B80F'} // light green          
            // ]}
            onPress={() => setbackgroundColor('#85B80F') }
          />
          <TouchableOpacity 
            style={[
              styles.coloredCircle,
              {backgroundColor: '#E4A5C4'} // 3.violet          
            ]}
            onPress={() => setbackgroundColor('#E4A5C4') }
          />
          <TouchableOpacity 
            style={[
              styles.coloredCircle,
              {backgroundColor: '#D9F7F7'} // 4.light teal          
            ]}
            onPress={() => setbackgroundColor('#D9F7F7') }
          />            
        </View>

        <TouchableOpacity 
          style={styles.startChattingBtn}
          onPress={() => navigation.navigate('Chat', { name: name, backgroundColor: backgroundColor })}
        >
          <Text style={styles.startChattingButtonText}>Start Chating</Text>
        </TouchableOpacity>

      </View>                
    </ImageBackground>    
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

  inputSector: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    borderColor: 'lightgray',
  },

  icon: {
    fontSize: 20, // Set the desired font size for the icon
    marginRight: 10,
  },

  appTitle: {    
    fontSize: 55,
    fontWeight: '800',
    color: '#0039BF',  // bright blue  
  },

  inputContainer: {
    backgroundColor: 'white',
    // padding: '5%',  
  },

  textInput: {
    // height: 40,
    // width: "100%",
    // paddingHorizontal: '3%',
    // borderWidth: 2,
    // borderRadius: 5,
    flex: 1,
    padding: 0,

    // borderColor: 
    // marginTop: 15,
    // marginBottom: 15,
    // alignSelf: 'center',
    // marginBottom: 30,
  },

  textBgColorSelectot: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 15,
    width: '100%',
    marginTop: 35,
  },

  colorOptionsContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',     
    width: '100%',
    marginBottom: 35,
  },

  coloredCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    margin: 10,      
    backgroundColor: 'transparent',
    borderWidth: 2,    
  },

  selectedCircle: {
    borderColor: 'blue', // Change the border color when selected
    backgroundColor: 'yellow',
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













// /* eslint-disable react/react-in-jsx-scope */
// import { useState } from 'react';
// import { StyleSheet, View, Text, Button, TextInput } from 'react-native';

// const Screen1 = ({ navigation }) => {
// const [name, setName] = useState('');

//   return (
//     <View style={styles.container}>
//       <Text>Hello Screen1</Text>
//       <TextInput 
//         style={styles.textInput}
//         value={name}
//         onChangeText={setName}
//         placeholder='Type your username here'
//       />
//       <Button 
//         title="Go to Screen2"
//         onPress={() => navigation.navigate('Screen2', { name: name })}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   textInput: {
//     width: "88%",
//     padding: 15,
//     borderWidth: 1,
//     marginTop: 15,
//     marginBottom: 15
//   }
// });

// export default Screen1;