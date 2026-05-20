
import { getFirebaseApp, getFirestoreInstance, getAuthInstance } from "@/firebase/config";
import { GoogleAuthProvider } from "firebase/auth";

const app = getFirebaseApp();
const db = getFirestoreInstance(app);
const auth = getAuthInstance(app);
const googleProvider = new GoogleAuthProvider();

export { app, db, auth, googleProvider };
