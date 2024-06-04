import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

import { auth, provider } from '../firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

//! LOGIN FUNCTION
export const loginUser = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return {
            status: true,
            data: userCredential.user,
        };
    } catch {
        return {
            status: false,
        };
    }
};

//! REGISTER FUNCTION
export const createUser = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return {
            status: true,
            data: userCredential.user,
        };
    } catch (error) {
        return {
            status: false,
            data: error.code,
        };
    }
};

//! GOOGLE FUNCTION

export const googleUser = async () => {
    try {
        const result = signInWithPopup(auth, provider);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        return {
            status: true,
            data: credential,
        };
    } catch (error) {
        return {
            status: false,
            data: error.code,
        };
    }
};
