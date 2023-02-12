import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';
import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from '@firebase/auth';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore();
export const auth = getAuth(app);

const google_provider = new GoogleAuthProvider();
const github_provider = new GithubAuthProvider();

export const signInWithGoogle = setIsLoading => {
    setIsLoading(true);
    signInWithPopup(auth, google_provider)
        .then(result => {
            // eslint-disable-next-line
            console.log(result);

            const name = result.user.displayName;
            const email = result.user.email;
            const profile_img = result.user.photoURL;

            localStorage.setItem('name', name);
            localStorage.setItem('email', email);
            localStorage.setItem('profile_img', profile_img);
        })
        .catch(error => {
            // eslint-disable-next-line
            console.log(error);
        })
        .finally(() => {
            setIsLoading(false);
        });
};

export const signInWithGithub = setIsLoading => {
    setIsLoading(true);
    signInWithPopup(auth, github_provider)
        .then(result => {
            // eslint-disable-next-line
            console.log(result);

            const name = result.user.displayName;
            const email = result.user.email;
            const profile_img = result.user.photoURL;

            localStorage.setItem('name', name);
            localStorage.setItem('email', email);
            localStorage.setItem('profile_img', profile_img);
        })
        .catch(error => {
            // eslint-disable-next-line
            console.log(error);
        })
        .finally(() => {
            setIsLoading(false);
        });
};
