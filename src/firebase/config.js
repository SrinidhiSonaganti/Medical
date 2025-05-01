// src/firebase/config.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
const firebaseConfig = {
    apiKey: "AIzaSyDkB0NHtTj_WoEMLNxJL3NQDuXmxedyCJA",
    authDomain: "medai-24-82633.firebaseapp.com",
    projectId: "medai-24-82633",
    storageBucket: "medai-24-82633.firebasestorage.app",
    messagingSenderId: "707151913137",
    appId: "1:707151913137:web:a30aeec1edbf190ddd8290",
    measurementId: "G-18QQ8Y0VEZ"
  };
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
