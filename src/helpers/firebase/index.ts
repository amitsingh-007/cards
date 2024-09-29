import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyA7La3Tns0YA3rN0OG8ZRJIkv8gdEO5BxY",
  authDomain: "cards-dev-4dbd3.firebaseapp.com",
  databaseURL:
    "https://cards-dev-4dbd3-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "cards-dev-4dbd3",
  storageBucket: "cards-dev-4dbd3.appspot.com",
  messagingSenderId: "913646213990",
  appId: "1:913646213990:web:fa4e0b9e3d603945fc06a7",
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
