//! FIREBASE INIT
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_KEY,
    authDomain: 'test-c1eda.firebaseapp.com',
    projectId: 'test-c1eda',
    storageBucket: 'test-c1eda.appspot.com',
    messagingSenderId: '650467148866',
    appId: '1:650467148866:web:3c2c3b3d223b74bef1d9db',
};

const provider = new GoogleAuthProvider();
const app = initializeApp(firebaseConfig);
const auth = getAuth();

export { app, auth, provider };
