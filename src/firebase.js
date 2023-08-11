import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCzRroQI1WmzeLFhCT50AsnBhYvDV9VolA",
    authDomain: "migracionesdev.firebaseapp.com",
    databaseURL: "https://migracionesdev-default-rtdb.firebaseio.com",
    projectId: "migracionesdev",
    storageBucket: "migracionesdev.appspot.com",
    messagingSenderId: "204910648747",
    appId: "1:204910648747:web:31c7865fe92001ff9bc6ee",
    measurementId: "G-W8C6NMPYXV"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
