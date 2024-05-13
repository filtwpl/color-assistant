import { Text, FlatList, View, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import images from './images';
import { Card } from 'react-native-elements';

const data = [
  {
    id: 1,
    img: require('./img/cottagecore/1.jpg'),
  },
  {
    id: 2,
    img: require('./img/cottagecore/1.jpg'),
  },
];
  
const Item = ({item}) => (
  <Image
    style={styles.image}
    source={item.img}
  />
);
  
export default function Board() {

  const renderItem = ({item}) => {
    return (
      <Item
        item={item}
      />
    );
  };

  return (
    <SafeAreaView styles={styles.container}>
      <FlatList
        data={data}
        numColumns={2}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
  },
  image: {
    border: 10,
    margin: 10,
    width: 175,
    height: 200,
    overflow: 'hidden',
    borderRadius: '10%',
  }
})