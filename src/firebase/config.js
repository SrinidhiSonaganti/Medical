// src/firebase/config.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';  // Import Firestore

const firebaseConfig = {
  apiKey: "AIzaSyDkB0NHtTj_WoEMLNxJL3NQDuXmxedyCJA",
  authDomain: "medai-24-82633.firebaseapp.com",
  projectId: "medai-24-82633",
  storageBucket: "medai-24-82633.firebasestorage.app",
  messagingSenderId: "707151913137",
  appId: "1:707151913137:web:a30aeec1edbf190ddd8290",
  measurementId: "G-18QQ8Y0VEZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);  // Initialize Firestore

// Export auth, googleProvider, and db
export { auth, googleProvider, db };
