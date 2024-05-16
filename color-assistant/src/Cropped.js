import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import { Image } from 'expo-image';
//import { getColors } from 'react-native-image-colors';
import * as ImageManipulator from 'expo-image-manipulator';

export default function Cropped({ pred, uri }) {
  return (
    <View style={styles.container}>
      <Image 
        contentFit={'contain'}
        source={uri}
        style={styles.camera}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  camera: {
    alignContent: 'center',
    marginInline: "auto",
    width: 350,
    height: 600,
    overflow: 'hidden',
    borderRadius: '10%',
    display: 'flex',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});