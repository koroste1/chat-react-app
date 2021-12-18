import React, {useState} from 'react';
import {Link} from "react-router-dom";
import classes from './Navigation.module.scss';
import logo from "../../assets/logo.png";

const Navigation = () => {
    const linkList = ['Friends', 'Messages', 'Profile'];
    const [active, setActive] = useState(false);
    const toggleActive = () => {
        setActive(!active);
    }
    return (
        <nav className={classes.nav}>
            <div onClick={toggleActive} className={`${classes['icon-menu']} ${active ? classes['active'] : ''}`}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            {/*{active && <Link to='/'><img src={logo} alt="logo" className='header__logo' width={'56px'}/></Link>}*/}
            <ul className={`${classes['nav__list']} ${active ? classes['active'] : ''}`}>
                {
                    linkList.map(item =>
                        <li className={classes['nav__item']}>
                            <Link onClick={toggleActive} to={`/${item}`}>{item}</Link>
                        </li>
                    )
                }
            </ul>
        </nav>
    );
};

export default Navigation;
