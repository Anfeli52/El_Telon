import { getApps, initializeApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getDatabase, type Database } from "firebase/database";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
};

const hasFirebaseConfig = Boolean(
    firebaseConfig.apiKey &&
    firebaseConfig.authDomain &&
    firebaseConfig.projectId &&
    firebaseConfig.appId,
);

let firebaseAuth: Auth | null = null;
let firebaseDatabase: Database | null = null;

if (hasFirebaseConfig) {
    const firebaseApp = getApps().length > 0 ? getApps()[0] : initializeApp(firebaseConfig);
    firebaseAuth = getAuth(firebaseApp);

    if (firebaseConfig.databaseURL) {
        firebaseDatabase = getDatabase(firebaseApp);
    }
}

export const hasRealtimeDatabaseConfig = Boolean(hasFirebaseConfig && firebaseConfig.databaseURL);

export { firebaseAuth, firebaseDatabase, hasFirebaseConfig };
