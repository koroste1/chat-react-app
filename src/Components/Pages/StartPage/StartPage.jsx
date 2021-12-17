import React, {useContext, useEffect, useState} from 'react';
import Header from "../../Header/Header";
import Login from "../Login/Login";
import './StartPage.scss';
import {AuthContext} from "../../Context/Context";
import {setNewUserInDatabase} from "../../../Reducer/AppReducer";
import {getAuth} from "firebase/auth";

const StartPage = ({children, ...props}) => {
    const {auth, isAuth, firestore} = useContext(AuthContext);
    useEffect(()=>
        isAuth && setNewUserInDatabase(firestore,auth))

    return (
        <div className='start-page'>
            <h1>
                chat react app
            </h1>

        </div>

    );
};

export default StartPage;