import React, {useContext, useEffect, useState} from 'react';
import classes from './Messages.module.scss';
import Friends from "../../Friends/Friends";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import {AuthContext} from "../../Context/Context";
import {collection, doc, orderBy, query, setDoc} from "firebase/firestore";
import {useCollectionData} from "react-firebase-hooks/firestore";
import firebase from "firebase/compat";
import {useParams} from "react-router-dom";
import {windowSize} from "../../../Reducer/AppReducer";

const Messages = ({children, ...props}) => {
    const {id} = useParams();
    const [width, setWidth] = useState();
    const [message, setMessage] = useState('');
    const {firestore, auth} = useContext(AuthContext);
    const messageRefFrom = collection(firestore, `${auth.currentUser.uid}-${id}`);
    const messageRefTo = collection(firestore, `${id}-${auth.currentUser.uid}`);
    const qFrom = query(messageRefFrom, orderBy('createdAt', 'asc'))
    const [value, loading] = useCollectionData(qFrom);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!message) return;
        await setDoc(doc(messageRefFrom), {
            uid: auth.currentUser.uid,
            displayName: auth.currentUser.displayName,
            avatar: auth.currentUser.photoURL,
            text: message,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
        await setDoc(doc(messageRefTo), {
            uid: auth.currentUser.uid,
            displayName: auth.currentUser.displayName,
            avatar: auth.currentUser.photoURL,
            text: message,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
        setMessage('');
    }
    useEffect(()=>windowSize(setWidth),[window]);
    return (
        <div className={classes.messages}>
            {width > 768 && <Friends/>}
            <div className={classes['messages__chat']}>
                <div className={classes['messages__all-messages']}>
                    {/*{error && <strong>Error: {JSON.stringify(error)}</strong>}*/}
                    {loading && <span>Collection: Loading...</span>}
                    {value &&
                        // <div>
                            value.map(item =>
                                <div key={item.createdAt}
                                     className={auth.currentUser.uid == item.uid ? classes['messages__my'] : classes['messages__other']}>
                                    <h3>{item.displayName}</h3>
                                    <p>{item.text}</p>
                                </div>
                            )
                        // </div>
                    }
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
