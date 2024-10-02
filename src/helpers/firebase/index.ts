import { initializeApp } from "firebase/app";

const getFirebaseConfig = () => {
  if (process.env.NEXT_PUBLIC_ENV === "development") {
    return {
      apiKey: "AIzaSyA7La3Tns0YA3rN0OG8ZRJIkv8gdEO5BxY",
      authDomain: "cards-dev-4dbd3.firebaseapp.com",
      databaseURL:
        "https://cards-dev-4dbd3-default-rtdb.asia-southeast1.firebasedatabase.app",
      projectId: "cards-dev-4dbd3",
      storageBucket: "cards-dev-4dbd3.appspot.com",
      messagingSenderId: "913646213990",
      appId: "1:913646213990:web:fa4e0b9e3d603945fc06a7",
    };
  }
  return {
    apiKey: "AIzaSyCIbmrAPnn3GM8oEPkMywM39jiGmwpYzXs",
    authDomain: "cards-4fbde.firebaseapp.com",
    databaseURL:
      "https://cards-4fbde-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "cards-4fbde",
    storageBucket: "cards-4fbde.appspot.com",
    messagingSenderId: "749565710584",
    appId: "1:749565710584:web:312862e475f209e979eb0d",
  };
};

const firebaseApp = initializeApp(getFirebaseConfig());

export default firebaseApp;
