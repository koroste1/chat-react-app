import React, {useContext, useEffect, useState} from 'react';
import {collection} from "firebase/firestore";
import {AuthContext} from "../Context/Context";
import {useCollectionData} from "react-firebase-hooks/firestore";
import MessageItem from "../MessageItem/MessageItem";
import Loader from "../Loader/Loader";
import classes from './AllChats.module.scss';

const AllChats = ({...props}) => {
    const {auth, firestore} = useContext(AuthContext);
    const allMessagesRef = collection(firestore, 'users', `${auth.currentUser.displayName}`, 'friendList');
    const [value, loading] = useCollectionData(allMessagesRef);
    const [messageItem, setMessageItem] = useState([]);
    const getAllChats = () => {
        // value && value.map(item => console.log(item.displayName));
        value && setMessageItem(value.map(item => item.displayName));
    }
    useEffect(() => {
        getAllChats();
    }, [value]);
    //useEffect(() => console.log(messageItem.map(item => item)), [messageItem]);
    //messageItem.length && messageItem.map(item=>console.log(item))
    return (
        <div className={classes['all-chats']}>
            {loading && <Loader/>}
            {messageItem.length &&
                messageItem.map(item => <MessageItem displayName={item}/>)}
        </div>
    );
};

export default AllChats;