import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getFirestore } from "firebase/firestore";

const app =  firebase.initializeApp ( {
  apiKey: "AIzaSyCcvYS84adGAwepgmznMJKthfiDcxrT9Bk",
  authDomain: "task-tracker-5daaf.firebaseapp.com",
  projectId: "task-tracker-5daaf",
  storageBucket: "task-tracker-5daaf.appspot.com",
  messagingSenderId: "271363091714",
  appId: "1:271363091714:web:ba4c2aaa0b8de64cbc661b",
});

export const auth = app.auth();
export const firestore = getFirestore();
export default app;