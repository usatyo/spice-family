import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyANBVeCVIfwP6MEW9ClkBpa78_AySmR0vY",
    authDomain: "spice-test-project-d3472.firebaseapp.com",
    projectId: "spice-test-project-d3472",
    storageBucket: "spice-test-project-d3472.appspot.com",
    messagingSenderId: "890569156104",
    appId: "1:890569156104:web:5388ac9294795e9924d3bd"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const user = auth.currentUser;

export { auth, user };
