import React from 'react';
import { Text, FlatList, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';
import { Link } from 'expo-router';
import { router } from 'expo-router';

const data = [
  {
    id: 'cottagecore',
    title: 'cottagecore',
    img: require('./img/cottagecore_placeholder.png'),
    href: {
      pathname: '/board/[id]',
      params: { id: 'cottagecore' },
    },
  },
  {
    id: 'emo',
    title: 'emo',
    img: require('./img/emo_placeholder.png'),
    href: {
      pathname: '/board/[id]',
      params: { id: 'emo' },
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
