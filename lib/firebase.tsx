// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCiqV9Vr-uk8bWtzbv4VeIm8GJoxWA4EwE",
  authDomain: "brandonmartinezdev.firebaseapp.com",
  projectId: "brandonmartinezdev",
  storageBucket: "brandonmartinezdev.firebasestorage.app",
  messagingSenderId: "786329817011",
  appId: "1:786329817011:web:abf12b6f6b18223c8305c6",
  measurementId: "G-BG63DQK9TP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth(app);