import React from 'react';
import Results from '../../src/Resultss';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function Page() {

  const { uri } = useLocalSearchParams();

  return (
    <Results uri={uri}/>
  );
  }
  