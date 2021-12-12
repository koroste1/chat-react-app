import React, {useContext} from 'react';
import Button from "../UI/Button/Button";
import {AuthContext} from "../Context/Context";
import './Header.scss';
import logo from '../../logo.png';
import {Link, useHistory} from "react-router-dom";
import {getAuth, signOut} from "firebase/auth";

const Header = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext);
    const auth = getAuth();

    const history = useHistory();
    const loginLogout = () => {
        if (isAuth) {
            signOut(auth).then(() => {
                // Sign-out successful.
            }).catch((error) => {
                // An error happened.
            });
            setIsAuth(false)
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
                    <nav className='header__nav nav'>
                        <ul className="nav__list">
                            <li className='nav__item'><Link to="/">Download</Link></li>
                            <li className='nav__item'><Link to="/messages">Messages</Link></li>
                            <li className="nav__item"><Link to="/profile">Profile</Link></li>
                        </ul>
                    </nav>
                    :
                    <h2>Login</h2>
            }
            <Button onClick={loginLogout}>{isAuth ? 'Logout' : 'Login'}</Button>

        </header>
    );
};

export default Header;