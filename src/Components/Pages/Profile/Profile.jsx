import React, {useContext} from 'react';
import {getAuth} from "firebase/auth";
import classes from './Profile.module.scss';
import Button from "../../UI/Button/Button";
import {AuthContext} from "../../Context/Context";
const Profile = () => {
    const {auth} = useContext(AuthContext);
    const user = auth.currentUser;
    console.log('Current user', user);
    return (
        <div className={classes.profile}>
            <img src={user.photoURL} alt="photo"/>
            <h2>{user.displayName}</h2>
            <h3>{user.email}</h3>
        </div>
    );
};

export default Profile;