import React from 'react';
import { FlatList } from 'react-native-super-grid';
import Card from 'react-bootstrap/Card';

export default function Boards() {

  let data = [
    {
      id: 'test1',
      title: 'yippee',
    },
    {
      id: 'test2',
      title: 'hurray',
    }
  ];

  const Item = ({item, onPress}) => {
    <TouchableOpacity onPress={onPress}>
      <Card>
        <Card.Body>
          <Card.Title>{item.title}</Card.Title>
        </Card.Body>
      </Card>
    </TouchableOpacity>
  }

  const renderItem = ({item}) => {
    return (
      <Item
        item={item}
        onPress={() => {}}
      />
    )
  }

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
    />
  );
}