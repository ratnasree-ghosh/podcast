// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getStorage} from "firebase/storage";
import {getFirestore} from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAU7qLN8ar9ebmj3BBEjwH6Z6S2cnghYCA",
  authDomain: "podcast-app-react-d38e2.firebaseapp.com",
  projectId: "podcast-app-react-d38e2",
  storageBucket: "podcast-app-react-d38e2.appspot.com",
  messagingSenderId: "454794733252",
  appId: "1:454794733252:web:cd3f9b1e2c522c96d58b91",
  measurementId: "G-JRQT8NH92Y"
};

//Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export {auth, db, storage};
