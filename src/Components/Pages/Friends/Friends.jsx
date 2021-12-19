import React, {useContext, useState} from 'react';
import classes from "./Friends.module.scss";
import {getAuth} from "firebase/auth";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import {AuthContext} from "../../Context/Context";
import {collection, doc, setDoc} from "firebase/firestore";
import {useCollectionData} from "react-firebase-hooks/firestore";
import FriendItem from "../../FriendItem/FriendItem";
import FriendList from "../../FriendList/FriendList";

const Friends = () => {
    const [value, setValue] = useState('');
    const {firestore, auth} = useContext(AuthContext);
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

    const addToFriendList = async (e) => {
        e.preventDefault();
        console.log(auth.currentUser.uid, isFind.displayName);
        await setDoc(doc(firestore,'users',`${auth.currentUser.displayName}`, 'friendList', `${isFind.displayName}`),
            isFind);
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
                <button type={'button'} onClick={addToFriendList}>Add to Friend List</button>
            </FriendItem>)}
            <FriendList/>
        </aside>
    );
};

export default Friends;