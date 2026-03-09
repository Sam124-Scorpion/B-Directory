// import { Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import React, { Component } from 'react'

export default class _layout extends Component {
  render() {
    return (
      <Tabs screenOptions={{
        headerShown: false,
        tabBarInactiveTintColor: '#7156f1'
      }}

      >
        <Tabs.Screen name='home'
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color }) => {

              return <Ionicons name='home' size={24} color={color} />
            }
          }}

        />
        <Tabs.Screen name='explore'
          options={{
            tabBarLabel: 'Explore',
            tabBarIcon: ({ color }) => {

              return <Ionicons name='search' size={24} color={color} />
            }
          }} />
        <Tabs.Screen name='profile'
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color }) => {

              return <Ionicons name='people-circle' size={24} color={color} />
            }
          }} />
      </Tabs>
    )
  }
}