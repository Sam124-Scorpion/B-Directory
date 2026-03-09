import { ScrollView, Text, View } from 'react-native'
import React, { Component } from 'react'

export default function About({business}: {business: any}) {

    return (
      <View style={{
        marginTop: 20,
        padding: 10,
        backgroundColor: '#d2d2d2',
        borderRadius: 10,
        marginHorizontal: 20
      }}>
        <Text style={{
          fontFamily: 'outfit-bold',
          fontSize: 18,
          lineHeight: 25,
          marginBottom: 10
        }}>About</Text>
        <Text>{business?.about}</Text>
      </View>
    )
  }
