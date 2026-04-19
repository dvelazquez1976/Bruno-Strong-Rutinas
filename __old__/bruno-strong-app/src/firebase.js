import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// ====================================================
// CONFIGURACION FIREBASE
// Reemplaza estos valores con los de tu proyecto Firebase
// Instrucciones:
// 1. Ve a https://console.firebase.google.com/
// 2. Crea un nuevo proyecto
// 3. Habilita Authentication > Email/Password
// 4. Habilita Firestore Database
// 5. Copia tu configuracion aqui
// ====================================================
const firebaseConfig = {
  apiKey: "AIzaSyDsSm9He7465Va4xqvBrKEnaqC168b2Vho",
  authDomain: "bruno-strong.firebaseapp.com",
  projectId: "bruno-strong",
  storageBucket: "bruno-strong.firebasestorage.app",
  messagingSenderId: "102097236836",
  appId: "1:102097236836:web:331dfd462dfedc2fc70071",
  measurementId: "G-J0PH975663"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
