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
import { Text, View } from "react-native";

export default function Results(uri) {
    const [isTfReady, setIsTfReady] = useState(false);
    const [isModelReady, setIsModelReady] = useState(false);
    const [predictions, setPredictions] = useState(null);
    const [imageToAnalyze, setImageToAnalyze] = useState(null);
    const model = useRef(null);
    console.log("TEST")
    console.log(uri)
  
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
    
        // Automatically select image when page loads and model is ready
        if (isModelReady) {
            if (uri != imageToAnalyze) {
                setPredictions(null);
                setImageToAnalyze(null);
                selectImageAsync();
            } else {
                // Re-run object detection for the new image
                selectImageAsync();
            }
        }
      }, [uri, isModelReady]);
  
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
  
    const selectImageAsync = async () => {
      console.log("hi")
      try {
          const source = { uri: uri };
          setImageToAnalyze(uri);
          setPredictions(null);
          await detectObjectsAsync(uri);
      } catch (error) {
        console.log(error);
      }
    };
  
    const borderColors = ["blue", "green", "orange", "pink", "purple"];
    const scalingFactor = 280 / 900; // image display size / actual image size
  
    return (
        <View style={styles.container}>
          <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={styles.welcomeContainer}>
              <Text style={styles.headerText}>Clothing Color Detection</Text>
    
              {imageToAnalyze && (
                <View style={{ position: "relative" }}>
                  {predictions && predictions.map((p, index) => (
                    <View key={index} style={{
                      zIndex: 1,
                      elevation: 1,
                      left: p.bbox[0] * scalingFactor,
                      top: p.bbox[1] * scalingFactor,
                      width: p.bbox[2] * scalingFactor,
                      height: p.bbox[3] * scalingFactor,
                      borderWidth: 2,
                      borderColor: borderColors[index % 5],
                      backgroundColor: "transparent",
                      position: "absolute",
                    }} />
                  ))}
                  <Image source={imageToAnalyze} style={styles.imageContainer} />
                </View>
              )}
    
              <View style={styles.predictionWrapper}>
                {predictions && predictions.map((p, index) => (
                  <Text key={index} style={{ ...styles.text, color: borderColors[index % 5] }}>
                    {p.class}: {p.score.toFixed(2)}
                  </Text>
                ))}
              </View>
            </View>
          </ScrollView>
        </View>
      );
    };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    welcomeContainer: {
      alignItems: "center",
      marginTop: 10,
      marginBottom: 20,
    },
    contentContainer: {
      paddingTop: 30,
    },
    headerText: {
      marginTop: 5,
      fontSize: 20,
      fontWeight: "bold",
    },
    loadingContainer: {
      marginTop: 5,
    },
    text: {
      fontSize: 16,
    },
    loadingTfContainer: {
      flexDirection: "row",
      marginTop: 10,
    },
    loadingModelContainer: {
      flexDirection: "row",
      marginTop: 10,
    },
    imageWrapper: {
      width: 300,
      height: 300,
      borderColor: "#66c8cf",
      borderWidth: 3,
      borderStyle: "dashed",
      marginTop: 40,
      marginBottom: 10,
      position: "relative",
      justifyContent: "center",
      alignItems: "center",
    },
    imageContainer: {
      width: 280,
      height: 280,
    },
    predictionWrapper: {
      width: "100%",
      flexDirection: "column",
      alignItems: "center",
    },
    transparentText: {
      opacity: 0.8,
    },
  });