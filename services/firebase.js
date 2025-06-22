// Import the functions you need from the SDKs you need
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA5RHlRXuJzdi1Yv7UDCTj8FN8mM7iiChQ",
  authDomain: "ai-diet-planner-8c14c.firebaseapp.com",
  projectId: "ai-diet-planner-8c14c",
  storageBucket: "ai-diet-planner-8c14c.firebasestorage.app",
  messagingSenderId: "921175746799",
  appId: "1:921175746799:web:0ac81b19dba0aab184531a",
  measurementId: "G-LPE640S3DC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// export const auth =
//   Platform.OS === "web"
//     ? getAuth(app)
//     : initializeAuth(app, {
//         persistence: getReactNativePersistence(ReactNativeAsyncStorage),
//       });

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
