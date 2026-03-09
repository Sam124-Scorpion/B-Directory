import { db } from '@/config/firebaseconfig'
// import { useRouter } from 'expo-router'
import { useRouter } from 'expo-router'
import { collection, getDocs, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { FlatList, Text, View } from 'react-native'
import Categoryitem from '../home/categoryitem'


export default function categorylist({explore, onCategorySelect}: {explore?: boolean, onCategorySelect?: (category: any) => void}) {

    const [categorylist, setCategorylist] = useState<any>([])

    const router = useRouter()

    useEffect(() => {
        getCategorylist();
    }, [])

    const getCategorylist = async () => {
        setCategorylist([])
        const q = query(collection(db, 'Categorylist'))
        const querySnapshot = await getDocs(q)

        querySnapshot.forEach((doc) => {
            console.log(doc.data());
            setCategorylist(prev => [...prev, doc.data()])
        });

    }

    const onCategoryPressHandler = (category: any) => {

        if(!explore){
                router.push(`/businesses/${category.name}` as any)
        }
        else{
            onCategorySelect?.(category.name)
        }
    
        // router.push(`/businesses/${category.name}` as any)
    }


    return (
        <>
        {!explore &&
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>


                <Text style={{ fontFamily: 'outfit-bold', padding: 20, marginTop: 10, fontSize: 24 }}>#Category Items</Text>



                <Text style={{ fontFamily: 'outfit-light', padding: 20, marginTop: 10, fontSize: 18, color: '#7156f1', marginLeft: 80 , cursor:'pointer' }}>view all</Text>
            </View>
        }
            <View>
                
                <FlatList
                    data={categorylist}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    style={{
                        marginLeft: 20
                    }}
                    contentContainerStyle={{ paddingRight: 20 }}

                    renderItem={({ index, item }) => (
                        <Categoryitem category={item}
                            onCategoryPress={(category) => onCategoryPressHandler(category)}
                            key={index}

                        />
                    )}

                />
            </View>

        </>
    )
}
