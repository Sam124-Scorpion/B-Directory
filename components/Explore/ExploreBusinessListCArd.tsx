import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useRouter } from 'expo-router'


export function ExploreBusinessListCArd({ businesslist }: { businesslist: any }) {

  const router = useRouter()

  return (
    <TouchableOpacity style={{
      backgroundColor: '#e6e6e6',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      padding: 5,
      marginTop: 15,
      marginLeft: 10,
      }}
      onPress={()=>router.push(`/businessdetails/${businesslist.id}` as any)}
      >
      <Image source={{ uri: businesslist?.imageUrl }}
        style={{
          width: '100%', height: 200, borderRadius: 10,
          marginBottom: 10,
          marginTop: 10

        }}
      />
      <View style={{
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
      }}>
      <Text style={{ fontFamily: 'outfit-bold', fontSize: 20, paddingLeft: 10 }}>{businesslist.name}</Text>
      <Text style={{ fontFamily: 'outfit-light', fontSize: 14, paddingLeft: 10, color: '#555' }}>{businesslist.address}</Text>
      <Text style={{ fontFamily: 'outfit-light', fontSize: 14, paddingLeft: 10, color: '#555' }}>{businesslist.contact}</Text>
      <Text style={{ fontFamily: 'outfit-light', fontSize: 14, paddingLeft: 10, color: '#555' }}>{businesslist.website}</Text>
      </View>

    </TouchableOpacity>
  )
}
