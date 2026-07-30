// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBC0fFJFvnVQhhBCjFutVDH78gGik4RQjQ",
  authDomain: "emmanuel-ministry-34319.firebaseapp.com",
  projectId: "emmanuel-ministry-34319",
  storageBucket: "emmanuel-ministry-34319.firebasestorage.app",
  messagingSenderId: "660327907024",
  appId: "1:660327907024:web:c1b0028c9003696757a8d5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services
export const auth = getAuth(app);
export const db = getFirestore(app);