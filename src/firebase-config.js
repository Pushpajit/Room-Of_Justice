import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCT809FEd0vnMvuUJWV50Z36OTh1X8FcbA",
  authDomain: "react-app-5c093.firebaseapp.com",
  projectId: "react-app-5c093",
  storageBucket: "react-app-5c093.appspot.com",
  messagingSenderId: "182569069008",
  appId: "1:182569069008:web:530df58e832b66b274b1d5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const db = getFirestore(app);

export default auth;