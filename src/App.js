import React, {useEffect, useState} from "react";
import './App.scss';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./Components/AppRouter/AppRouter";
import {AuthContext} from "./Components/Context/Context";
import Header from "./Components/Header/Header";
import {firestore} from "./index";
import {getAuth} from "firebase/auth";
import {setNewUserInDatabase} from "./Reducer/AppReducer";


function App() {
    const [auth, setAuth] = useState();
    const [isAuth, setIsAuth] = useState(false);

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
            setAuth
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
