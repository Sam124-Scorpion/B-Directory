import { useRouter } from 'expo-router'
import React from 'react'
import { Image, Text, View, TouchableOpacity } from 'react-native'

export default function businesslistcard({ business }: { business: any }) {

  const router = useRouter()

  return (
    <TouchableOpacity style={{ padding: 10, marginBottom: 20, backgroundColor: '#dfdede', borderRadius: 10, marginHorizontal: 20, marginTop: 15, display: 'flex', flexDirection: 'row', gap: 10 }}
    
    onPress={()=>router.push(`/businessdetails/${business.id}` as any)}
    >
      <Image source={{ uri: business?.imageUrl }}
        style={{
          width: 160,
          height: 120, borderRadius: 10
        }} />

      <View style={{ marginTop: 7 }}>
        <Text style={{
          fontFamily: 'outfit-bold',
          fontSize: 17
        }}>
          {business.name}
        </Text>
        <Text style={{
          fontFamily: 'outfit-medium',
          fontSize: 13,
          color: 'gray'
        }}>
          {business.address}
        </Text>
        <View style={{
          display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
          marginTop: 7
        }}>
          <View style={{ display: 'flex', flexDirection: 'row', gap: 6 }}>
            <Image
              source={require("@/assets/images/star.png")}
              style={{
                height: 15,
                width: 15
              }}

            />
            <Text style={{ fontFamily: 'outfit-medium' }}>4.5</Text>
          </View>

        </View>

      </View>
    </TouchableOpacity >
  )
}
