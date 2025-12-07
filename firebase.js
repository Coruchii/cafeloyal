// --- BAGIAN INI JANGAN DIHAPUS ---
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // <--- INI YG TADI HILANG/ERROR
// ----------------------------------

const firebaseConfig = {
  apiKey: "AIzaSyAN8uOgJqLanVbaA6HqLR462mm2Z996qaM",
  authDomain: "cafeloyal-lite.firebaseapp.com",
  projectId: "cafeloyal-lite",
  storageBucket: "cafeloyal-lite.firebasestorage.app",
  messagingSenderId: "475848872876",
  appId: "1:475848872876:web:84dd3bcf59920141f72009"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);