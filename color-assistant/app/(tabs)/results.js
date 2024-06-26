import React, { useState, useEffect } from 'react';
import Results from '../../src/Resultstemp';
import { useLocalSearchParams } from 'expo-router';

export default function Page() {

  const { uri } = useLocalSearchParams();

  return (
    <Results uri={uri}/>
  );
  }
  