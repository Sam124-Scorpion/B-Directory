import { Text, View, Image, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'

export default function Businessitemcard({ business, onBusinessPress }: { business: any, onBusinessPress: (business: any) => void }) {
    {
        return (
            <TouchableOpacity 
            onPress={() => onBusinessPress(business)} 
            style={{
                padding: 10,
                marginLeft: 40,
                backgroundColor: '#d2d2d2',
                borderRadius: 10
            }}>

                <Image
                    source={{ uri: business?.imageUrl }}
                    style={{
                        width: 230,
                        height: 130,
                        borderRadius: 10
                    }}
                />
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
                        <Text style={{ fontFamily: 'outfit-medium' }}>{business.category}</Text>
                    </View>

                </View>

            </TouchableOpacity>
        )
    }
}