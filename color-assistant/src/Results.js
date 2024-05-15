import { Text } from 'react-native';

export default function Results({uri}) {
  console.log(uri);
  return (
    <Text>{uri}</Text>
  );
}