import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBgVqWYleAalygY8bBuI1837kI-O_8mu5o",
  authDomain: "hospital-project-5ffd8.firebaseapp.com",
  projectId: "hospital-project-5ffd8",
  storageBucket: "hospital-project-5ffd8.appspot.com",
  messagingSenderId: "302972309759",
  appId: "1:302972309759:web:6f1aa9dd134fd68766fcca",
  measurementId: "G-EDFKHKJVQ9",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { app, auth };
