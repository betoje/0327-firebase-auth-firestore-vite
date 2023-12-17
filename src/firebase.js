// firebase.js 
// crea los usuarios en firestore con document id provisto
// document with custom id (vs document with automatically generated id)

import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  query,
  getDocs,
  collection,
  where,
  addDoc,
  setDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCSXWhA4eNukDw9AIauBp6iZBFgHl6yv9M",
  authDomain: "fir-authentication-42bda.firebaseapp.com",
  projectId: "fir-authentication-42bda",
  storageBucket: "fir-authentication-42bda.appspot.com",
  messagingSenderId: "590849888140",
  appId: "1:590849888140:web:33bcc05350bc9dae1490a9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const userCollection = collection(db, "users"); // new
const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;

    const userDocRef = doc(userCollection, user.uid); // new code
    const userDocSnapshot = await getDoc(userDocRef);
    if (!userDocSnapshot.exists()) {
      await setDoc(userDocRef, {
        uid: user.uid,
        name: user.displayName,
        balance: 0,
        authProvider: "google",
        email: user.email,
      })
    }

    // const q = query(collection(db, "users"), where("uid", "==", user.uid)); // old code
    // const docs = await getDocs(q);
    // if (docs.docs.length === 0) {
    //   await addDoc(collection(db, "users"), {
    //     uid: user.uid,
    //     name: user.displayName,
    //     balance: 0,
    //     authProvider: "google",
    //     email: user.email,
    //   });
    // }    

  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    const userDocRef = doc(userCollection, user.uid); // new code
    await setDoc(userDocRef, {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
      balance: 0
    })

    // await addDoc(collection(db, "users"), { // old code
    //   uid: user.uid,
    //   name,
    //   authProvider: "local",
    //   email,
    //   balance: 0
    // });

  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};