import React, {useContext, useEffect, useState} from 'react';
import Button from "../UI/Button/Button";
import {AuthContext} from "../Context/Context";
import './Header.scss';
import logo from '../../assets/logo.png';
import {Link, useHistory} from "react-router-dom";
import {signOut} from "firebase/auth";
import Navigation from "../Navigation/Navigation";
import {removeUserFromLocalStorage, windowSize} from "../../Reducer/AppReducer";

const Header = () => {
    const {isAuth, setIsAuth, auth} = useContext(AuthContext);

    const history = useHistory();
    const loginLogout = () => {
        if (isAuth) {
            signOut(auth).then(() => {
            }).catch((error) => {
            });
            removeUserFromLocalStorage();
            setIsAuth(false);
        } else {
            history.push('/login')
        }
    }
    return (
        <header className='header'>
           <Link to='/'><img src={logo} alt="logo" className='header__logo' width={'56px'}/></Link>
            {
                isAuth
                    ?
                    <Navigation/>
                    :
                    <Link to={'/'}><h2>Login</h2></Link>
            }
            <Button onClick={loginLogout}>{isAuth ? 'Logout' : 'Login'}</Button>

        </header>
    );
};

export default Header;
