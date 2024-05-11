import React from 'react';
import { Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';
import { Link } from 'expo-router';
import { router } from 'expo-router';

const data = [
  {
    id: 1,
    title: 'cottagecore',
    img: require('./img/cottagecore_placeholder.png'),
    href: {
      pathname: '/board/[id]',
      params: { id: '1' },
    },
  },
  {
    id: 2,
    title: 'emo',
    img: require('./img/emo_placeholder.png'),
    href: {
      pathname: '/board/[id]',
      params: { id: '2' },
    },
  },
  // {
  //   id: 3,
  //   title: 'emo',
  //   img: require('./img/emo_placeholder.png'),
  // },
  // {
  //   id: 4,
  //   title: 'emo',
  //   img: require('./img/emo_placeholder.png'),
  // },
  // {
  //   id: 5,
  //   title: 'emo',
  //   img: require('./img/emo_placeholder.png'),
  // }
];

const Item = ({item}) => (
  <TouchableOpacity onPress={() => {router.replace(item.href)}}>
    <Card>
      <Card.Title>
        <Text>{item.title}</Text>
      </Card.Title>  
      <Card.Image source={item.img}/>
    </Card>
  </TouchableOpacity>
);

export default function Boards() {

  const renderItem = ({item}) => {
    return (
      <Item
        item={item}
      />
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   item: {
//     padding: 20,
//     marginVertical: 8,
//     marginHorizontal: 16,
//   },
//   title: {
//     fontSize: 32,
//     textColor: '#fff',
//   },
// });