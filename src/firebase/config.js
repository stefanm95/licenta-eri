import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAyNwdxz6HcjSfD4ma4aWtUVYzte3cj3Tc",
  authDomain: "licenta-ali-emre.firebaseapp.com",
  projectId: "licenta-ali-emre",
  storageBucket: "licenta-ali-emre.appspot.com",
  messagingSenderId: "546620899748",
  appId: "1:546620899748:web:eac80dc40532e80b8c8131",
  measurementId: "G-JYWHGN5Y4T"
};



// init firebase
firebase.initializeApp(firebaseConfig)


const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()

// timestamp
const timestamp = firebase.firestore.Timestamp

export { projectFirestore, projectAuth, timestamp }