import React, {useContext, useState} from 'react';
import Header from "../../Header/Header";
import Login from "../Login/Login";
import './StartPage.scss';

const StartPage = ({children, ...props}) => {
    return (
        <div className='start-page'>
            <h1>
                Chat app on React
            </h1>

        </div>

    );
};

export default StartPage;