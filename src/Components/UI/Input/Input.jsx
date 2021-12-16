import React from 'react';
import classes from "./Input.module.scss";

const Input = ({onChange, ...props}) => {
    return (
        <input className={classes.input} onChange={onChange} {...props}/>
    );
};

export default Input;