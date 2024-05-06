import React from 'react';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'green'}}>
      <Tabs.Screen
        name='index'
        options={{
          title: 'Camera',
        }}
      />
      <Tabs.Screen
        name='aesthetics'
        options={{
          title: 'Aesthetics',
        }}
      />
    </Tabs>
  )
}