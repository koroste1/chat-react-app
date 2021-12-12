import React, {useContext} from 'react';
import Button from "../UI/Button/Button";
import {AuthContext} from "../Context/Context";
import './Header.scss';
import {Link} from "react-router-dom";

const Header = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext);
    return (
        <header className='header'>
            <Link to='/'><img src='../../logo.png' alt="logo" className='header__logo'/></Link>
            <nav className='header__nav nav'>
                <ul className="nav__list">
                    <li className='nav__item'><Link to="/">Download</Link></li>
                    <li className='nav__item'><Link to="/messages">News</Link></li>
                    <li className="nav__item"><Link to="/profile">Information</Link></li>
                </ul>
            </nav>
            {
                isAuth ?
                    <div className="header__login-block">
                        <Link to='/login'><Button>Login</Button></Link>
                    </div> :
                    <div className="header__login-block">
                        <Link to='/'><Button>Logout</Button></Link>
                    </div>
            }


        </header>
    );
};

export default Header;