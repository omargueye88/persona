import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from 'firebase/auth';
import { getFirestore, enableNetwork, disableNetwork, doc, setDoc, getDoc } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyADKzOMEhZpXnTAJKc8h9Nlsk7koZ3JWAI",
  authDomain: "persona-d012a.firebaseapp.com",
  projectId: "persona-d012a",
  storageBucket: "persona-d012a.firebasestorage.app",
  messagingSenderId: "288163146357",
  appId: "1:288163146357:web:cebc9c763b19ceaea7a63c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);

// Auth functions
export const createUserAccount = async (email: string, password: string, displayName: string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  
  // Update user profile with display name
  await updateProfile(user, { displayName });
  
  // Store additional user data in Firestore
  await setDoc(doc(db, 'users', user.uid), {
    uid: user.uid,
    email: user.email,
    displayName: displayName,
    createdAt: new Date(),
    lastLoginAt: new Date(),
    gamesPlayed: 0,
    totalScore: 0
  });
  
  return userCredential;
};

export const signInWithEmail = (email: string, password: string) => 
  signInWithEmailAndPassword(auth, email, password);

export const signOutUser = () => signOut(auth);
export const onAuthStateChange = onAuthStateChanged;

// User data functions
export const getUserData = async (uid: string) => {
  const userDoc = await getDoc(doc(db, 'users', uid));
  return userDoc.exists() ? userDoc.data() : null;
};

export const updateUserLastLogin = async (uid: string) => {
  await setDoc(doc(db, 'users', uid), {
    lastLoginAt: new Date()
  }, { merge: true });
};

// Firestore network functions
export const enableFirestoreNetwork = () => enableNetwork(db);
export const disableFirestoreNetwork = () => disableNetwork(db);

export default app;