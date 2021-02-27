import firebase from 'firebase/app';
import '@firebase/firestore';


const firebaseConfig = {    
    apiKey: "AIzaSyAjc1cq2hz8GZvJa-7L_t-WBX6WwfBrZHw",
    authDomain: "space-hack.firebaseapp.com",
    projectId: "space-hack",
    storageBucket: "space-hack.appspot.com",
    messagingSenderId: "288271440610",
    appId: "1:288271440610:web:4ba472a4e99d1156f29cbb",
    measurementId: "G-ZM8BJQT3QX"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
 } else {
    firebase.app(); 
 }

var db = firebase.firestore();

export {db, firebase };