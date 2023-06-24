import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDGXUpCQonbkiB_dwppavPhp-pOl4FLqPQ",
    authDomain: "clone-c47fd.firebaseapp.com",
    projectId: "clone-c47fd",
    storageBucket: "clone-c47fd.appspot.com",
    messagingSenderId: "890145997981",
    appId: "1:890145997981:web:1e2fbeffdfb9b746244074",
    measurementId: "G-CFBCDFTVRC"
};

// Initialize Firebase  
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);