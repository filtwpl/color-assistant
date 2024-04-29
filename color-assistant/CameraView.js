import { Button, Pressable, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Camera, CameraType } from 'expo-camera';
import { Image } from 'expo-image';
import { useState } from 'react';
import React from 'react';

export default function CameraView() {
  const [permission, requestPermission] = Camera.useCameraPermissions();
	const [picture, setPicture] = useState(null);
	const [confirm, setConfirm] = useState(false); 

	let camera;
  
	const takePicture = async() => {
		if (!camera) return;
		const photo = await camera.takePictureAsync();
		console.log(photo);
		setPicture(photo);
		console.log("the picture set is: ", picture);
		setConfirm(true);
	}	

	if (!permission) {
    return <SafeAreaView />;
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
				
			</SafeAreaView>
		) : (
			<SafeAreaView style={styles.container}>
				<Camera 
					style={styles.camera}
					type={CameraType.back} 
					ref={(r) => camera = r}
				>
					<SafeAreaView style={styles.buttonContainer}>
						<TouchableOpacity
							onPress={takePicture}
							style={styles.button}
						/>
					</SafeAreaView>
				</Camera>
				<Text style={styles.textContainer}>Start by taking a photo of your garment!</Text>
			</SafeAreaView>
		)
	);
}

const ConfirmScreen = (pic) => {
	console.log('pic!: ', pic)
	return (
		<SafeAreaView style={{backgroundColor: 'transparent', flex: 1, width: '100%', height: '100%'}}>
			<Text>"picture: " + {pic.uri} </Text>
			<ImageBackground 
				style={{flex: 1}}
				source={{uri: pic.uri}}
			/>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
		button: {
			backgroundColor: '#fff',
			width: 50,
			height: 50,
			borderRadius: 50
		},
		buttonContainer: {
			position: 'absolute',
			bottom: 0,
			marginLeft: '42%',
		},
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    camera: {
      marginInline: "auto",
      width: "75%",
      height: "75%",
			overflow: 'hidden',
			borderRadius: '10%',
    },
    textContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '10%',
    },
  });