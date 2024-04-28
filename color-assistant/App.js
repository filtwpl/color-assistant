import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Button, StyleSheet, Text, View } from 'react-native';
import CameraView from './CameraView.js';
import React from 'react';

export default function App() {
  return (
    <SafeAreaProvider>
      <CameraView/>
    </SafeAreaProvider>
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
