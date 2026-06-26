
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCGfZf7XUYJ-NJDq45Yl-ZUMuw2UWOB-YQ",
  authDomain: "mini-chat-657b6.firebaseapp.com",
  projectId: "mini-chat-657b6",
  storageBucket: "mini-chat-657b6.firebasestorage.app",
  messagingSenderId: "644339180810",
  appId: "1:644339180810:web:4685f47fbac86feacf46f3"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)