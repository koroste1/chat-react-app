import React, {useContext, useState} from 'react';
import classes from './Messages.module.scss';
import Friends from "../../Friends/Friends";
import {getAuth} from "firebase/auth";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import {AuthContext} from "../../Context/Context";
import {collection, setDoc, doc, addDoc, getDocs, getDoc} from "firebase/firestore";


const Messages = ({title}) => {
    const [message, setMessage] = useState();
    const {firestore, auth} = useContext(AuthContext);

    const sendMessage = async (e) => {
        e.preventDefault();
        console.log(message);
        setMessage('');
    }
    return (
        <div className={classes.messages}>
            {/*<Friends/>*/}
            <h2 className={classes['messages__title']}>Привет</h2>
            <div className={classes['messages__all-messages']}>

            </div>
            <form action="" className={classes['messages__form']} onSubmit={sendMessage}>
                <Input type={'text'} value={message} onChange={e => setMessage(e.target.value)}/>
                <Button type={'submit'}>Send</Button>
            </form>
        </div>
    );
};

export default Messages;