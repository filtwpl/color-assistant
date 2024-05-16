import React, { useState, useEffect } from 'react';
import Cropped from '../../src/Cropped';
import { useLocalSearchParams } from 'expo-router';

export default function Page() {

  const { pred, uri } = useLocalSearchParams();

  return (
    <Cropped pred={pred} uri={uri}/>
  );
};
  