import { db } from '@/config/firebaseconfig'
import { collection, getDocs, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { FlatList, Text, View } from 'react-native'
import Businessitemcard from './Businessitemcard'
import { useRouter } from 'expo-router'


export default function Businesslist({explore}: {explore?: false}) {

    const [businesslist, setbusinesslist] = useState<any>([])

    useEffect(() => {
        GetBusineslist()
    }, [])

    const router = useRouter()

    const GetBusineslist = async () => {
        setbusinesslist([])
        const q = query(collection(db, 'Businesslist'))
        const querysnapshot = await getDocs(q)

        querysnapshot.forEach((docs) => {
            console.log(docs.data())
            setbusinesslist(prev => [...prev, {
                id: docs.id,
                ...docs.data()
            }])
        })

    }
        const onBusinessPressHandler = (category: any) => {

                router.push(`/businessdetails/${category.id}` as any)
        

        // router.push(`/businesses/${category.name}` as any)
    }


    return (
        <>
        {!explore &&
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontFamily: 'outfit-bold', padding: 20, marginTop: 10, fontSize: 24 }}>#Popular Businessess</Text>

                <Text style={{ fontFamily: 'outfit-light', padding: 20, marginTop: 10, fontSize: 18, color: '#7156f1', marginLeft: 80, cursor: 'pointer' }}>view all</Text>
            </View>
        }

            <View>
                <FlatList
                    data={businesslist}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={{ paddingRight: 20 }}
                    renderItem={({ index, item }) => (
                        <Businessitemcard
                            onBusinessPress={onBusinessPressHandler}
                            business={item}
                            key={index}

                        />
                    )}

                />
            </View>
            <View style={{marginBottom:50}}>
            </View>
        </>
    )

}