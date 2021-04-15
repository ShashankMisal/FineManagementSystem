import firebase from "firebase/app";
// import 'firebase/auth';
import 'firebase/firebase-firestore';
import firebaseConfig from './config';

 firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore(); 
//   const auth = firebase.auth();
//   const provider = new firebase.auth.GoogleAuthProvider();

//   export {auth,provider};
  export default db;
  