import { initializeApp } from "firebase/app";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeAuth,getReactNativePersistence } from "firebase/auth/react-native";

const firebaseConfig = {
  apiKey: "AIzaSyC7eejQzqpyz4XmbuiFp_9brV90h56p-cI",
  authDomain: "finanzas-7a5b1.firebaseapp.com",
  projectId: "finanzas-7a5b1",
  storageBucket: "finanzas-7a5b1.appspot.com",
  messagingSenderId: "537976435132",
  appId: "1:537976435132:web:ccb6fbe485f6bca98a7bb9"
};

// Initialize Firebase
//expo community no es compatible 
export const app = initializeApp(firebaseConfig);
export const auth = initializeApp(app,{persistence: getReactNativePersistence(AsyncStorage)})