// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9amr-nVbnc4G9F25GStk8HiqY_Gn0Mq0",
  authDomain: "shop-f0e96.firebaseapp.com",
  projectId: "shop-f0e96",
  storageBucket: "shop-f0e96.firebasestorage.app",
  messagingSenderId: "985918266367",
  appId: "1:985918266367:web:20fe9eb1e51054281be5ca",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
