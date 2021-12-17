import React from 'react';
import classes from './FriendItem.module.scss';
import {Link, useParams} from "react-router-dom";

const FriendItem = ({children, id, ...props}) => {
    return (
        <Link to={`/messages/${id}`}>
            <div className={classes.friend}>
                {children}
            </div>
        </Link>
    );
};

export default FriendItem;