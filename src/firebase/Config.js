import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBlJdnbvkzB8c84_YUE_BW_y_zoxXnJWng",
  authDomain: "instagram-f373c.firebaseapp.com",
  databaseURL: "https://instagram-f373c.firebaseio.com",
  projectId: "instagram-f373c",
  storageBucket: "instagram-f373c.appspot.com",
  messagingSenderId: "1001970480244",
  appId: "1:1001970480244:web:1b70ebda7473b421188d21",
  measurementId: "G-M5YNCC98KB",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { auth, db, storage };
