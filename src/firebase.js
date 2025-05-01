import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

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
const db = getFirestore(app); // Initialize Firestore

// Export both auth and db correctly
export { auth, db }; 
