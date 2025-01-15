import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCHZA4HQVomZJCOt9Ld86UIo0c7dlmYUTg",
  authDomain: "react-twitter-app-eb369.firebaseapp.com",
  projectId: "react-twitter-app-eb369",
  storageBucket: "react-twitter-app-eb369.firebasestorage.app",
  messagingSenderId: "603908242181",
  appId: "1:603908242181:web:b8f9bdeb5c49d88c10956c"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);