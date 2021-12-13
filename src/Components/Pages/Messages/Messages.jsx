import React from 'react';
import classes from './Messages.module.scss';
import Friends from "../../Friends/Friends";

const Messages = ({title}) => {
    return (
        <div className={classes.messages}>
            <Friends/>
            <h2 className={classes['messages__title']}>Привет</h2>
        </div>
    );
};

export default Messages;