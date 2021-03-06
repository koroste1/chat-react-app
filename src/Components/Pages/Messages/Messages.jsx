import React, {useContext, useEffect, useState} from 'react';
import classes from './Messages.module.scss';
import Friends from "../Friends/Friends";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import {AuthContext} from "../../Context/Context";
import {collection, doc, orderBy, query, setDoc} from "firebase/firestore";
import {useCollectionData} from "react-firebase-hooks/firestore";
import firebase from "firebase/compat";
import {useParams} from "react-router-dom";
import AllChats from "../../AllChats/AllChats";
import Loader from "../../Loader/Loader";

const Messages = ({children, ...props}) => {
    const {id} = useParams();
    console.log(id);
    const [message, setMessage] = useState('');
    const {firestore, auth} = useContext(AuthContext);

    const messageRefFrom = collection(firestore, 'users', `${auth.currentUser.displayName}`, 'messages', `${id}`, 'text');
    const messageRefTo = collection(firestore, 'users', `${id}`, 'messages', `${auth.currentUser.displayName}`, 'text');
    const qFrom = query(messageRefFrom, orderBy('createdAt', 'asc'))
    const [value, loading] = useCollectionData(qFrom);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!message) return;
        if (id != auth.currentUser.displayName) {
            await setDoc(doc(firestore, 'users', `${auth.currentUser.displayName}`, 'messages', `${id}`),
                {
                    displayName: id,
                });
            await setDoc(doc(firestore, 'users', `${id}`, 'messages', `${auth.currentUser.displayName}`),
                {
                    displayName: auth.currentUser.displayName,
                })

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
        } else {
            await setDoc(doc(firestore, 'users', `${auth.currentUser.displayName}`, 'messages', `${id}`),
                {
                    displayName: id,
                });
            await setDoc(doc(messageRefFrom), {
                uid: auth.currentUser.uid,
                displayName: auth.currentUser.displayName,
                avatar: auth.currentUser.photoURL,
                text: message,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            });
        }
        setMessage('');
    }


    return (
        <div className={classes.messages}>
            <Friends className={classes['messages__friends']}/>
            {!id ? <AllChats/> :
                <div className={classes['messages__chat']}>

                    <div className={classes['messages__all-messages']}>
                        {loading && <Loader/>}
                        {value &&
                        value.map(item =>
                            <div key={item.createdAt}
                                 className={auth.currentUser.uid === item.uid ?
                                     `${classes.messages__message} ${classes.messages__message_my}`
                                     :
                                     `${classes.messages__message} ${classes.messages__message_other}`}>
                                <h3>{item.displayName}</h3>
                                <p>{item.text}</p>
                            </div>
                        )}
                    </div>

                    <form action="" className={classes['messages__form']} onSubmit={sendMessage}>
                        <Input type={'text'} value={message} onChange={e => setMessage(e.target.value)}/>
                        <Button type={'submit'}>Send</Button>
                    </form>
                </div>
            }
        </div>
    );
};

export default Messages;
