import { FlatList, ScrollView, View } from 'react-native'
import { ExploreBusinessListCArd } from './ExploreBusinessListCArd'


export function ExploreBusinesslist({ businesslist }: { businesslist: any }) {

    return (
        <ScrollView
        
        style={{ paddingHorizontal: 10, marginTop: 20 , marginLeft: 20}}
        >
            <FlatList data={businesslist}
                renderItem={({ item, index }) => (
                    <ExploreBusinessListCArd businesslist={item}
                     key={index} />
                )}
            />
            <View style={{ height: 100 }}></View>
        </ScrollView>
    )
}
