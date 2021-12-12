import React from 'react';
import Header from "../../Header/Header";
import Login from "../Login/Login";
import './StartPage.scss';

const StartPage = ({children, ...props}) => {
    return (
        <div className='start-page'>
            <Header/>
            {/*<Login/>*/}
        </div>

    );
};

export default StartPage;