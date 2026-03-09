import { db } from '@/config/firebaseconfig'
import { useUser } from '@clerk/clerk-expo'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { FlatList, Text, View } from 'react-native'
import { useNavigation } from 'expo-router'
import BusinessListCard from '@/components/businesslist/businesslistcard'
import { useRouter } from 'expo-router'


export default function MyBusinessess() {

  const { user } = useUser()

  const navigation = useNavigation()

  const [businesslist, setbusinesslist] = useState<any>([])
  const [loading, setloading] = useState(false)

  const router = useRouter()


  useEffect(() => {

    navigation.setOptions({
      headerShown: true,
      headerTitle: 'My Businesses',
      headerStyle: {
        backgroundColor: '#7156f1'
      },
    })
    user && getUserBusiness()
  }
    , [user])

  const getUserBusiness = async () => {
    setloading(true)
    setbusinesslist([])
    const q = query(collection(db, "Businesslist"), where("userEmail", "==", user?.primaryEmailAddress?.emailAddress))

    const querysnapshot = await getDocs(q)
    querysnapshot.forEach((doc) => {
      console.log(doc.data());
      setbusinesslist(prev => [...prev, {
        id: doc.id,
        ...doc.data()
      }])
    })
  }

  return (
    <View>
      <Text
        style={{ fontFamily: 'outfit-bold', padding: 20, marginTop: 10, fontSize: 24 }}

      >My Businesses</Text>

      <FlatList
        data={businesslist}
        onRefresh={getUserBusiness}
        refreshing={loading}
        renderItem={({ item, index }) => (
          <BusinessListCard business={item} key={index} />
        )}
      />
    </View>
  )
}
