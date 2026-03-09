import * as ImageManipulator from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from 'expo-router';
import { collection, doc, getDocs, query, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, Platform, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import { db } from '@/config/firebaseconfig';
import { useUser } from '@clerk/clerk-expo';





const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginTop: 50 },
  subtitle: { textAlign: 'center', marginTop: 20 },
  image: { width: 200, height: 200, marginTop: 50, marginLeft: 'auto', marginRight: 'auto', borderRadius: 10 },
  section: { marginTop: 20, paddingHorizontal: 20 },
  label: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  inputContainer: { backgroundColor: '#f0f0f0', padding: 10, borderRadius: 5, borderColor: '#7156f1', borderWidth: 1 },
  input: { padding: 5 },
  submitButton: { backgroundColor: '#7156f1', padding: 15, borderRadius: 10, marginTop: 30, alignItems: 'center', marginHorizontal: 20 },
  submitText: { color: '#fff', fontFamily: 'outfit-bold' },
  bottomSpacer: { marginBottom: 50 },
});


export default function add_business() {

  const navigation = useNavigation()
  const {user} = useUser();
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState<string | null>(null)
  const [category, setCategory] = useState<{ label: string; value: string }[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [address, setAddress] = useState<string>('')
  const [contact, setContact] = useState<string>('')
  const [website, setWebsite] = useState<string>('')
  const [about, setAbout] = useState<string>('')




  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: 'Add Business'
    })
    GetCategoryList()
  }, [])

  const onImagepick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      allowsEditing: true,
      quality: 0.5, // Reduce quality to 50%
    });

    console.log(result)

    if (!result.canceled) {
      setImage(result.assets[0].uri)
      console.log('Image selected:', result.assets[0].uri)
    }
  }

  const GetCategoryList = async () => {
    const q = query(collection(db, 'Categorylist'))
    const querysnapshot = await getDocs(q)

    querysnapshot.forEach((docs) => {
      console.log(docs.data())
      setCategory(prev => [...prev, {
        label: (docs.data()).name,
        value: (docs.data()).name
      }])
    })
  }

  const onSubmit = async () => {
    // Handle form submission logic here
    console.log('Form submitted with values:', { name, address, contact, website, about, selectedCategory, image })
    setLoading(true)
    
    // Validate required fields
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter business name')
      setLoading(false)
      return
    }
    if (!address.trim()) {
      Alert.alert('Error', 'Please enter business address')
      setLoading(false)
      return
    }
    if (!selectedCategory) {
      Alert.alert('Error', 'Please select a category')
      setLoading(false)
      return
    }
    if (!image) {
      Alert.alert('Error', 'Please select an image')
      setLoading(false)
      return
    }

    try {
      // Convert image to base64 and save directly to Firestore
      const base64Image = await convertImageToBase64(image)
      await saveBusiness(base64Image)
    } catch (error: any) {
      console.error('Error in onSubmit:', error)
      setLoading(false)
      Alert.alert('Error', `Failed to add business: ${error.message || 'Please try again.'}`)
    }
  }

  const convertImageToBase64 = async (uri: string) => {
    console.log('Converting image to base64, platform:', Platform.OS)
    console.log('Original image URI:', uri)
    
    // Compress and resize image first
    const manipulatedImage = await ImageManipulator.manipulateAsync(
      uri,
      [
        { resize: { width: 800 } }, // Resize to max width of 800px
      ],
      { 
        compress: 0.5, // Compress to 50% quality
        format: ImageManipulator.SaveFormat.JPEG 
      }
    );
    
    console.log('Compressed image URI:', manipulatedImage.uri)
    
    // Fetch the compressed image as a blob
    const response = await fetch(manipulatedImage.uri)
    
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`)
    }
    
    const blob = await response.blob()
    console.log('Blob created, size:', blob.size, 'type:', blob.type)
    
    // Check if blob size is still too large
    const maxSize = 900000; // ~900KB to leave room for base64 encoding overhead
    if (blob.size > maxSize) {
      throw new Error(`Image is too large (${Math.round(blob.size / 1024)}KB). Please select a smaller image.`)
    }

    // Convert blob to base64
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result as string
        console.log('Image converted to base64, length:', base64String.length)
        console.log('Estimated size:', Math.round(base64String.length / 1024), 'KB')
        resolve(base64String)
      }
      reader.onerror = reject
      reader.readAsDataURL(blob)
    })
  }

  const saveBusiness = async (imageBase64: string) => {
    try {
      await setDoc(doc(db, 'Businesslist', Date.now().toString()), {
      name: name,
      address: address,
      contact: contact,
      website: website,
      about: about,
      category: selectedCategory,
      userName: user?.fullName,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      userImage: user?.imageUrl,
      imageUrl: imageBase64, // Store base64 image directly in Firestore
      reviews: []
      })

      setLoading(false)
      
      if (Platform.OS === 'android') {
      ToastAndroid.show('Business Added Successfully', ToastAndroid.LONG)
      }
      else if (Platform.OS === 'web') {
        alert('Business Added Successfully')
      }
      
      
      navigation.goBack()
      // alert('Business Added Successfully')
    } catch (error) {
      console.error('Error saving business:', error)
      setLoading(false)
      Alert.alert('Error', 'Failed to add business. Please try again.')
    }
  }

  return (
    <>
      <ScrollView style={styles.container}
        contentInsetAdjustmentBehavior="automatic"
        bounces={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Adding Businesses</Text>
        <Text style={styles.subtitle}>Fill all details to add new business</Text>
        <TouchableOpacity
          onPress={onImagepick}
        >
          <Image
            source={image ? { uri: image } : require('./../assets/images/color-picker.png')}
            style={{ width: 200, height: 200, marginTop: 50, marginLeft: 'auto', marginRight: 'auto', borderRadius: 10 }}
          />

        </TouchableOpacity>
        <View style={styles.section}>
          <Text style={styles.label}>Name</Text>
          <View style={styles.inputContainer}>
            <TextInput placeholder="Enter your name here" style={styles.input} value={name} onChangeText={setName} />
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Address</Text>
          <View style={styles.inputContainer}>
            <TextInput placeholder="Enter Your Address here" style={styles.input} value={address} onChangeText={setAddress} />
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Contact</Text>
          <View style={styles.inputContainer}>
            <TextInput placeholder="Enter Contact Number" style={styles.input} value={contact} onChangeText={setContact} />
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Website</Text>
          <View style={styles.inputContainer}>
            <TextInput placeholder="Enter Website " style={styles.input} value={website} onChangeText={setWebsite} />
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>About</Text>
          <View style={styles.inputContainer}>
            <TextInput placeholder="Enter about your business" style={styles.input} multiline numberOfLines={4} value={about} onChangeText={setAbout} />
          </View>
        </View>
        <View style={{
          backgroundColor: '#f0f0f0',
          borderRadius: 5,
          borderColor: '#7156f1',
          borderWidth: 5,
          marginHorizontal: 20,
          marginTop: 20,

        }}>
          <RNPickerSelect
            onValueChange={(value) => setSelectedCategory(value)}
            items={category.length > 0 ? category : [{ label: 'Loading...', value: 'Loading...' }]}
          />
        </View>

        <TouchableOpacity style={styles.submitButton} 
        disabled={loading}
        onPress={onSubmit}>
        {loading?
        <ActivityIndicator size={'large'} color={'white'}/>:
          <Text style={styles.submitText}>Add New Business</Text>
        }
        </TouchableOpacity>

        <View style={styles.bottomSpacer}>
        </View>
      </ScrollView>
    </>
  )
}