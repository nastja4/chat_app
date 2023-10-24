# React Native Chat App

A mobile chat application built with React Native and Expo, offering real-time chat, image sharing, and location sharing features. This app provides an accessible chat interface for users to communicate with friends and family.

Screenshot:

<img src="https://github.com/nastja4/chat_app/assets/126527606/37764c9d-e46c-4fca-ae12-18acae21079a" alt="Image" width="250">

<img src="https://github.com/nastja4/chat_app/assets/126527606/96113e2d-fcd6-4b61-b5c3-ae29ed558294" alt="Image" width="250">

<img src="https://github.com/nastja4/chat_app/assets/126527606/20a155a7-581c-409c-8287-cb14e09b4973" alt="Image" width="250">

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technical Requirements](#technical-requirements)
- [Getting Started](#getting-started)
- [Dependencies](#dependencies)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This chat application is developed using React Native and Expo, making it compatible with both Android and iOS devices. It leverages Google Firestore Database to store chat messages online and offline. Users can also send images from their device's library and share their location via a map view.

## Features

- User-friendly chat interface.
- Real-time chat functionality.
- Ability to send text messages, images, and locations.
- Offline access to chat conversations.
- Accessibility considerations for screen reader compatibility.

## Technical Requirements

- React Native and Expo for app development.
- Gifted Chat library for chat interface and functionality.
- Google Firestore Database for chat message storage.
- Firebase authentication for anonymous user authentication.
- Async Storage for local chat message storage.
- Firebase Cloud Storage for image storage.
- Geolocation for retrieving user location.

## Getting Started

Follow these steps to set up and run this React Native project using Expo.

### Prerequisites

Before you begin, ensure you have the following tools and accounts set up:

- Node.js (version 16.19.0 recommended)
- Expo CLI: You can install it globally with npm using the following command:

```
npm install -g expo-cli
```
- Expo Go App: Install the Expo Go app on your mobile device from the relevant app store (iOS or Android).

- Expo Account: Create an Expo account by visiting the [Expo signup page](https://expo.dev/signup).

### Installation

1. Clone this repository to your local machine or download the ZIP file and extract it.

2. Navigate to the project directory in your terminal.

3. Run the following command to install project dependencies:
```
npm install
```

You'll need to install React Navigation and related dependencies to enable screen navigation and other features. Run the following command in your project directory:

\- React Navigation:
```
npm install --save @react-navigation/native @react-navigation/native-stack
expo install react-native-screens react-native-safe-area-context
```

\- Gifted Chat:
```
npm install react-native-gifted-chat --save
```

\- Firestore:
```
npm install firebase@10.3.1 --save
```

\- Local Storage in React Native:
```
expo install @react-native-async-storage/async-storage
```

\- NetInfo for Detecting a Network Connection:
```
expo install @react-native-community/netinfo
```

\- Expo’s Location API:
```
expo install expo-location
expo install react-native-maps
```

\- Expo-media-library:
```
expo install expo-media-library
```

\- Expo's ImagePicker API:
```
expo install expo-image-picker
```

### Running the App

#### On your mobile device with the Expo Go app.

1. Start the development server by running:

    ```
    npm start
    ```

2. Make sure your computer and mobile device are connected to the same network (LAN or WiFi).

3. On your mobile device, open the Expo Go app.

4. You can run the app on your device using one of the following methods:

   - Scan the QR code displayed in your terminal or on the web interface.
   - If you are using an iPhone, you can click the link sent via email after scanning.
   - Select the project from the list of development servers in the Expo Go app.

#### To run the app on your local development environment, you can use either an Android emulator (for Windows, macOS, and Linux users) or an iOS simulator (for macOS users).

- Android Emulator
1. Download and Install Android Studio:
   
Before setting up the Android Emulator, you'll need to download and install Android Studio. You can download it from the official website here.

2. Set Up Android Emulator:

After installing Android Studio, set up the Android Emulator by following these steps:
Open Android Studio.
Click on "More Actions," then select "Virtual Device Manager."
Choose "Create Virtual Device" and select a device that suits your needs, ensuring it includes the Google Play Store.
Download and install the necessary System Image (API level) for the device.
Adjust the emulator's storage size, typically to 4096 MB.
Click "Finish" to complete the setup.

3. Start the Emulator:

In the Virtual Device Manager, you'll see your newly created emulator. Click "Play" to start the emulator.

4. Connect with Expo Metro Bundler:

In your project directory, open a terminal.
Run your React Native project with expo start.
Press "a" in the Metro Bundler terminal to build and open the app in the emulator.
The Expo Go mobile app will be installed on your virtual device, and your project will be launched.

- iOS Simulator (Mac Users Only)

If you're using macOS, you can use an iOS simulator:

1. Open the iOS Simulator:

Ensure you have Xcode and Xcode Command Line Tools installed on your Mac. You can install Xcode from the App Store.
Open a terminal and run the command open -a Simulator to open the iOS simulator.

2. Run Your App:

Keep the simulator running in the background.
Launch the Metro Bundler by running expo start in your project directory.
Press "i" to run the app on the iOS simulator.

3. Change Device (Optional):

To change the simulated iOS device, click the "File" menu in the simulator, hover over "Open Simulator," then pick the device you want to use.

4. Enable Keyboard Input (if needed):

To let the keyboard appear when you press on a TextInput, go to the "I/O" menu, then navigate to "Keyboard" and uncheck "Connect Hardware Keyboard." Note that this setting may need to be adjusted when changing the simulator device.

By following these steps, you can run and test your app in either the Android emulator or iOS simulator, depending on your development environment.

### Customizing the App

To customize the app, open the `App.js` file and make changes to the code. Save your changes, and the app will automatically update on your mobile device.

## Dependencies

```
{
  "name": "chat_app",
  "version": "1.0.0",
  "main": "node_modules/expo/AppEntry.js",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web"
  },
  "dependencies": {
    "@expo/webpack-config": "^19.0.0",
    "@react-native-async-storage/async-storage": "1.18.2",
    "@react-navigation/native": "^6.1.8",
    "@react-navigation/native-stack": "^6.9.14",
    "expo": "~49.0.13",
    "expo-status-bar": "~1.6.0",
    "firebase": "^10.3.1",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "react-native": "0.72.6",
    "react-native-gifted-chat": "^2.4.0",
    "react-native-keyboard-aware-scroll-view": "^0.9.5",
    "react-native-safe-area-context": "4.6.3",
    "react-native-screens": "~3.22.0",
    "react-native-svg": "13.9.0",
    "react-native-vector-icons": "^10.0.0",
    "react-native-web": "~0.19.6",
    "@react-native-community/netinfo": "9.3.10",
    "expo-location": "~16.1.0",
    "react-native-maps": "1.7.1",
    "expo-media-library": "~15.4.1",
    "expo-image-picker": "~14.3.2"
  },
  "devDependencies": {
    "@babel/core": "^7.20.0"
  },
  "private": true
}
```

- [React Native](https://reactnative.dev/): A framework for building native mobile applications using JavaScript and React.
- [Expo](https://expo.io/): An open-source framework and platform for building React Native applications.
- [Gifted Chat](https://github.com/FaridSafi/react-native-gifted-chat): A library for building chat interfaces in React Native applications.
- [Firebase](https://firebase.google.com/): A cloud-based platform by Google that provides various services for developing mobile and web applications.
- [React Navigation](https://reactnavigation.org/): A library for navigation and routing in React Native applications.

## Contributing

If you'd like to contribute to this project, please open an issue and discuss the changes you would like to make.

## License
