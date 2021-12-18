import React, {useContext, useEffect} from 'react';
import './StartPage.scss';
import {AuthContext} from "../../Context/Context";
import {setNewUserInDatabase} from "../../../Reducer/AppReducer";

const StartPage = ({children, ...props}) => {
    const {auth, isAuth, firestore} = useContext(AuthContext);

    useEffect(()=>
        isAuth && setNewUserInDatabase(firestore,auth)
    ,[])

    return (
        <div className='start-page'>
            <h1>
                chat react app
            </h1>
        </div>
    );
};

export default StartPage;
