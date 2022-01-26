import firebase from "firebase/compat";
import {initializeApp} from "firebase/app";

let firebaseConfig = {
    apiKey: "AIzaSyBU7JZ4tHYcFI8Ou9XeBgRseBMFUP_ytZU",
    authDomain: "chat-react-app-83b51.firebaseapp.com",
    projectId: "chat-react-app-83b51",
    storageBucket: "chat-react-app-83b51.appspot.com",
    messagingSenderId: "259824838842",
    appId: "1:259824838842:web:a93e7bfe9f2b694703ba83",
    measurementId: "G-RHR02L0EHH"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);


export default firebase;