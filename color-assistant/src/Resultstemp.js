// NOT IN USE

import { Text, View } from 'react-native';
import React, { useEffect, useRef, useState } from "react";

import {
  ActivityIndicator,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-react-native";

import * as cocossd from "@tensorflow-models/coco-ssd";

import * as jpeg from "jpeg-js";
import * as ImageManipulator from "expo-image-manipulator";

import { fetch } from "@tensorflow/tfjs-react-native";
import { router } from 'expo-router';

export default function Results({uri}) {
  console.log('running');
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

    processImageAsync().then(() => {
        console.log(predictions[0]);
        let temp_href = {
          pathname: '/cropped',
          params: { predictions: predictions[0], uri: uri },
        };
        router.replace(temp_href);
        return;
      }
    );

    // if (isModelReady && isTfReady && predictions) {
    //   console.log(predictions[0]);
    //   let temp_href = {
    //     pathname: '/cropped',
    //     params: { predictions: predictions[0], uri: uri },
    //   };
    //   router.replace(temp_href);
    //   return;
    // }
  }, []);

  const imageToTensor = (rawImageData) => {
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
  };

  const detectObjectsAsync = async (source) => {
    try {
      console.log('source: ', source);
      const imageAssetPath = Image.resolveAssetSource(source);
      const response = await fetch(imageAssetPath.uri, {}, { isBinary: true });
      const rawImageData = await response.arrayBuffer();
      const imageTensor = imageToTensor(rawImageData);
      const newPredictions = await model.current.detect(imageTensor);
      setPredictions(newPredictions);
      console.log("=== Detect objects predictions: ===");
      console.log(newPredictions);
    } catch (error) {
      console.log("Exception Error: ", error);
    }
  };

  const processImageAsync = async() => {
    try {
      const crop = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: 900 } }],
        { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
      );
      setImageToAnalyze({ uri: crop.uri });
      await detectObjectsAsync(imageToAnalyze);
    } catch (error) {
      console.log(error)
    }
  }
  

  return (
    <View styles={{display: 'flex', justifyContent: 'center'}}>
      <Text styles={{fontSize: 30}}>Finding your garment... This might take a second!</Text>
      {/* {isModelReady && imageToAnalyze && (
        <Text>
          Predictions: {predictions ? "" : "Predicting..."}
        </Text>
      )}
      {isModelReady &&
        isTfReady &&
        predictions &&
        predictions.map((p, index) => {
          return (
            <Text
              key={index}
            >
              {p.class}: {p.score} 
              left: {p.bbox[0]} 
              top: {p.bbox[1]} 
              width: {p.bbox[2]} 
              height: {p.bbox[3]} 
            </Text>
          );
        })} */}
    </View>
  );
}