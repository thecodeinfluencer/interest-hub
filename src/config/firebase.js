import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCRmNEkLF4wvO-N4_KBzW1py1p0z4Az5x0',
  authDomain: 'interest-hub.firebaseapp.com',
  projectId: 'interest-hub',
  storageBucket: 'interest-hub.appspot.com',
  messagingSenderId: '999733536711',
  appId: '1:999733536711:web:8934106138dc7b1b2f5be2',
  measurementId: 'G-XWYNENMHJS',
};

firebase.initializeApp(firebaseConfig);

//Firebase Firestore Persistancefirebase
firebase
  .firestore()
  .enablePersistence()
  .catch(function (err) {
    if (err.code === 'failed-precondition') {
      // Multiple tabs open, persistence can only be enabled
      // in one tab at a a time.
      // ...
      console.log('Multiple tabs open, persistence cannot be enabled');
    } else if (err.code === 'unimplemented') {
      // The current browser does not support all of the
      // features required to enable persistence
      // ...
      console.log('The current browser does not support ');
    }
  });

export default firebase;
