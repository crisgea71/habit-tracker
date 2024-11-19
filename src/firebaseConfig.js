// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPAtzWD3GjKqM8D_uBiydB_JlCye4rHgo",
  authDomain: "habit-tracker-70151.firebaseapp.com",
  projectId: "habit-tracker-70151",
  storageBucket: "habit-tracker-70151.appspot.com", // corectarea link-ului
  messagingSenderId: "406749222940",
  appId: "1:406749222940:web:80de632e75ced648c9a7d9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Export Firebase Auth
export { auth };