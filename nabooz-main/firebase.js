import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  // firebase config goes here
  apiKey: "AIzaSyALNVMsSSGivn8Uk7OLVRogD_qACGzu_r0",
  authDomain: "nabooz-5984d.firebaseapp.com",
  projectId: "nabooz-5984d",
  storageBucket: "nabooz-5984d.appspot.com",
  messagingSenderId: "852061527736",
  appId: "1:852061527736:web:0ae73ab03e24c7d9919e4d",
  measurementId: "G-G3W43R0CBV"
  
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
  firebase.firestore().settings({ experimentalForceLongPolling: true});
} else {
  app = firebase.app();
}

const db = app.firestore();


export { db };
