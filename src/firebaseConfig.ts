// src/firebaseConfig.ts

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyChCfAtmkbqagRWoeAE2RN9D7V0JDb0XPk",
    authDomain: "setanta-training.firebaseapp.com",
    projectId: "setanta-training",
    storageBucket: "setanta-training.firebasestorage.app",
    messagingSenderId: "154801778123",
    appId: "1:154801778123:web:ecf0fed425fbb8a2e61a4e",
    measurementId: "G-SWSY190MLE"
  };  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default app;
