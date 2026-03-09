import { db } from '@/config/firebaseconfig';
// import { useUser } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import { deleteDoc, doc } from 'firebase/firestore';
import React from 'react';
import { Alert, Image, Platform, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';

export default function intro({ business }: { business: any }) {


// const {user} = useUser()

  const router = useRouter()

  const Ondelete = () => {
    if (Platform.OS === 'web') {
      // Use window.confirm for web
      const confirmed = window.confirm('Are you sure you want to delete this business?');
      if (confirmed) {
        deleteBusiness();
      }
    } else {
      // Use Alert.alert for mobile
      Alert.alert(
        "Delete Business",
        "Are you sure you want to delete this business?",
        [
          {
            text: "Cancel",
            style: "cancel"
          },
          {
            text: "Delete",
            style: "destructive",
            onPress: () => deleteBusiness()
          }
        ]
      );
    }
  }
  
  const deleteBusiness = async () => {
    try {
      await deleteDoc(doc(db, "Businesslist", business?.id));
      
      if (Platform.OS === 'android') {
        ToastAndroid.show('Business deleted successfully', ToastAndroid.SHORT);
      } else if (Platform.OS === 'web') {
        alert('Business deleted successfully');
      } else {
        Alert.alert("Success", "Business deleted successfully");
      }
      
      router.back();
    } catch (error) {
      console.error("Error deleting business: ", error);
      
      if (Platform.OS === 'android') {
        ToastAndroid.show('Failed to delete business. Please try again.', ToastAndroid.LONG);
      } else if (Platform.OS === 'web') {
        alert('Failed to delete business. Please try again.');
      } else {
        Alert.alert("Error", "Failed to delete business. Please try again.");
      }
    }
  }


  return (
    <View>
      <View style={{
        display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
        position: 'absolute', width: '100%', height: 50, paddingHorizontal: 20, paddingVertical: 10, zIndex: 1
      }}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back-circle" size={40} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="heart-outline" size={40} color="black" />
        </TouchableOpacity>
      </View>
      <Image
        source={{ uri: business?.imageUrl }}
        style={{ width: '100%', height: 200 }}
      />
      <View style={{
        padding: 20, gap: 10
        , borderRadius: 10, marginHorizontal: 10, marginTop: -30, backgroundColor: '#ededed'
      }}>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ fontFamily: 'outfit-bold', fontSize: 20 }}>{business?.name}</Text>

            <TouchableOpacity onPress={() => Ondelete()}>
              <MaterialIcons name="delete" size={24} color="black" />
            </TouchableOpacity>

        </View>

        <Text style={{ fontFamily: 'outfit-medium', fontSize: 16, color: '#777777' }}>{business?.address}</Text>
      </View>



    </View>
  )
}