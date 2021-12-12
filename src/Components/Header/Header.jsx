import React, {useContext} from 'react';
import Button from "../UI/Button/Button";
import {AuthContext} from "../Context/Context";
import './Header.scss';
import logo from '../../logo.png';
import {Link, useHistory} from "react-router-dom";

const Header = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext);
    const history = useHistory();
    const loginLogout = () => {
        if (isAuth) {
            setIsAuth(false)
        } else {
            history.push('/login')
        }
    }
    return (
        <header className='header'>
            <Link to='/'><img src={logo} alt="logo" className='header__logo' width={'56px'}/></Link>
            <nav className='header__nav nav'>
                <ul className="nav__list">
                    <li className='nav__item'><Link to="/">Download</Link></li>
                    <li className='nav__item'><Link to="/messages">News</Link></li>
                    <li className="nav__item"><Link to="/profile">Information</Link></li>
                </ul>
            </nav>
            <Button onClick={loginLogout}>{isAuth ? 'Logout' : 'Login'}</Button>

        </header>
    );
};

export default Header;