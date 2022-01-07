import React from 'react';
import classes from './FriendItem.module.scss';
import {Link} from "react-router-dom";

const FriendItem = ({isFind, children, ...props}) => {
    const {displayName, email} = isFind;
    const id = displayName;


    return (
        <Link to={`/messages/${id}`} className={classes.friend}>
                <h3>${displayName}</h3>
                <p>${email}</p>
                {children}
        </Link>
    );
};

export default FriendItem;