import { initializeApp } from "firebase/app";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  getAuth,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCIpmtpqyUGpsQtZmW4LlLBS-C8Q1Qbfck",
  authDomain: "islamblog-2ecfb.firebaseapp.com",
  projectId: "islamblog-2ecfb",
  storageBucket: "islamblog-2ecfb.appspot.com",
  messagingSenderId: "35731388595",
  appId: "1:35731388595:web:cbef8418873fe4b06298c6",
  measurementId: "G-YGRPZTYVQX"
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();