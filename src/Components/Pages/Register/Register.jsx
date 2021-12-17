import React, {useContext, useState} from 'react';
import classes from './Register.module.scss';
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import {getAuth, createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import {AuthContext} from "../../Context/Context";
import {useHistory} from "react-router-dom";
import {setNewUserInDatabase, validateEmail} from "../../../Reducer/AppReducer";
import {doc, setDoc} from "firebase/firestore";

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [photoURL, setPhotoURL] = useState('');
    const {isAuth, setIsAuth, firestore, auth, setAuth} = useContext(AuthContext);
    const [emailError, setEmailError] = useState('');
    const [passError, setPassError] = useState('');
    const [repeatPassError, setRepeatPassError] = useState('');
    const history = useHistory();
    if (isAuth) {
        history.push('/');
    }


    const validateEmailForm = () => {
        if (!validateEmail(email)) {
            setEmailError('Invalid email address');
        } else {
            return true;
        }
    }
    const validatePassword = () => {
        if (password.length < 8) {
            setPassError('Password is too short');
        } else if (password !== repeatPassword) {
            setRepeatPassError('Password mismatch');
        } else {
            return true;
        }
    }

    // const setNewUserInDatabase = async (firestore, auth) => {
    //     await setDoc(doc(firestore, 'users', auth.currentUser.displayName), {
    //         uid: auth.currentUser.uid,
    //         displayName: auth.currentUser.displayName,
    //         email: auth.currentUser.email,
    //         avatar: '',
    //     })
    // }
    const register = (e) => {
        e.preventDefault();
        if (validateEmailForm() && validatePassword()) {
            createUserWithEmailAndPassword(auth, email, password)
                .then(async (userCredential) => {
                    const user = userCredential.user;
                    updateProfile(auth.currentUser, {
                        displayName: displayName
                    }).then();
                    setAuth(getAuth());
                    localStorage.setItem('isAuth', 'true');
                    setIsAuth(true);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                });
        }
    }


    return (
        <div>
            <form action="" onSubmit={register}>
                <div>
                    <label htmlFor="regEmail" className='login-form__label'>Email</label>
                    <Input type='text' placeholder='Email' id='regEmail' value={email}
                           onChange={event => setEmail(event.target.value)}
                           required
                    />
                    <span>{emailError}</span>
                </div>
                <div>
                    <label htmlFor="regPass" className='login-form__label'>Password</label>
                    <Input type='password' placeholder='password' id='regPass' value={password}
                           onChange={event => setPassword(event.target.value)}
                           required
                    />
                    <span>{passError}</span>

                </div>
                <div>
                    <label htmlFor="repeatRegPass" className='login-form__label'>Repeat password</label>
                    <Input type='password' placeholder='password' id='repeatRegPass' value={repeatPassword}
                           onChange={event => setRepeatPassword(event.target.value)} required
                    />
                    <span>{repeatPassError}</span>
                </div>
                <div>
                    <label htmlFor="displayName" className='login-form__label'>Name</label>
                    <Input type='text' placeholder='Name' id='displayName' value={displayName}
                           onChange={event => setDisplayName(event.target.value)} required
                    />
                </div>
                <Button type={'submit'}>Register</Button>
            </form>
        </div>
    );
};

export default Register;