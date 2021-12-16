import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import {initializeApp} from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
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
export const firestore = getFirestore();


ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
