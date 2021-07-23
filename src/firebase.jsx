import firebase from "firebase";
// import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCXqNRBlUdhnsZ6d8t-Hn6IiJgRfSSsov8",
  authDomain: "socialhandle-10811.firebaseapp.com",
  projectId: "socialhandle-10811",
  storageBucket: "socialhandle-10811.appspot.com",
  messagingSenderId: "834406032067",
  appId: "1:834406032067:web:52cd525e6123c5ceb8b876",
  measurementId: "G-6XK5HB3FF3"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider, storage };
