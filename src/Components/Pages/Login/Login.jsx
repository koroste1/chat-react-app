import React, {useContext, useState} from 'react';
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import './Login-form.scss';
import {AuthContext} from "../../Context/Context";
import {GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup} from "firebase/auth";
import {Link, useHistory} from "react-router-dom";
import {setNewUserInDatabase, validateEmailForm, validatePasswordForm} from "../../../Reducer/AppReducer";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passError, setPassError] = useState('');
    const {isAuth, setIsAuth, auth, firestore} = useContext(AuthContext);
    const history = useHistory();

    if (isAuth) {
        history.push('/');
    }

    const login = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                localStorage.setItem('isAuth', 'true')
                setIsAuth(true);
                console.log(user);

            })
            .catch((error) => {
                //const errorCode = error.code;
                const errorMessage = error.message;
                validateEmailForm(email, setEmailError);
                validatePasswordForm(password, setPassError);

            });

    }

    async function loginWithGoogle() {
        console.log("loginWithGoogle")

        try {
            const provider = new GoogleAuthProvider();
            auth.languageCode = 'it';
            const result = await signInWithPopup(auth, provider)
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = await GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            localStorage.setItem('isAuth', 'true')
            setIsAuth(true);
            const res = await setNewUserInDatabase(firestore, auth);
            console.log("res", res)
        } catch (error) {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        }
    }

    return (
        <div className='login-page'>
            <form action={''} className='login-page__login-form login-form' onSubmit={login}>
                <div className="login-form__input">
                    <label htmlFor="email" className='login-form__label'>Email</label>
                    <Input type='text' placeholder='Email' id='email' value={email}
                           onChange={event => setEmail(event.target.value)}
                    />
                    <span className='error'>{emailError}</span>
                </div>
                <div className="login-form__input">
                    <label htmlFor="password" className='login-form__label'>Password</label>
                    <Input type='password' placeholder='Password' id='password'
                           value={password}
                           onChange={event => setPassword(event.target.value)}
                    />
                    <span className='error'>{passError}</span>
                </div>

                <Button type="submit">Enter</Button>
                <Button type='button' onClick={loginWithGoogle}>Login with Google</Button>
                <Link to={'/register'}><Button>Register</Button></Link>
            </form>

        </div>
    );
};

export default Login;
