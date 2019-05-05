import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/database";
import "firebase/auth";
import fbConfig from "./fbConfig";

firebase.initializeApp(fbConfig);
firebase.firestore();
firebase.auth();

export default firebase;
