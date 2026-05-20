
import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
import { getAuth, Auth } from "firebase/auth";

// Hardcoded configuration to resolve environment variable issues
export const firebaseConfig = {
  apiKey: "AIzaSyAtGOvWek5jP1shLA4lWFXRlGAnVCg-RFo",
  authDomain: "studio-7064186759-be376.firebaseapp.com",
  projectId: "studio-7064186759-be376",
  storageBucket: "studio-7064186759-be376.firebasestorage.app",
  messagingSenderId: "155496635773",
  appId: "1:155496635773:web:6d77f31ee63ca93a3bc014"
};

export function getFirebaseApp(): FirebaseApp {
  return getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
}

export function getFirestoreInstance(app: FirebaseApp): Firestore {
  return getFirestore(app);
}

export function getAuthInstance(app: FirebaseApp): Auth {
  return getAuth(app);
}
