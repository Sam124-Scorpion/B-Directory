import { useSSO } from "@clerk/clerk-expo";
import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useWarmUpBrowser } from "../hooks/useWarmUpBrowser";

WebBrowser.maybeCompleteAuthSession()

export default function LoginScreen() {
  useWarmUpBrowser();

   const { startSSOFlow } = useSSO();

  async function handleSSO() {
    try {
      const { createdSessionId, setActive } =
        await startSSOFlow({
          strategy: "oauth_google", // or "oauth_github", "oauth_apple"
        });

      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
      }
    } catch (err) {
      console.error("SSO error", err);
    }
  }
  return (
    <View
      style={styles.subContainer}
    >
      <Image source={require('../assets/images/tdemo.webp')} style={{
        borderColor: '#7156f1',
        borderWidth: 2,
        width: 325,
        height: 450,
        borderRadius: 50,
        marginTop: 40,
        marginBottom: 20
      }} />

      <View style = {styles.subContainer}>
        <Text style={{
          fontFamily: 'outfit-bold', color: '#333', fontSize: 30, 
          textAlign: 'center'
        }}>Your Ultimate 
        <Text style={{ fontFamily: 'outfit-bold',
           color: '#7156f1' }}> Community Business Directory</Text> App</Text>
        <Text style={{ fontFamily: 'outfit-light', 
          color: '#666', 
          fontSize: 16, 
          marginVertical: 10,
          textAlign: 'center', 
          marginTop: 10 }}>Find your favorite businesses near you and post your own business to your community with ease.</Text>

          <TouchableOpacity style={{
            marginTop: 20,
            backgroundColor: '#7156f1',
            paddingVertical: 12,
            paddingHorizontal: 30,
            borderRadius: 30
          }}
          
          onPress={handleSSO}
          >
            <Text style={{ color: '#fff', fontFamily: 'outfit-light', fontSize: 13 }}>Let&apos;s Get Started</Text>
          </TouchableOpacity>

      </View>


    </View>
  )
}

const styles = StyleSheet.create({
    subContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})