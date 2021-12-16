import React, {useContext, useEffect, useState} from 'react';
import classes from './Messages.module.scss';
import Friends from "../../Friends/Friends";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import {AuthContext} from "../../Context/Context";
import {collection, setDoc, doc, getDocs, orderBy, query, limit} from "firebase/firestore";
import {useCollection, useCollectionData} from "react-firebase-hooks/firestore";
import firebase from "firebase/compat";

const Messages = ({children, ...props}) => {
    const [message, setMessage] = useState();
    const {firestore, auth} = useContext(AuthContext);
    const messageRef = collection(firestore, 'messages');
    const q = query(messageRef, orderBy('createdAt', 'asc'))
    const [value, loading, error] = useCollectionData(q);
    const sendMessage = async (e) => {
        e.preventDefault();
        if (!message) return;
        await setDoc(doc(messageRef), {
            uid: auth.currentUser.uid,
            displayName: auth.currentUser.displayName,
            avatar: auth.currentUser.photoURL,
            text: message,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
        setMessage('');
    }
    return (
        <div className={classes.messages}>
            <Friends/>
            <div className={classes['messages__chat']}>
                <div className={classes['messages__all-messages']}>
                    {error && <strong>Error: {JSON.stringify(error)}</strong>}
                    {loading && <span>Collection: Loading...</span>}
                    {value && (
                        <div>
                            {value.map(item =>
                                <div
                                     className={auth.currentUser.uid == item.uid ? classes['messages__my'] : classes['messages__other']}>
                                    <h3>{item.displayName}</h3>
                                    <p>{item.text}</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <form action="" className={classes['messages__form']} onSubmit={sendMessage}>
                    <Input type={'text'} value={message} onChange={e => setMessage(e.target.value)}/>
                    <Button type={'submit'}>Send</Button>
                </form>
            </div>
        </div>
    );
};

export default Messages;