import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCameraPermissions } from 'expo-camera';
import { Image } from 'expo-image';
import { Image as ReactImage } from 'react-native';
import { useRef,useState, useEffect } from 'react';
import React from 'react';
import * as jpeg from "jpeg-js";

import { Camera, CameraType} from 'expo-camera/legacy';
import * as ImageManipulator from "expo-image-manipulator";

import { router } from 'expo-router';
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-react-native";

import * as cocossd from "@tensorflow-models/coco-ssd";
import { fetch } from "@tensorflow/tfjs-react-native";

import TextButton from './TextButton';
import IconButton from './IconButton';

export default function CameraView() {
  const [permission, requestPermission] = useCameraPermissions();
	const [picture, setPicture] = useState(null);
	const [confirm, setConfirm] = useState(false); 
  const [flash, setFlash] = useState(false);
  const [croppedImg, setCroppedImg] = useState(null);
  const [loading, setLoading] = useState(false);

	let camera;

  const [isTfReady, setIsTfReady] = useState(false);
  const [isModelReady, setIsModelReady] = useState(false);
  const [predictions, setPredictions] = useState(null);
  const [imageToAnalyze, setImageToAnalyze] = useState(null);
  const model = useRef(null);

  useEffect(() => {
    const initializeTfAsync = async () => {
      await tf.ready();
      setIsTfReady(true);
    };

    const initializeModelAsync = async () => {
      model.current = await cocossd.load(); // preparing COCO-SSD model
      setIsModelReady(true);
    };

    initializeTfAsync();
    initializeModelAsync();

  }, []);

  const imageToTensor = (rawImageData) => {
    try {
      const { width, height, data } = jpeg.decode(rawImageData, {
        useTArray: true,
      }); // return as Uint8Array
  
      // Drop the alpha channel info for mobilenet
      const buffer = new Uint8Array(width * height * 3);
      let offset = 0; // offset into original data
      for (let i = 0; i < buffer.length; i += 3) {
        buffer[i] = data[offset];
        buffer[i + 1] = data[offset + 1];
        buffer[i + 2] = data[offset + 2];
  
        offset += 4;
      }
  
      return tf.tensor3d(buffer, [height, width, 3]);
    } catch (error) {
      console.log('imageToTensor error: ', error);
    }
  };

  const cropImage = async(pred) => {
    try {
        console.log("h")
        ImageManipulator.manipulateAsync(
          picture.uri, [{crop: 
            {
              height:  pred.bbox[3] ,
              originX: pred.bbox[0] + 100,
              originY: pred.bbox[1] ,
              width: pred.bbox[2] ,
            }
          }]
        ).then(result => setCroppedImg(result)).then(setLoading(false));
    } catch (error) {
      console.log('crop image error: ', error);
    }
  }

  const detectObjectsAsync = async (source) => {
    try {
      console.log("source: ", source);
      const response = await fetch(source, {}, { isBinary: true });
      const rawImageData = await response.arrayBuffer();
      const imageTensor = imageToTensor(rawImageData);
      const newPredictions = await model.current.detect(imageTensor);
      setPredictions(newPredictions);
      console.log("=== Detect objects predictions: ===");
      console.log(newPredictions);
      await cropImage(predictions[0]).then(router.replace({
        pathname: '/cropped', 
        params: { 
          predictions: predictions[0], 
          uri: croppedImg.uri,
        }
      }));
    } catch (error) {
      console.log("Exception Error: ", error);
    }
  };

  const processImageAsync = async() => {
    setLoading(true);
    try {
      await ImageManipulator.manipulateAsync(
        picture.uri,
        [{ resize: { width: 900 } }],
        { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
      ).then(crop => detectObjectsAsync(crop.uri));
    } catch (error) {
      console.log("process img error: ", error);
    }
  }
  
	const takePicture = async() => {
    if (!camera) return;
    const photo = await camera.takePictureAsync();
    setPicture(photo);
    setConfirm(true);
	}	  

  const confirmPicture = () => {
    console.log(picture.uri);
    let href = {
      pathname: '/results',
      params: {
        uri: picture.uri,
      }
    };
    console.log(href);
    router.replace(href);
  };

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
      (!isModelReady && !isTfReady) ? (
        <SafeAreaView style={styles.container}>
         <Text>Loading...</Text>
        </SafeAreaView>
      ) : (
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
            {(loading) ? (
              <TextButton
                color={'#89e092'}
                textLabel={'Loading...'}
                onPress={processImageAsync} 
              />
            ) : (
              <TextButton
                color={'#89e092'}
                textLabel={'Confirm'}
                onPress={processImageAsync} 
              />
            )}
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