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
  {
    id: 'academia',
    title: 'academia',
    img: images.academiaThumb,
    href: {
      pathname: '/board/[id]',
      params: { id: 'academia' },
    },
  },
  {
    id: 'coastal',
    title: 'coastal',
    img: images.coastalThumb,
    href: {
      pathname: '/board/[id]',
      params: { id: 'coastal' },
    },
  },
  {
    id: 'professional',
    title: 'professional',
    img: images.professionalThumb,
    href: {
      pathname: '/board/[id]',
      params: { id: 'professional' },
    },
  },
  {
    id: 'streetwear',
    title: 'streetwear',
    img: images.streetwearThumb,
    href: {
      pathname: '/board/[id]',
      params: { id: 'streetwear' },
    },
  },
  {
    id: 'y2k',
    title: 'y2k',
    img: images.y2kThumb,
    href: {
      pathname: '/board/[id]',
      params: { id: 'y2k' },
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
