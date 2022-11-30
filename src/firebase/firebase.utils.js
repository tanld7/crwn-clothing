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

firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
    // prompt: 'select-account'
    'login_hint': 'user@example.com'

})
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase;
