import React, {useContext} from 'react';
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import './Login-form.scss';
import {AuthContext} from "../../Context/Context";

const Login = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext);
    return (
            <form className={'login-form'}>
                <div className="login-form__input">
                    <label htmlFor="email" className='login-form__label'>Email</label>
                    <Input type='text' placeholder='Email' id='email' required/>
                </div>
                <div className="login-form__input">
                    <label htmlFor="password" className='login-form__label'>Password</label>
                    <Input type='password' placeholder='Password' id='password' required/>
                </div>
                <Button>Enter</Button>
            </form>
    );
};

export default Login;