import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const config = {
    apiKey: "AIzaSyCu3EWINejeqggXwd6nmzlNmF3vXUrTFSE",
    authDomain: "crwn-db-e6b63.firebaseapp.com",
    projectId: "crwn-db-e6b63",
    storageBucket: "crwn-db-e6b63.appspot.com",
    messagingSenderId: "952073022037",
    appId: "1:952073022037:web:3e27038a5be94a3b5b02dc",
    measurementId: "G-PQF9N0WJ9J"
};


export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user ', error.message)
        }
    }

    return userRef;

}


firebase.initializeApp(config)

export const auth = firebase.auth();
export const firestore = firebase.firestore();

/** Setup Google Auth Utility */
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
