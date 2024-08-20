// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDrAyBMqW7mxvj-8RwncUusUjB_KQ7c02E",
  authDomain: "flashcard-saas-f6be2.firebaseapp.com",
  projectId: "flashcard-saas-f6be2",
  storageBucket: "flashcard-saas-f6be2.appspot.com",
  messagingSenderId: "876858913147",
  appId: "1:876858913147:web:1fdbc9f9bbc22650f2cdde",
  measurementId: "G-EG7QKZ23JK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);