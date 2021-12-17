import React, {useContext, useEffect, useState} from 'react';
import Button from "../UI/Button/Button";
import {AuthContext} from "../Context/Context";
import './Header.scss';
import logo from '../../logo.png';
import {Link, useHistory} from "react-router-dom";
import {getAuth, signOut} from "firebase/auth";
import Navigation from "../Navigation/Navigation";
import {windowSize} from "../../Reducer/AppReducer";

const Header = () => {
    const {isAuth, setIsAuth, auth} = useContext(AuthContext);
    const [width,setWidth] = useState();

    const history = useHistory();
    const loginLogout = () => {
        if (isAuth) {
            signOut(auth).then(() => {
                // Sign-out successful.
            }).catch((error) => {
                // An error happened.
            });
            localStorage.removeItem('isAuth');
            setIsAuth(false);
        } else {
            history.push('/login')
        }
    }
    useEffect(()=>windowSize(setWidth))
    return (
        <header className='header'>
            {width > 768 && <Link to='/'><img src={logo} alt="logo" className='header__logo' width={'56px'}/></Link>}
            {
                isAuth
                    ?
                    <Navigation/>
                    :
                    <h2>Login</h2>
            }
            <Button onClick={loginLogout}>{isAuth ? 'Logout' : 'Login'}</Button>

        </header>
    );
};

export default Header;