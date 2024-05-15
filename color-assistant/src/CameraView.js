import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCameraPermissions } from 'expo-camera';
import { Image } from 'expo-image';
import { useState, useEffect } from 'react';
import React from 'react';
import { Camera, CameraType} from 'expo-camera/legacy';
import * as FileSystem from 'expo-file-system';

// import { getColors } from 'react-native-image-colors'

import TextButton from './TextButton';
import IconButton from './IconButton';

export default function CameraView() {
  const [permission, requestPermission] = useCameraPermissions();
	const [picture, setPicture] = useState(null);
	const [confirm, setConfirm] = useState(false); 
  const [flash, setFlash] = useState(false);
  const [href, setHref] = useState(null);
  const folderPath = `${FileSystem.documentDirectory}userSavedPic`;

	let camera;
  
	const takePicture = async() => {
		if (!camera) return;
		const photo = await camera.takePictureAsync();
		setPicture(photo);
    setHref(picture.uri);
		setConfirm(true);
	}	  

	const retakePicture = () => {
		setPicture(null);
		setConfirm(false);
	}

  const saveImage = async (uri) => {
    const fileName = uri.split('/').pop();

    //Ensure the folder exists
    const folderInfo = await FileSystem.getInfoAsync(folderPath);
    if (!folderInfo.exists) {
      await FileSystem.makeDirectoryAsync(folderPath, { intermediates: true });
    }
  
    const newPath = `${folderPath}/${fileName}`;

    const fileInfo = await FileSystem.getInfoAsync(newPath);
    if (fileInfo.exists) {
      return newPath; // File exists, return the path and do not overwrite
    }

    await FileSystem.moveAsync({
      from: uri,
      to: newPath,
    });

    return newPath; // Optionally return the new path
  };

  const handleConfirmPress = async () => {
    try {
      const newImagePath = await saveImage(picture.uri);
      console.log('Image saved successfully to:', newImagePath);
      // Optionally, navigate to another screen or reset the state
    } catch (error) {
      console.error('Failed to save image:', error);
    }
  };

  // const useImageColors = () => {
  //   const [colors, setColors] = React.useState(null)
  
  //   React.useEffect(() => {
  //     getColors(picture.uri, {
  //       fallback: '#D6D6D6',
  //       cache: true,
  //       key: picture.uri,
  //     }).then(setColors)
  //   }, [])
  
  //   // text component = colors
  // }

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
              onPress={() => {router.replace(href)}} 
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
          <Text style={styles.textContainer}>Center your garment and take a picture!</Text>
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
    marginLeft: '43%',
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