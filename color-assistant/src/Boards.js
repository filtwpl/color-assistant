import React from 'react';
import { Text, FlatList, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';
import { router } from 'expo-router';
import images from './images';

const data = [
  {
    id: 'cottagecore',
    title: 'cottagecore',
    img: images.cottagecoreThumb,
    href: {
      pathname: '/board/[id]',
      params: { id: 'cottagecore' },
    },
  },
  {
    id: 'emo',
    title: 'emo',
    img: images.emoThumb,
    href: {
      pathname: '/board/[id]',
      params: { id: 'emo' },
    },
  },
];

const Item = ({item}) => (
  <TouchableOpacity onPress={() => {router.replace(item.href)}}>
    <Card>
      <Card.Title>
        <Text>{item.title}</Text>
      </Card.Title>
      <Card.Image styles={{resizeMode: 'center'}} source={item.img}/>
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
