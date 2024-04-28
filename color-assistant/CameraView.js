import { Button, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets, SafeAreaView } from 'react-native-safe-area-context';
import { Camera, CameraType } from 'expo-camera';
import React from 'react';
import { counterEvent } from 'react-native/Libraries/Performance/Systrace';

export default function CameraView() {
  const insets = useSafeAreaInsets();
  const [permission, requestPermission] = Camera.useCameraPermissions();
  if (!permission) {
    return <View />;
  }
  
  if (!permission.granted) {
    return (
        <SafeAreaView style={styles.container}>
          <Text style={{ textAlign: 'center'}}>
            Enable camera permissions for this app to start identifying colors!
          </Text>
          <Button onPress={requestPermission} title="grant permission" />
        </SafeAreaView>
    );
  }

  return (
      <SafeAreaView style={styles.container}>
        <Camera 
          style={styles.camera}
          type={CameraType.back} 
        ></Camera>
        <Text style={styles.textContainer}>Start by taking a photo of your garment!</Text>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    camera: {
      marginInline: "auto",
      width: "75%",
      height: "75%"
    },
    textContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: '50px',
    },
  });