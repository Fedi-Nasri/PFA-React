// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getDatabase} from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6CRBkmmDcxrmNRtwUgEjmew8dHVXjOTA",
  authDomain: "admindashboard-fa64a.firebaseapp.com",
  databaseURL: "https://admindashboard-fa64a-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "admindashboard-fa64a",
  storageBucket: "admindashboard-fa64a.appspot.com",
  messagingSenderId: "168109907829",
  appId: "1:168109907829:web:91e6b3500ed6aaa1407d3c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database =getDatabase(app);