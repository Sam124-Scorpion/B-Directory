import {  View , Image , Text, TouchableOpacity } from 'react-native'
import React from 'react'

export default function categoryitem({category , onCategoryPress}: {category: any, onCategoryPress: any}) {
  {
    return (
     <TouchableOpacity onPress={()=>onCategoryPress(category)}>
      <View style={{
        padding:13,
        backgroundColor:'#7156f1',
        borderRadius:99,
        marginRight:30,
        marginLeft:20
      }}>
        <Image
        source={{uri:category.imageUrl}}
        style={{width:40 , height:40}} />
      </View>
      <Text style={{
        fontFamily:'outfit-medium',
        textAlign:'center',
        marginRight:10
      }}>{category.name}</Text>
      </TouchableOpacity> 
  
    )
  }
}