import { useClerk, useUser } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React from 'react'
import { Alert, Image, ScrollView, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function Profile() {
  const { user } = useUser()
  const { signOut } = useClerk()
  const router = useRouter()

  const handleSignOut = async () => {
    try {
      await signOut()
      router.replace('/')
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
    }
  }

  const handleAddBusiness = () => {
    // Navigate to add business screen
    router.push('/add_business')
  }

  const handleMyBusiness = () => {
    // Navigate to my business screen
    router.push('/my-businessess')
  }

  const handleShareApp = async () => {
    try {
      await Share.share({
        message: 'Check out this amazing Business Directory app!',
        title: 'Business Directory',
      })
    } catch {
      Alert.alert('Error', 'Unable to share the app')
    }
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f5f5f5' }}
      contentInsetAdjustmentBehavior="automatic"
      bounces={false}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
      </View>

      <View style={styles.profileSection}>
        <Image
          source={user?.imageUrl ? { uri: user.imageUrl } : require('../../assets/images/react-logo.png')}
          style={styles.profileImage}
        />
        <Text style={styles.name}>{user?.firstName} {user?.lastName}</Text>
        <Text style={styles.email}>{user?.primaryEmailAddress?.emailAddress}</Text>
      </View>

      <View style={styles.menuSection}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={handleAddBusiness}
        >
          <View style={styles.menuIconContainer}>
            <Ionicons name="add-circle-outline" size={24} color="#7156f1" />
          </View>
          <Text style={styles.menuText}>Add Business</Text>
          <Ionicons name="chevron-forward" size={24} color="#ccc" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={handleMyBusiness}
        >
          <View style={styles.menuIconContainer}>
            <Ionicons name="business-outline" size={24} color="#7156f1" />
          </View>
          <Text style={styles.menuText}>My Business</Text>
          <Ionicons name="chevron-forward" size={24} color="#ccc" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={handleShareApp}
        >
          <View style={styles.menuIconContainer}>
            <Ionicons name="share-social-outline" size={24} color="#7156f1" />
          </View>
          <Text style={styles.menuText}>Share App</Text>
          <Ionicons name="chevron-forward" size={24} color="#ccc" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={handleSignOut}
        >
          <View style={styles.menuIconContainer}>
            <Ionicons name="log-out-outline" size={24} color="#f15156" />
          </View>
          <Text style={[styles.menuText, { color: '#f15156' }]}>Logout</Text>
          <Ionicons name="chevron-forward" size={24} color="#ccc" />
        </TouchableOpacity>
        <Text style={{ textAlign: 'center', padding: 10, fontFamily: 'outfit-light', marginTop: 25 }}>Developed by Sam @ 2026</Text>
      </View>
      <View style={{ marginBottom: 50 }}>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({

  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#7156f1',
  },
  title: {
    fontFamily: 'outfit-bold',
    fontSize: 28,
    color: '#fff',
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  name: {
    fontFamily: 'outfit-bold',
    fontSize: 24,
    color: '#333',
    marginBottom: 8,
  },
  email: {
    fontFamily: 'outfit-light',
    fontSize: 16,
    color: '#666',
  },
  menuSection: {
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuIconContainer: {
    width: 40,
    alignItems: 'center',
  },
  menuText: {
    flex: 1,
    fontFamily: 'outfit-medium',
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
})