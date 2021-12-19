import React from 'react';
import './StartPage.scss';
import {setNewUserInDatabase} from "../../../Reducer/AppReducer";

const StartPage = ({children, ...props}) => {
    const user = {
        uid: localStorage.getItem('uid'),
        email: localStorage.getItem('email'),
        displayName: localStorage.getItem('displayName'),
        avatar: localStorage.getItem('avatar'),
    }
    console.log(user);
    return (
        <div className='start-page'>
            <h1>
                chat react app
            </h1>
        </div>
    );
};

export default StartPage;
