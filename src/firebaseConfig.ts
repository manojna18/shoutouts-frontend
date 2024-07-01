// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWp08jYGUmTekMOsk63aQx_a9elJQYSGg",
  authDomain: "shout-outs-b7cf2.firebaseapp.com",
  databaseURL: "https://shout-outs-b7cf2-default-rtdb.firebaseio.com",
  projectId: "shout-outs-b7cf2",
  storageBucket: "shout-outs-b7cf2.appspot.com",
  messagingSenderId: "119679729394",
  appId: "1:119679729394:web:3b684704d4e530bfcc5a6b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const authProvider = new GoogleAuthProvider();

export function signInWithGoogle(): void {
  signInWithPopup(auth, authProvider);
}

export function signOutOfGoogle(): void {
  auth.signOut();
}

export const storage = getStorage(app);
