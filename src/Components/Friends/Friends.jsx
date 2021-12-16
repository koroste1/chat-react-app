import React, {useContext, useState} from 'react';
import classes from "./Friends.module.scss";
import {getAuth} from "firebase/auth";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import {AuthContext} from "../Context/Context";
import {collection} from "firebase/firestore";
import {useCollectionData} from "react-firebase-hooks/firestore";
import FriendItem from "../FriendItem/FriendItem";

const Friends = () => {
    const [value, setValue] = useState('');
    const {firestore} = useContext(AuthContext);
    const friendsRef = collection(firestore, 'users');
    const [friendList] = useCollectionData(friendsRef);
    const [isFind, setIsFind] = useState();

    const findFriends = (e) => {
        // e.preventDefault();
        setValue(e.target.value);
        value.length ?
            setIsFind(friendList.find(item => item.displayName.toLowerCase().includes(value.toLowerCase())))
        :
        setIsFind(null);
    }
    return (

        <aside className={classes.friends}>
            <h2 className={classes['friends__title']}>Friends</h2>
            {/*<form action="" onSubmit={}>*/}
            <Input type={'text'} value={value}
                   onChange={findFriends}/>
            {/*<Button type={'submit'}>Find</Button>*/}
            {/*</form>*/}
            {isFind && (<FriendItem id={isFind.uid}>
                <h3>{isFind.displayName}</h3>
                <p>{isFind.email}</p>
            </FriendItem>)}
        </aside>
    );
};

export default Friends;