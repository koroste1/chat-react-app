import React, {useContext, useEffect, useState} from 'react';
import Header from "../../Header/Header";
import Login from "../Login/Login";
import './StartPage.scss';
import {AuthContext} from "../../Context/Context";

const StartPage = ({children, ...props}) => {
    const {auth} = useContext(AuthContext);
    useEffect(()=>console.log(auth.currentUser),[]);
    return (
        <div className='start-page'>
            <h1>
                Chat app on React
            </h1>

        </div>

    );
};

export default StartPage;