import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCameraPermissions } from 'expo-camera';
import { Image } from 'expo-image';
import { useState } from 'react';
import React from 'react';
import { Camera, CameraType} from 'expo-camera/legacy';

import TextButton from './TextButton';
import IconButton from './IconButton';

export default function CameraView() {
  const [permission, requestPermission] = useCameraPermissions();
	const [picture, setPicture] = useState(null);
	const [confirm, setConfirm] = useState(false); 
  const [flash, setFlash] = useState(false);

	let camera;
  
	const takePicture = async() => {
		if (!camera) return;
		const photo = await camera.takePictureAsync();
		setPicture(photo);
		setConfirm(true);
	}	  

	const retakePicture = () => {
		setPicture(null);
		setConfirm(false);
	}

  if (!permission) {
    return (
		<SafeAreaView>
			<Text style={{ textAlign: 'center', margin: 'auto'}}>
				Please go to settings to enable camera permissions!
			</Text>
		</SafeAreaView>
	);
  }
  
  if (!permission.granted) {
    return (
			<SafeAreaView style={styles.container}>
				<Text style={{ textAlign: 'center', margin: 'auto'}}>
					Enable camera permissions for this app to start identifying colors!
				</Text>
				<Button style={styles.textContainer} onPress={requestPermission} title="Grant Permission" />
			</SafeAreaView>
    );
  }

  return (
      (picture && confirm) ? (
        <SafeAreaView style={styles.container}>
          <Image 
            contentFit={'contain'}
            style={styles.camera}
            source={{uri: picture.uri}}
          />
          <View style={styles.buttonContainer}>
            <TextButton 
              color={'#b2edf7'}
              textLabel={'Retake'} 
              onPress={retakePicture}
            />
            <TextButton
              color={'#89e092'}
              textLabel={'Confirm'}
              onPress={() => {}} // placeholder
            />
          </View>
        </SafeAreaView>
      ) : (
        <SafeAreaView style={styles.container}>
          <Camera 
            autoFocus={true}
            style={styles.camera}
            type={CameraType.back} 
            ref={(r) => camera = r}
            flashMode={flash ? 'on' : 'off'}
          >
            {(flash) ? (
              <IconButton
                iconCode={"flash-on"}
                onPress={() => setFlash(!flash)}
              />
            ) : (
              <IconButton
                iconCode={"flash-off"}
                onPress={() => setFlash(!flash)}
              />
            )}
            <SafeAreaView style={styles.captureButtonContainer}>
              <TouchableOpacity
                onPress={takePicture}
                style={styles.captureButton}
              />
            </SafeAreaView>
          </Camera>
          <Text style={styles.textContainer}>Start by taking a photo of your garment!</Text>
        </SafeAreaView>
      )
		);
}

const styles = StyleSheet.create({
		captureButton: {
			backgroundColor: '#fff',
			width: 50,
			height: 50,
			borderRadius: 50
		},
		captureButtonContainer: { 
      display: 'flex',
      position: 'absolute',
			bottom: 0,
			marginLeft: '33%',
      alignItems: 'center',
		},
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    camera: {
      alignContent: 'center',
      marginInline: "auto",
      width: "75%",
      height: "85%",
			overflow: 'hidden',
			borderRadius: '10%',
      display: 'flex',
    },
    textContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '10%',
    },
    buttonContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '75%',
    }
  });