import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
    apiKey: "AIzaSyCwiQTRYFZrBq9SxrvftZ88u-LuQSfud_c",
    authDomain: "todolist-d8d23.firebaseapp.com",
    projectId: "todolist-d8d23",
    storageBucket: "todolist-d8d23.appspot.com",
    messagingSenderId: "829460945110",
    appId: "1:829460945110:web:f1026bd8e625cab7521177",
    measurementId: "G-Q8JE399M3C"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;