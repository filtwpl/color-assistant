import { Text, FlatList, View, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import images from './images';

const data0 = [
  {
    id: 1,
    img: images.cottagecore1,
  },
  {
    id: 2,
    img: images.cottagecore2,
  },
  {
    id: 3,
    img: images.cottagecore3,
  },
  {
    id: 4,
    img: images.cottagecore4,
  },
  {
    id: 5,
    img: images.cottagecore5,
  },
  {
    id: 6,
    img: images.cottagecore6,
  },
  {
    id: 7,
    img: images.cottagecore7,
  },
  {
    id: 8,
    img: images.cottagecore8,
  }
];

const data1 = [
  {
    id: 1,
    img: images.emo1,
  },
  {
    id: 2,
    img: images.emo2,
  },
  {
    id: 3,
    img: images.emo3,
  },
  {
    id: 4,
    img: images.emo4,
  },
  {
    id: 5,
    img: images.emo5,
  },
  {
    id: 6,
    img: images.emo6,
  },
  {
    id: 7,
    img: images.emo7,
  },
  {
    id: 8,
    img: images.emo8,
  }
];

const encoding = {
  'cottagecore': 0,
  'emo': 1,
}

const imgs = []
imgs.push(data0);
imgs.push(data1);
  
const Item = ({item}) => (
  <Image
    style={styles.image}
    source={item.img}
  />
);

export default function Board({id}) {

  const renderItem = ({item}) => {
    return (
      <Item
        item={item}
      />
    );
  };

  return (
    <View styles={styles.container}>
      <Text style={styles.header}>{id}</Text>
      <FlatList
        style={{top: 40}}
        data={imgs[encoding[id]]}
        numColumns={2}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  image: {
    border: 10,
    margin: 10,
    width: 175,
    height: 200,
    overflow: 'hidden',
    borderRadius: '10%',
  },
  header: {
    position: 'absolute',
    top: 10,
    left: 15,
    fontSize: 24, 
    fontWeight: 'bold'
  }
})