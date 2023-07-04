import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCaIm_kIojNK8UEaevcx4MnNkwFyhANMN4",
  authDomain: "next-blog-743e3.firebaseapp.com",
  projectId: "next-blog-743e3",
  storageBucket: "next-blog-743e3.appspot.com",
  messagingSenderId: "1037890231581",
  appId: "1:1037890231581:web:c209d60e5bffe35e2c55f4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const storage = getStorage();
