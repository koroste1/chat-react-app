// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBU7JZ4tHYcFI8Ou9XeBgRseBMFUP_ytZU",
    authDomain: "chat-react-app-83b51.firebaseapp.com",
    projectId: "chat-react-app-83b51",
    storageBucket: "chat-react-app-83b51.appspot.com",
    messagingSenderId: "259824838842",
    appId: "1:259824838842:web:a93e7bfe9f2b694703ba83",
    measurementId: "${config.measurementId}"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);