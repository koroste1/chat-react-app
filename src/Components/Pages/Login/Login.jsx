import React, {useContext, useState} from 'react';
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import './Login-form.scss';
import {AuthContext} from "../../Context/Context";
import {getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword} from "firebase/auth";
import {useHistory} from "react-router-dom";

const Login = () => {
    const auth = getAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {isAuth, setIsAuth} = useContext(AuthContext);
    const history = useHistory();
    if (isAuth){
        history.push('/');
    }
    const login = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setIsAuth(true);
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }
    const loginWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        auth.languageCode = 'it';
        signInWithPopup(auth, provider).then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            setIsAuth(true);
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
        // console.log(user);
    }
    return (
        <form className={'login-form'} onSubmit={login}>
            <div className="login-form__input">
                <label htmlFor="email" className='login-form__label'>Email</label>
                <Input type='text' placeholder='Email' id='email' value={email}
                       onChange={event => setEmail(event.target.value)}
                       required/>
            </div>
            <div className="login-form__input">
                <label htmlFor="password" className='login-form__label'>Password</label>
                <Input type='password' placeholder='Password' id='password'
                       value={password}
                       onChange={event => setPassword(event.target.value)}
                       required/>
            </div>
            <Button type="submit">Enter</Button>
            <Button onClick={loginWithGoogle}>Login with Google</Button>
        </form>
    );
};

export default Login;