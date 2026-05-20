import { initializeFirebase } from '@/firebase';

// Use the centralized initialization to avoid multiple app instances
const { firestore, auth: firebaseAuth } = initializeFirebase();

export const db = firestore;
export const auth = firebaseAuth;
