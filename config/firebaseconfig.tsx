// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQSpqhiDZVNYRRUxPcdsujNyFZf7vW_zA",
  authDomain: "business-community-a1c43.firebaseapp.com",
  projectId: "business-community-a1c43",
  storageBucket: "business-community-a1c43.firebasestorage.app",
  messagingSenderId: "572767856333",
  appId: "1:572767856333:web:17ba412b2dfd31093c6b84",
  measurementId: "G-QD316PCP7X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app)
export const storage = getStorage(app)