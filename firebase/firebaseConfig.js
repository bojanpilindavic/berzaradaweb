import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBXCv95kWUiesR-AEMNcpXDS0ac_ZtS4ag",
  authDomain: "my-job-rais.firebaseapp.com",
  projectId: "my-job-rais",
  storageBucket: "my-job-rais.firebasestorage.app",
  messagingSenderId: "970875178193",
  appId: "1:970875178193:web:00f7ea74b5624ca63389f0",
  measurementId: "G-E47F0GS61M",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

let auth;

if (Platform.OS === "web") {
  auth = getAuth(app);
} else {
  try {
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  } catch (e) {
    auth = getAuth(app);
  }
}

const db = getFirestore(app);
const storage = getStorage(app);

export const ADMIN_EMAIL = "matematicki_kutak@yahoo.com";

export const isAdmin = (email) => {
  return email === ADMIN_EMAIL;
};

export { app, auth, db, storage };
