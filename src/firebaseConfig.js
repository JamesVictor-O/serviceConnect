import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
const firebaseConfig = {
    apiKey: "AIzaSyCrX3T9V_3LYw_smMZIVQlBOP-09IxGrf0",
    authDomain: "serviceconnect-bd8ea.firebaseapp.com",
    projectId: "serviceconnect-bd8ea",
    storageBucket: "serviceconnect-bd8ea.firebasestorage.app",
    messagingSenderId: "1052699541018",
    appId: "1:1052699541018:web:956a85c6f742fc9e1cdba3"
  };

    // Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const db=getFirestore(app)