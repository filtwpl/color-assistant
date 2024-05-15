import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Board from '../../../src/Board';

export default function Page() {

  const { id } = useLocalSearchParams();

  return (
    <SafeAreaView>
      <Board id={id} />
    </SafeAreaView>
  );
}
