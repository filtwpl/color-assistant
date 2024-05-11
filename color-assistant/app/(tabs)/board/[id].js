import { Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Page() {

  const { id } = useLocalSearchParams();
  return (
    <SafeAreaView>
      <Text>{id}</Text>
    </SafeAreaView>
  );
  
}
