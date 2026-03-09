import About from '@/components/businessdetaildatas/About'
import Action from '@/components/businessdetaildatas/actionbutton'
import Intro from '@/components/businessdetaildatas/intro'
import Review from '@/components/businessdetaildatas/Review'
import { db } from '@/config/firebaseconfig'
import { useLocalSearchParams } from 'expo-router'
import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect } from 'react'
import { ActivityIndicator, ScrollView, View } from 'react-native'

export default function businessdetails() {

    const { businessid } = useLocalSearchParams()

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [business, setBusiness] = React.useState<any>([])
    const [loading, setLoading] = React.useState(false)

    useEffect(() => {
        getBusinessid()
    }, [])


    const getBusinessid = async () => {
        setLoading(true)
        const docuRef = doc(db, 'Businesslist', businessid as string)
        const docu = await getDoc(docuRef)
        if (docu.exists()) {
            setBusiness({
                id: docu.id,
                ...docu.data()
            })
            setLoading(false)
            console.log(docu.data())
        }
        else {
            console.log('No such document!')
            setLoading(false)
        }
    }

    return (
        <ScrollView>
            {loading ?
                <ActivityIndicator size={'large'} color={'#7156f1'} style={{ marginTop: 70 }} /> :
                <>


                    <View>
                        <Intro business={business} />
                        <Action business={business} />
                        <About business={business} />
                        <Review business={business} />
                    </View>
                </>
            }
        </ScrollView>
    )
}
