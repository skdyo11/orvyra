import { getFirebaseApp, getFirestoreInstance, getAuthInstance } from './config';
import { FirebaseApp } from 'firebase/app';
import { Firestore } from 'firebase/firestore';
import { Auth } from 'firebase/auth';

/**
 * Initializes Firebase services and returns the app, firestore, and auth instances.
 */
export function initializeFirebase(): { app: FirebaseApp; firestore: Firestore; auth: Auth } {
  const app = getFirebaseApp();
  const firestore = getFirestoreInstance(app);
  const auth = getAuthInstance(app);
  return { app, firestore, auth };
}

export { 
  FirebaseProvider, 
  useFirebase, 
  useFirebaseApp, 
  useFirestore, 
  useAuth 
} from './provider';

export { FirebaseClientProvider } from './client-provider';
export { useCollection } from './firestore/use-collection';
export { useDoc } from './firestore/use-doc';
export { useUser } from './auth/use-user';
export { useMemoFirebase } from './utils';
