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
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";

import { fetch } from "@tensorflow/tfjs-react-native";

export default function Results({uri}) {
  const [isTfReady, setIsTfReady] = useState(false);
  const [isModelReady, setIsModelReady] = useState(false);
  const [predictions, setPredictions] = useState(null);
  const [imageToAnalyze, setImageToAnalyze] = useState(null);
  const model = useRef(null);

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
    console.log(source)
    try {
      const imageAssetPath = Image.resolveAssetSource(source);
      console.log(imageAssetPath)
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
  
  processImageAsync();
  if (imageToAnalyze) {
    console.log(imageToAnalyze.uri);
  }
  return (
    <View styles={{display: 'flex', alignItems: 'center'}}>
      <Text>Loading...</Text>
      {isModelReady && imageToAnalyze && (
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
            </Text>
          );
        })}
    </View>
  );
}