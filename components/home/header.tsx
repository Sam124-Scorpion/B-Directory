import { useUser } from '@clerk/clerk-expo';
import Feather from '@expo/vector-icons/Feather';
import React from 'react';
import { Image, Text, TextInput, View } from 'react-native';


export default function header() {
  const {user} = useUser();
    return (
      <View style={{paddingTop:20, paddingHorizontal:0, paddingVertical:20, borderBottomWidth:1,backgroundColor:'#7156f1', width:'100%' , borderBottomLeftRadius:20, borderBottomRightRadius:20, borderBottomColor:'#7156f1'}}>

        <View  style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', paddingHorizontal:20, paddingVertical:10, gap:10}}  >

          <Image 
            source={user?.imageUrl ? {uri: user.imageUrl} : require('../../assets/images/react-logo.png')} 
            style={{width:50, height:50, borderRadius:25}}
          />
          <View style={{flex:1}}>
            
            <Text style={{color:'#fff', fontFamily:'outfit-light', fontSize:14}}>
              Welcome
            </Text>
            <Text style={{color:'#fff', fontFamily:'outfit-bold', fontSize:18}}>
              {user?.firstName || 'Guest'} {user?.lastName || ''}
            </Text>
          </View>
        </View>
        <View style={{flexDirection:'row', alignItems:'center', backgroundColor:'#fff', marginTop:10, marginBottom:0, marginHorizontal:20, paddingHorizontal:10, paddingVertical:5, borderRadius:10, gap:10}}>
          <Feather name="search" size={24} color="black" />
          <TextInput placeholder='Search...' style={{flex:1, backgroundColor:'#fff', borderRadius:10, paddingHorizontal:10 , padding:10 , verticalAlign:'middle'}}></TextInput>
        </View>
      </View>
    )
  }