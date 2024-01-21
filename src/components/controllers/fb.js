// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBYDk3UXelJhW2s8WYljNast5788iqC0lk",
    authDomain: "nasser-school.firebaseapp.com",
    projectId: "nasser-school",
    storageBucket: "nasser-school.appspot.com",
    messagingSenderId: "247869400404",
    appId: "1:247869400404:web:cbecec330793496df354c1",
    measurementId: "G-NQQ6ZZJ2YQ"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
import { getStorage } from "firebase/storage";
const storage = getStorage(app);
export { storage as storage };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
// to get warning messages in the consol
db.settings({ timestampsInSnapshots: true, merge: true });

export default db;
