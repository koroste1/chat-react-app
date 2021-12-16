import React, {useState} from 'react';
import classes from "./Friends.module.scss";
import {getAuth} from "firebase/auth";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";

const Friends = () => {
    const [value, setValue] = useState('');
    return (

        <aside className={classes.friends}>
            <h2 className={classes['friends__title']}>Friends</h2>
            <Input type={'text'} value={value}
                   onChange={(e) => setValue(e.target.value)}/>
            <Button type={'submit'}>Find</Button>
        </aside>
    );
};

export default Friends;