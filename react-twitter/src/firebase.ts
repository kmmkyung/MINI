import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

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
export const db = getFirestore(app);
export const storage = getStorage(app); // 스토리지 유료로 적용할수없음
