import React from 'react'
import { FlatList, Image, Linking, Text, TouchableOpacity } from 'react-native'

export default function actionbutton({business}: {business: any}){

const actionlist = [
    {
        name:'Call',
        icon:require('../../assets/images/phone-call.png'),
        url:`tel:${business.phoneNumber}`
    },
    {
        name:'Location',
        icon:require('../../assets/images/loction.png'),
        url:`https://www.google.com/maps/search/?api=1&query=${business?.address}`
    },
    {
        name:'Share',
        icon:require('../../assets/images/share.png'),
        url:``
    },
    {
        name:'Visit Website',
        icon:require('../../assets/images/web.png'),
        url: business?.website
    }
]

    return (
        <>
<FlatList
data={actionlist}
numColumns={4}
columnWrapperStyle={{justifyContent:'space-around'}}
renderItem={({item})=>(
    <TouchableOpacity onPress={()=>Linking.openURL(item.url)} style={{display:'flex', flexDirection:'row', gap: 10, padding: 10, backgroundColor: '#d2d2d2', marginBottom: 10, borderRadius: 10}}>
        <Image source={item.icon} style={{width: 20, height: 20}} />
        <Text style={{fontFamily: 'outfit-medium' , textAlign: 'center'}}>{item.name}</Text>
    </TouchableOpacity>
)} />


</>
    )
  }
