import { Text } from 'react-native';
import { getColors } from 'react-native-image-colors';
import React, { useState, useEffect } from 'react';

export default function Results({uri}) {

  const [colors, setColors] = useState(null);
  useEffect(() => {
    const url = 'https://i.imgur.com/68jyjZT.jpg'

    getColors(url, {
      fallback: '#228B22',
      cache: true,
      key: url,
    }).then(setColors)
  }, [])
  console.log(colors);

  return (
    <Text>{colors}</Text>
  );
}