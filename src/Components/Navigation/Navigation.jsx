import React, {useState} from 'react';
import {Link} from "react-router-dom";
import './Navigation.scss';
import logo from "../../assets/logo.png";

const Navigation = () => {
    const linkList = [
        {name: 'Friends',},
        {name: 'Messages',},
        {name: 'Profile',}
    ];
    const [active, setActive] = useState(false);
    const toggleActive = () => {
        setActive(!active);
    }
    return (
        <nav className={'nav'}>
            <div onClick={toggleActive} className={`icon-menu ${active ? 'active' : ''}`}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            {/*{active && <Link to='/'><img src={logo} alt="logo" className='header__logo' width={'56px'}/></Link>}*/}
            <ul className={`nav__list ${active ? 'active' : ''}`}>
                {
                    linkList.map(item =>
                        <li key={item.name} className={'nav__item'}>
                            <Link onClick={toggleActive} to={`/${item.name}`}>{item.name}</Link>
                        </li>
                    )
                }
            </ul>
        </nav>
    );
};

export default Navigation;
