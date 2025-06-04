// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAULodQQBT_Jp0JvFhKkbJFNu3wq_DJ4a0",
  authDomain: "finance-tracker-b9739.firebaseapp.com",
  projectId: "finance-tracker-b9739",
  storageBucket: "finance-tracker-b9739.firebasestorage.app",
  messagingSenderId: "476287535958",
  appId: "1:476287535958:web:38f945057e4667a712a4f7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider, doc, setDoc };
