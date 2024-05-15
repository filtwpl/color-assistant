// NOT IN USE


import React from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs 
      screenOptions={({ route }) => ({
        headerShown: route.name === 'board/[id]' ? false : true,
        tabBarActiveTintColor: 'green',
      })}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Camera',
          tabBarIcon: ({ color }) => <MaterialIcons name="camera-enhance" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name='results'
        // options={{
        //   href: null,
        // }}
      />
      <Tabs.Screen
        name='aesthetics'
        options={{
          title: 'Aesthetics',
          tabBarIcon: ({ color }) => <MaterialIcons name="dashboard" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name='board/[id]'
        options={{
          href: null,
        }}
      />
    </Tabs>
  )
}

// ={{ tabBarActiveTintColor: 'green'}}