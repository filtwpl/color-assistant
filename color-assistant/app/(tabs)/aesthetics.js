import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Boards from '../../src/Boards';

export default function Page() {
    return (
        <SafeAreaView>
            <Text>yippee</Text>
            <Boards/>
        </SafeAreaView>
        
    )
}