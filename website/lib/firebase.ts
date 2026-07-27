import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyAVNBVTyH85cWWUimAzSWvNVpw-xabu478",
  authDomain: "khushika-ecommerce.firebaseapp.com",
  projectId: "khushika-ecommerce",
  storageBucket: "khushika-ecommerce.firebasestorage.app",
  messagingSenderId: "745400889676",
  appId: "1:745400889676:web:da135517be1b0361f35fe9",
};


const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);

export const db = getFirestore(app);

export const storage = getStorage(app);


export default app;