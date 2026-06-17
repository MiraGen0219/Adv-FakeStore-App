// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCigC9KT04f14aGRO_jpIEycD_2afZrzmk",
  authDomain: "advfakestoreapp.firebaseapp.com",
  projectId: "advfakestoreapp",
  storageBucket: "advfakestoreapp.firebasestorage.app",
  messagingSenderId: "907841205262",
  appId: "1:907841205262:web:4930babdee1b1592cbb85f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;