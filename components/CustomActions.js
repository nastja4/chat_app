/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { StyleSheet, View, Text, Alert } from 'react-native';
import { TouchableOpacity } from "react-native";
import { useActionSheet } from '@expo/react-native-action-sheet';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";


const CustomActions = ({ wrapperStyle, iconTextStyle, 
  onSend, storage, userID }) => {

  const actionSheet = useActionSheet(); 
  
  const onActionPress = () => {
    const options = [
      'Choose from Library', 
      'Take Picture', 
      'Send Location', 
      'Cancel'
    ];
    const cancelButtonIndex = options.length - 1;
    actionSheet.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            pickImage();
            return;
          case 1:
            takePhoto();
            return;
          case 2:
            getLocation();
            return;
          default:
        }
      },      
    );
  };


  // for using the unique reference string each time a new file is uploaded. The argument represents the picked image’s URI
  const generateReference = (uri) => {
    const timeStamp = (new Date()).getTime();
    const imageName = uri.split("/")[uri.split("/").length - 1];
    return `${userID}-${timeStamp}-${imageName}`;
  };

  // code for uploading and sending the image as a message
  const uploadAndSendImage = async (imageURI) => {
    const uniqueRefString = generateReference(imageURI);
    const newUploadRef = ref(storage, uniqueRefString);
    const response = await fetch(imageURI);
    const blob = await response.blob();  // The conversion of the fetched from the given URI content (a picked image) from the given URI to a blob (a “binary large object”)
    uploadBytes(newUploadRef, blob).then(async (snapshot) => {
      const imageURL = await getDownloadURL(snapshot.ref);
      onSend({ image: imageURL });
    });
  };

  const pickImage = async () => {
    try {
      let permissions = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
      if (permissions?.granted) {
        let result = await ImagePicker.launchImageLibraryAsync();
  
        if (!result.canceled) {
          await uploadAndSendImage(result.assets[0].uri);
        } else {
          // User canceled image selection
          Alert.alert('Image selection canceled', 'You did not select an image.');
        }
      } else {
        // Permissions haven't been granted
        Alert.alert('Permission denied', 'You need to grant access to the media library to select an image.');
      }
    } catch (error) {
      // Handle any unexpected errors here
      console.error('An error occurred:', error);
    }
  };  

  const takePhoto = async () => {
    let permissions = await ImagePicker.requestCameraPermissionsAsync();
    if (permissions?.granted) {
      let result = await ImagePicker.launchCameraAsync();
      if (!result.canceled) await uploadAndSendImage(result.assets[0].uri);  
      else Alert.alert("Permissions haven't been granted.");
    }
  };

  const getLocation = async () => {
    let permissions = await Location.requestForegroundPermissionsAsync();
    if (permissions?.granted) {
      const location = await Location.getCurrentPositionAsync({});
      if (location.coords) {
        onSend({
          location: {
            longitude: location.coords.longitude,
            latitude: location.coords.latitude,
          },
        });        
      } else Alert.alert("Error occurred while fetching location");
    } else Alert.alert("Permissions haven't been granted.");
  };

  return (
    //  TouchableOpacity’s used as a wrapper that reduces the button’s opacity when it’s pressed down
    <TouchableOpacity     
      style={styles.container} 
      onPress={onActionPress}
      accessibilityRole="button"
      accessibilityState={{ disabled: false }}
      accessibilityLabel="Open Action Menu with the options for fotos and location 'Choose from Library',
        'Take Picture', 'Send Location', 'Cancel'"    
    > 
      <View style={[styles.wrapper, wrapperStyle]}>
        <Text style={[styles.iconText, iconTextStyle]}>+</Text>
      </View>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10,
  },
  wrapper: {
    borderRadius: 13,
    borderColor: '#b2b2b2',
    borderWidth: 2,
    flex: 1,
    justifyContent: 'center', // Center horizontally
    alignItems: 'center',
  },
  iconText: {
    color: '#b2b2b2',
    // fontWeight: 'bold',
    fontSize: 24,
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginTop: -8,
    marginRight: -1,

  },
});

export default CustomActions;