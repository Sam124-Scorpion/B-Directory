import Categorylist from "@/components/home/categorylist"
import { db } from "@/config/firebaseconfig"
import { Feather } from '@expo/vector-icons'
import { collection, getDocs, query, where } from "firebase/firestore"
import React from 'react'
import { ScrollView, Text, TextInput, View } from 'react-native'

import { ExploreBusinesslist } from "@/components/Explore/ExploreBusinesslist"


export default function explore() {


const [businesslist, setbusinesslist] = React.useState<any>([])


  const GetBusinessByCategory = async (category: any) => {

    const q = query(collection(db, 'Businesslist'), where('category', '==', category))

    const querysnapshot = await getDocs(q)
    querysnapshot.forEach((doc) => {
      console.log(doc.data());
      setbusinesslist(prev => [...prev, {
        id: doc.id,
        ...doc.data()
      }])
    });

  }
  // alert('Explore Page is under construction. Please check back later!')



  return (
    <ScrollView style={{ paddingTop: 30, paddingBottom: 30, paddingRight: 30, paddingLeft: 5, gap: 20 }}>

      <Text style={{ fontFamily: 'outfit-bold', fontSize: 27, paddingLeft: 30, marginTop: 30 }}>
        Explore More
      </Text>
      {/* searchbar */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', marginTop: 15, marginBottom: 20, marginHorizontal: 10, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10, gap: 10, borderWidth: 2, borderColor: "#7156f1", marginLeft: 30 }}>

        <Feather name="search" size={24} color="#7156f1" />
        <TextInput placeholder='Search...' style={{ flex: 1, backgroundColor: '#fff', borderRadius: 10, padding: 10, verticalAlign: 'middle', paddingLeft: 10 }}></TextInput>
      </View>

      {/* catergory list */}

      <Categorylist
        style={{ marginTop: 10, padding: 10 }}
        explore={true} onCategorySelect={(category) => {
          GetBusinessByCategory(category)
        }} />



      {/* business list */}

      <ExploreBusinesslist businesslist={businesslist} />
        


    </ScrollView>
  )

}