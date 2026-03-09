import { db } from '@/config/firebaseconfig'
import { collection, DocumentData, getDocs, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { FlatList, Image, Text, View } from 'react-native'




export default function slider() {

  const [sliderList, setSliderList] = useState<DocumentData[]>([])


  useEffect(() => {
    GetSliderList();
  }, [])

  const GetSliderList = async () => {

    setSliderList([])
    const q = query(collection(db, "Slider"))
    const querySnapshot = await getDocs(q)

    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      setSliderList(prev => [...prev, doc.data()])
    });



  }


  return (
    <View style={{ marginTop: 10 }}>
      <Text style={{ fontSize: 24, color: 'black', fontFamily: 'outfit-bold', paddingLeft: 20, marginBottom: 15 , marginTop:20 }}>#Specially For Everyone</Text>


      <FlatList
        data={sliderList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingLeft: 20, paddingRight: 20 }}
        renderItem={({ item, index }) => (

          <Image source={{ uri: item.imageUrl }} style={{ width: 300, height: 150, borderRadius: 20, marginRight: 15 }} />

        )}

      />
    </View>
  )
}