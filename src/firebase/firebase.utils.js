import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
	apiKey: "AIzaSyClCid7_QImIvbatjzfb34ArNIQSLc7PEE",
    authDomain: "crwn-db-701f2.firebaseapp.com",
    databaseURL: "https://crwn-db-701f2.firebaseio.com",
    projectId: "crwn-db-701f2",
    storageBucket: "crwn-db-701f2.appspot.com",
    messagingSenderId: "275257122596",
    appId: "1:275257122596:web:82f1e855fecb6cff6bddb1",
    measurementId: "G-Z0CK6J7RZD"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;