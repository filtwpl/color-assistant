import { StyleSheet } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import CameraView from '../../src/CameraView.js';
import DetectObjectsScreen from '../../src/DetectObjectsScreen.js';
const Stack = createStackNavigator();

export default function Page() {
  return (
    // <CameraView/>
    <DetectObjectsScreen/>
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
