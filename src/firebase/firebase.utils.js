import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
    apiKey: "AIzaSyBJ20pfRJOC1JVecZIfEToJBNVyiCe5d8w",
    authDomain: "crwn-db-1b157.firebaseapp.com",
    projectId: "crwn-db-1b157",
    storageBucket: "crwn-db-1b157.appspot.com",
    messagingSenderId: "397680262165",
    appId: "1:397680262165:web:06085378a0a107d5d4621c",
    measurementId: "G-LKNKJFDS3J"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const UserRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await UserRef.get();
    console.log(snapShot);

    if(!snapShot.exists){
      const {displayName, email} = userAuth;
      const createdAt = new Date();

      try{
        await UserRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      }catch(error){
        console.log('error creating user',error.message);
      }
    }
    return UserRef;
  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt:'select_account'});

  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;