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

const data2 = [
  {
    id: 1,
    img: images.academia1,
  },
  {
    id: 2,
    img: images.academia2,
  },
  {
    id: 3,
    img: images.academia3,
  },
  {
    id: 4,
    img: images.academia4,
  },
  {
    id: 5,
    img: images.academia5,
  },
  {
    id: 6,
    img: images.academia6,
  },
  {
    id: 7,
    img: images.academia7,
  },
  {
    id: 8,
    img: images.academia8,
  }
];

const data3 = [
  {
    id: 1,
    img: images.coastal1,
  },
  {
    id: 2,
    img: images.coastal2,
  },
  {
    id: 3,
    img: images.coastal3,
  },
  {
    id: 4,
    img: images.coastal4,
  },
  {
    id: 5,
    img: images.coastal5,
  },
  {
    id: 6,
    img: images.coastal6,
  },
  {
    id: 7,
    img: images.coastal7,
  },
  {
    id: 8,
    img: images.coastal8,
  }
];

const data4 = [
  {
    id: 1,
    img: images.professional1,
  },
  {
    id: 2,
    img: images.professional2,
  },
  {
    id: 3,
    img: images.professional3,
  },
  {
    id: 4,
    img: images.professional4,
  },
  {
    id: 5,
    img: images.professional5,
  },
  {
    id: 6,
    img: images.professional6,
  },
  {
    id: 7,
    img: images.professional7,
  },
  {
    id: 8,
    img: images.professional8,
  }
];

const data5 = [
  {
    id: 1,
    img: images.streetwear1,
  },
  {
    id: 2,
    img: images.streetwear2,
  },
  {
    id: 3,
    img: images.streetwear3,
  },
  {
    id: 4,
    img: images.streetwear4,
  },
  {
    id: 5,
    img: images.streetwear5,
  },
  {
    id: 6,
    img: images.streetwear6,
  },
  {
    id: 7,
    img: images.streetwear7,
  },
  {
    id: 8,
    img: images.streetwear8,
  }
];

const data6 = [
  {
    id: 1,
    img: images.y2k1,
  },
  {
    id: 2,
    img: images.y2k2,
  },
  {
    id: 3,
    img: images.y2k3,
  },
  {
    id: 4,
    img: images.y2k4,
  },
  {
    id: 5,
    img: images.y2k5,
  },
  {
    id: 6,
    img: images.y2k6,
  },
  {
    id: 7,
    img: images.y2k7,
  },
  {
    id: 8,
    img: images.y2k8,
  }
];

const encoding = {
  'cottagecore': 0,
  'emo': 1,
  'academia': 2,
  'coastal': 3,
  'professional': 4,
  'streetwear': 5,
  'y2k': 6
}

const imgs = []
imgs.push(data0);
imgs.push(data1);
imgs.push(data2);
imgs.push(data3);
imgs.push(data4);
imgs.push(data5);
imgs.push(data6);
  
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