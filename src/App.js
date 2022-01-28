import React, {useEffect, useState} from "react";
import './App.scss';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./Components/AppRouter/AppRouter";
import {AuthContext} from "./Components/Context/Context";
import Header from "./Components/Header/Header";
import {firestore} from "./index";
import {getAuth} from "firebase/auth";
import {setNewUserInDatabase} from "./Reducer/AppReducer";
import {firebase} from './firebase';
import {getMessaging, getToken} from "firebase/messaging";


function App() {
    const [auth, setAuth] = useState();
    const [isAuth, setIsAuth] = useState(false);
    const [token, setToken] = useState('');
    useEffect(() => {
        const msg = getMessaging();
        if (Notification.permission == 'granted') {
            getToken(msg, {vapidKey: 'BCuVkmBGIqty0i9hnpdKQttRKqJomSSY1ImbHAjOrm7qIGsiHsVH-U3Mqc3o50GKljxgfbE79YaYIh5wEIyl0Eo'})
                .then(currentToken => {
                    setToken(currentToken);
                })
        }

    })
    useEffect(() => {
        setAuth(getAuth());
        if (localStorage.getItem('isAuth')) {
            setIsAuth(true)
        }
    }, [])


    if (!Object.keys(firestore)) {
        return <div>Loading...</div>
    }

    return (
        <AuthContext.Provider value={{
            isAuth,
            setIsAuth,
            firestore,
            auth,
            setAuth,
            token
        }}>
            <BrowserRouter>
                <div className="App">
                    <Header/>
                    <AppRouter/>
                </div>
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;
