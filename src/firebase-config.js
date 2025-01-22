import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore"
import { getAuth } from "firebase/auth";
import {getStorage} from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBlWQkcGb4dqEZLEmX86vgqwXy7Dj2fos",
  authDomain: "animogamedev-b3609.firebaseapp.com",
  projectId: "animogamedev-b3609",
  storageBucket: "animogamedev-b3609.appspot.com",
  messagingSenderId: "392266176219",
  appId: "1:392266176219:web:1819e521f9316f01ecdefe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
