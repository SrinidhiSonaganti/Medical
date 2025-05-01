// src/firebase/functions.js
import { auth, googleProvider } from './config';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';

export const loginWithEmail = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const signupWithEmail = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

export const loginWithGoogle = () =>
  signInWithPopup(auth, googleProvider);
