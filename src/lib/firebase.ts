import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAtGOvWek5jP1shLA4lWFXRlGAnVCg-RFo",
  authDomain: "studio-7064186759-be376.firebaseapp.com",
  projectId: "studio-7064186759-be376",
  storageBucket: "studio-7064186759-be376.firebasestorage.app",
  messagingSenderId: "155496635773",
  appId: "1:155496635773:web:6d77f31ee63ca93a3bc014"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);
export const auth = getAuth(app);
