import React, {useContext} from 'react';
import classes from './FriendList.module.scss';
import {collection, doc, deleteDoc} from "firebase/firestore";
import {AuthContext} from "../Context/Context";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {Link} from "react-router-dom";

const FriendList = ({id, ...props}) => {
    const {firestore, auth} = useContext(AuthContext);
    const friendListRef = collection(firestore, 'users', `${auth.currentUser.displayName}`, 'friendList');
    const [value] = useCollectionData(friendListRef);
    const removeFriend = async (value) => {
        await deleteDoc(doc(friendListRef, value));
    }
    return (
        <div className={classes['friend-list']}>
            {value && value.map((item) =>
                <div key={item.uid} className={classes['friend-list__item']}>
                    <Link to={`/messages/${item.uid}`}>
                        <h3 className={classes['friend-list__title']}>{item.displayName}</h3>
                        <p className={classes['friend-list__email']}>{item.email}</p>
                    </Link>
                    <button className={classes['friend-list__delete']}
                            onClick={() => removeFriend(item.displayName)}>Remove
                    </button>
                </div>
            )}
        </div>
    );
};

export default FriendList;