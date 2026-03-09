import { db } from '@/config/firebaseconfig'
import { useUser } from '@clerk/clerk-expo'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import React from 'react'
import { Alert, Platform, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import { Rating } from 'react-native-ratings'

export default function Review({ business }: { business: any }) {

    const [rating, setRating] = React.useState(4)
    const [input, setInput] = React.useState('')

    const user = useUser()

    const showMessage = (message: string) => {
        if (Platform.OS === 'android') {
            ToastAndroid.show(message, ToastAndroid.SHORT)
        }
        else if (Platform.OS === 'web') {
            alert(message)
        }
        else {
            Alert.alert('Review', message)
        }
    }


    const onSubmitReview = async () => {

        if (!business?.id) {
            showMessage('Business ID not found')
            return
        }

        if (!input.trim()) {
            showMessage('Please write a comment')
            return
        }

        try {
            const docRef = doc(db, 'Businesslist', business.id.toString())
            await updateDoc(docRef, {
                reviews: arrayUnion({
                    rating: rating,
                    comment: input,
                    userId: user.user?.id,
                    userName: user.user?.firstName,
                    timestamp: new Date().toISOString()
                })
            })
            showMessage('Review Submitted Successfully')
            setInput('')
        } catch (error) {
            console.error('Error submitting review:', error)
            showMessage('Failed to submit review')
        }
    }


    return (
        <View style={{
            padding: 10,
            backgroundColor: '#d2d2d2',
            borderRadius: 10,
            marginHorizontal: 20,
            marginTop: 20
        }}>
            <Text style={{
                fontFamily: 'outfit-bold',
                fontSize: 18,
                lineHeight: 25,
                marginBottom: 10
            }}>Review</Text>

            <View>
                <Rating
                    showRating={false}
                    onFinishRating={(rating: React.SetStateAction<number>) => setRating(rating)}
                    style={{ paddingVertical: 10, borderRadius: 10, backgroundColor: '#fff' }}
                />

                <TextInput
                    placeholder='Write your comment.....'
                    style={{
                        backgroundColor: '#fff',
                        borderRadius: 10,
                        padding: 10,
                        marginTop: 10,
                        textAlignVertical: 'top'
                    }}
                    multiline
                    numberOfLines={4}
                    onChangeText={(value) => setInput(value)}
                ></TextInput>
                <TouchableOpacity
                    disabled={!input}
                    onPress={onSubmitReview}
                    style={{
                        backgroundColor: '#7156f1',
                        padding: 10,
                        borderRadius: 10,
                        marginTop: 10,
                        alignItems: 'center'
                    }}>
                    <Text style={{
                        color: '#fff',
                        fontFamily: 'outfit-medium'
                    }}>Submit</Text>
                </TouchableOpacity>
            </View>
            <View style={{ marginBottom: 50 }}>
            </View>
        </View>
    )
}
