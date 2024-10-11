import { initializeApp } from 'firebase/app';

const getFirebaseConfig = () => {
  if (process.env.NEXT_PUBLIC_ENV === 'development') {
    return {
      apiKey: 'AIzaSyA7La3Tns0YA3rN0OG8ZRJIkv8gdEO5BxY',
      authDomain: 'cards-dev-4dbd3.firebaseapp.com',
      databaseURL:
        'https://cards-dev-4dbd3-default-rtdb.asia-southeast1.firebasedatabase.app',
      projectId: 'cards-dev-4dbd3',
      storageBucket: 'cards-dev-4dbd3.appspot.com',
      messagingSenderId: '913646213990',
      appId: '1:913646213990:web:fa4e0b9e3d603945fc06a7',
    };
  }
  return {
    apiKey: 'AIzaSyBWXDuG6p5yvHaPx5DBHxfmH5jpa62mfsI',
    authDomain: 'cards-80b7c.firebaseapp.com',
    databaseURL:
      'https://cards-80b7c-default-rtdb.asia-southeast1.firebasedatabase.app',
    projectId: 'cards-80b7c',
    storageBucket: 'cards-80b7c.appspot.com',
    messagingSenderId: '876696839354',
    appId: '1:876696839354:web:af7d2ab261c85351f08e83',
  };
};

const firebaseApp = initializeApp(getFirebaseConfig());

export default firebaseApp;
