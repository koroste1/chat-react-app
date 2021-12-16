import React from 'react';
import classes from './FriendItem.module.scss';
import {Link} from "react-router-dom";

const FriendItem = ({children, id, ...props}) => {
    return (
        <Link to={'/'}>
        <div className={classes.friend}>
            {children}
        </div>
        </Link>
    );
};

export default FriendItem;