import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import React from 'react';

export default function App() {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  if (!permission) {
    return <View />;
  }
  
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center'}}>
          Enable camera permissions for this app to start identifying colors!
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Camera 
        style={{width: "75%", height: "75%"}}
        type={CameraType.back} 
      ></Camera>
      <View>
        <Text style={styles.textContainer}>Start by taking a photo of your garment!</Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: '50px',
  },
});
