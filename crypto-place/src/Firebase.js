import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBx9pf_8xloTPXyrbyoEEZh-5kWp9q1bi8",
  authDomain: "coingecko-3d6d8.firebaseapp.com",
  projectId: "coingecko-3d6d8",
  storageBucket: "coingecko-3d6d8.firebasestorage.app",
  messagingSenderId: "736989545022",
  appId: "1:736989545022:web:976f14960399361c62076f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password)=>{
  try{
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      name, 
      email,
      authProvider: 'local',
      createdAt: new Date()   //Timestamp
    })
  } catch(error){
    console.log('Signup error',error);
    toast.error(error.code.split('/')[1].split('-').join(' '));
    throw error;
  }
}

const login = async (email, password)=>{
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log('Login error', error);
    toast.error(error.code.split('/')[1].split('-').join(' '));
    throw error;
  }
}

const logout = ()=>{
  try{
    signOut(auth);
  } catch(error){
    console.log('Logout error', error);
    toast.error(error.code.split('/')[1].split('-').join(' '));
    throw error;
  }
}

export {auth, db, login, signup, logout}