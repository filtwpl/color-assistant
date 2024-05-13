import { Stack } from 'expo-router/stack';
import 'react-native-reanimated';

export default function AppLayout() {
  return (
    <Stack>
        <Stack.Screen name='(tabs)' options={{ headerShown: false }}/>
    </Stack>
  )
}