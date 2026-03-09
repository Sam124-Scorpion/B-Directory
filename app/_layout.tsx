import LoginScreen from '@/components/loginscreen';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo';
import { tokenCache } from "@clerk/clerk-expo/token-cache";
// import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from 'expo-font';
import { Stack } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from "react-native";

export default function RootLayout() {
    useFonts({
    'outfit-light': require('../assets/fonts/Outfit-Light.ttf'),
    'outfit-medium': require('../assets/fonts/Outfit-Medium.ttf'),
    'outfit-bold': require('../assets/fonts/Outfit-Bold.ttf'),
  });

  const colorScheme = useColorScheme()

  return (
    <ClerkProvider publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!}
    tokenCache={tokenCache}>
      <SignedIn>
        <Stack screenOptions={{
          headerShown: false
        }}>
          {/* <Stack.Screen name="index" /> */}
          <Stack.Screen name="(tabs)" />
        </Stack>
      </SignedIn>
      <SignedOut>
        <LoginScreen />
      </SignedOut>
    </ClerkProvider>

      // <ClerkProvider 
      //   publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!}
      //   tokenCache={tokenCache}>
      //   <Stack>
      //     <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      //     <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      //   </Stack>
      //   <StatusBar style="auto" />
      // </ClerkProvider>




  )

}
