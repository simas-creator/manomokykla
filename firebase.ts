// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCt-1UgbgOYSmqArlFvZXU5KnmpfNThdqo",
  authDomain: "manomokykla-440be.firebaseapp.com",
  projectId: "manomokykla-440be",
  storageBucket: "manomokykla-440be.firebasestorage.app",
  messagingSenderId: "1000563737803",
  appId: "1:1000563737803:web:8ae73eacae56137b5d474e",
  measurementId: "G-8V2RN3XLVX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export {storage}