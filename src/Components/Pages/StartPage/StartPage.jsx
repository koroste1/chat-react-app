import React from 'react';
import classes from './StartPage.module.scss';
import icon from '../../../assets/logo.png';
import mainImage from '../../../assets/mainImage.png';
import afterImage from '../../../assets/afterImage.png';

const StartPage = ({children, ...props}) => {
    const user = {
        uid: localStorage.getItem('uid'),
        email: localStorage.getItem('email'),
        displayName: localStorage.getItem('displayName'),
        avatar: localStorage.getItem('avatar'),
    }
    console.log(user);
    return (
        <div className={classes.startPage}>
            <div className={classes.startPage__main}>
                <img src={icon} alt="icon" className={classes.startPage__icon}/>
                <h1 className={classes.startPage__title}>
                    Messenger
                </h1>
                <h2 className={classes.startPage__subtitle}>30 screens</h2>
            </div>
            <div className={classes.startPage__imageBlock}>
                <img src={mainImage} alt="mainImage" className={classes.startPage__mainImage}/>
                <img src={afterImage} alt="" className={classes.startPage__afterImage}/>
            </div>
        </div>
    );
};

export default StartPage;
