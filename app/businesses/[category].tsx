import BusinessListCard from '@/components/businesslist/businesslistcard'
import { db } from '@/config/firebaseconfig'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { collection, getDocs, query, where } from 'firebase/firestore'
import React, { useEffect , useState } from 'react'
import { ActivityIndicator, FlatList, View } from 'react-native'
import { Text } from 'react-native'


export default function categorylistitemsone() {

  const [loading, setLoading] = React.useState(true)
  const navigation = useNavigation()
  const { category } = useLocalSearchParams()
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [businesslist, setbusinesslist] = React.useState<any>([])


  useEffect(() => {
    navigation.setOptions(
      {
        headerShown: true,
        headerTitle: category
      }
    )
  }, [])

  useEffect(() => {
    getbusinesslist()
  }, [])


  const getbusinesslist = async () => {
    setbusinesslist([])
    const q = query(collection(db, 'Businesslist'), where('category', '==', category))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      setbusinesslist(prev => [...prev, {id:doc?.id , ...doc.data()}])

    }
    );
          setLoading(false)
  }


  return (

    <View>
      <>
      {businesslist?.length > 0 && loading == false 
      ? 
      <FlatList data={businesslist}
      onRefresh={getbusinesslist}
      refreshing={loading}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <BusinessListCard business={item} key={index} />
        )}
      /> :
      loading?<ActivityIndicator
       size={'large'} 
       color={'#7156f1'} 
       style={{ marginTop: 50 }} /> :
      <Text style={{ fontSize: 18, color: 'black', fontFamily: 'outfit-light', textAlign: 'center', marginTop: 50 }}>
        No Businesses Found in this Category
        </Text>}
        
      </>
    </View>
    
  )
}