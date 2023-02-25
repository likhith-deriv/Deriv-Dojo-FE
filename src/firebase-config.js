import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';
import {
    getAuth,
    GithubAuthProvider,
    GoogleAuthProvider,
    signInWithPopup,
    fetchSignInMethodsForEmail,
} from '@firebase/auth';
import { error_code } from 'constants/error-codes';
import { setUserInfo } from 'utils/helper';

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

const supported_signin_methods = [GoogleAuthProvider.PROVIDER_ID, GithubAuthProvider.PROVIDER_ID];

const getProvider = provider => {
    switch (provider) {
        case 'google.com':
            return google_provider;
        case 'github.com':
            return github_provider;
        default:
            throw new Error({
                message: `No provider implemented for ${provider}`,
                code: error_code.NO_PROVIDER_IMPLEMENTED,
            });
    }
};

export const signInWithProvider = async (provider, setIsLoading) => {
    setIsLoading(true);
    try {
        const selected_provider = getProvider(provider);
        const result = await signInWithPopup(auth, selected_provider);
        setUserInfo(result.user);
    } catch (error) {
        if (error.code === error_code.DIFFERENT_CREDENTIALS) {
            const providers = await fetchSignInMethodsForEmail(auth, error.customData.email);
            const firstPopupProviderMethod = providers.find(p => supported_signin_methods.includes(p));
            if (firstPopupProviderMethod) {
                await signInWithProvider(firstPopupProviderMethod, setIsLoading);
            }
        } else if (error.code === error_code.POPUP_BLOCKED) {
            // eslint-disable-next-line no-console
            console.log('Popup blocked by browser');
        } else {
            // eslint-disable-next-line no-console
            console.log('error: ', { ...error });
        }
    } finally {
        setIsLoading(false);
    }
};
