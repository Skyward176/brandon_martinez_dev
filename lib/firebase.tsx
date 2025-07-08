// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { collection, getDocs, addDoc } from 'firebase/firestore';
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

// Migration function to move techs from homepage to their own collection
export const migrateTechsToCollection = async () => {
  try {
    // Get existing techs from homepage
    const homepageRef = await getDocs(collection(db, 'homepage'));
    if (homepageRef.docs.length === 0) return;

    const homepageData = homepageRef.docs[0].data();
    const existingTechs = homepageData.techs || [];

    // Check if techs collection already exists
    const techsRef = await getDocs(collection(db, 'techs'));
    if (techsRef.docs.length > 0) {
      console.log('Techs collection already exists');
      return;
    }

    // Add each tech to the techs collection
    for (const tech of existingTechs) {
      await addDoc(collection(db, 'techs'), {
        name: tech.name,
        icon: tech.icon,
        tags: tech.tags || []
      });
    }

    console.log('Migration completed successfully');
  } catch (error) {
    console.error('Error migrating techs:', error);
  }
};