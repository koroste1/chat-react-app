import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {firebaseConfig} from "./firebaseConfig";

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
export const firestore = getFirestore();


ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById('root')
);
