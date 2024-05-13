import { Text, FlatList, View, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import images from '../../../src/images';
import { Card } from 'react-native-elements';
import Board from '../../../src/Board';


export default function Page() {

  const { id } = useLocalSearchParams();

  return (
    <SafeAreaView>
      <Board id={id} />
    </SafeAreaView>
  );
}
