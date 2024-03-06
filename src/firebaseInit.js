// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDipVy4TfJjYHq5p60X71sMpMtLTB77hMY",
  authDomain: "e-com-f1699.firebaseapp.com",
  projectId: "e-com-f1699",
  storageBucket: "e-com-f1699.appspot.com",
  messagingSenderId: "992275056606",
  appId: "1:992275056606:web:5150e6a39a8b903e433f4f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);