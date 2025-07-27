import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC8xMs4UUO8ORA2rSHDgCR6EXPclilP5Wk",
  authDomain: "hexathon1.firebaseapp.com",
  projectId: "hexathon1",
  storageBucket: "hexathon1.firebasestorage.app",
  messagingSenderId: "739377653648",
  appId: "1:739377653648:web:598fb9ce8d47671ef0f515"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

