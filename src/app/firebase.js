// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: String(process.env.GOOGLE_AUTH_API_KEY),
  authDomain: "spiinder.firebaseapp.com",
  projectId: "spiinder",
  storageBucket: "spiinder.appspot.com",
  messagingSenderId: "192797980607",
  appId: "1:192797980607:web:faa892354f89382355530a",
  measurementId: "G-L9F730TJKM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);