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
  apiKey: "TU_API_KEY",
  authDomain: "TU_PROYECTO.firebaseapp.com",
  projectId: "TU_PROYECTO",
  storageBucket: "TU_PROYECTO.appspot.com",
  messagingSenderId: "TU_SENDER_ID",
  appId: "TU_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
