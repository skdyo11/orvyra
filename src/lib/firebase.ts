
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Hardcoded configuration to resolve environment variable issues
const firebaseConfig = {
  apiKey: "AIzaSyAtGOvWek5jP1shLA4lWFXRlGAnVCg-RFo",
  authDomain: "studio-7064186759-be376.firebaseapp.com",
  projectId: "studio-7064186759-be376",
  storageBucket: "studio-7064186759-be376.firebasestorage.app",
  messagingSenderId: "155496635773",
  appId: "1:155496635773:web:6d77f31ee63ca93a3bc014"
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, db, auth, googleProvider };
