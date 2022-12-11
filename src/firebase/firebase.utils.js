// TODO: Update to version 9 modular
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC1VcBMjIuS8dhbqEUnsjJ0SQU0jW7bsXc",
    authDomain: "crown-db-99486.firebaseapp.com",
    projectId: "crown-db-99486",
    storageBucket: "crown-db-99486.appspot.com",
    messagingSenderId: "293171602270",
    appId: "1:293171602270:web:275419b5070cbbab7fe5cf",
    measurementId: "G-8XCRX70NTE"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`)
    const snapShot = await userRef.get();

    // console.log('===userAuth:\n')
    // console.log(userAuth)
    // console.log('===userRef:\n')
    // console.log(userRef)
    // console.log('===snapShot:')
    // console.log(snapShot)

    // If there's no document in our db (firebase firestore),
    // we will create a new document (or object) in our db.
    if (!snapShot.exists) {
        const {displayName, email} = userAuth;
        const createdAt = new Date()

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message)
        }
    }

    return userRef;
}

firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
googleAuthProvider.setCustomParameters({
    'login_hint': 'user@example.com'

})

export const signInWithGoogle = () => auth.signInWithPopup(googleAuthProvider)

export default firebase;
