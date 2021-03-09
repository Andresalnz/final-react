//import app from 'firebase/app'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'


  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDbsn1JH1RicOEfL3A-_JDLoqoMWYnoOOo",
    authDomain: "crrud-firebase.firebaseapp.com",
    projectId: "crrud-firebase",
    storageBucket: "crrud-firebase.appspot.com",
    messagingSenderId: "987290128144",
    appId: "1:987290128144:web:8c9a81ffb609fb738d9f95"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  //export {firebase}


  const db = firebase.firestore()
  const auth = firebase.auth()

  export {db,auth}