import React, {useContext, useEffect} from 'react';
import {AuthContext} from "../Context/Context";
import {collection, orderBy, query, limit} from "firebase/firestore";
import {useCollectionData} from "react-firebase-hooks/firestore";
import classes from './MessageItem.module.scss';
import {findByDisplayValue} from "@testing-library/react";
import {Link} from "react-router-dom";

const MessageItem = ({children, displayName, ...props}) => {
    const {firestore, auth} = useContext(AuthContext);
    const messageItemRef = collection(firestore, 'users', `${auth.currentUser.displayName}`, 'friendList', `${displayName}`, 'messages')
    const lastMessage = query(messageItemRef, orderBy('createdAt', 'desc'), limit(1))
    const [messageItem, loading] = useCollectionData(lastMessage);
    messageItem && messageItem.map(item=>{
        if (item.uid != auth.currentUser.uid){
            const noti = new Notification('hi')
        }
    })
    return (
        <div>{messageItem && messageItem.map(item =>
            <Link key={displayName}
                  to={(auth.currentUser.uid === item.uid) ? `/messages/${displayName}` : `/messages/${item.displayName}`}>
                <div
                    className={`${classes['message-item']} ${(auth.currentUser.uid === item.uid) ? classes['message-item_my'] : classes['message-item_other']}`}>
                    <h3 className={classes['message-item__title']}>{displayName}</h3>
                    <p className={classes['message-item__text']}>{item.text}</p>
                </div>
            </Link>
        )}</div>
    );
};

export default MessageItem;