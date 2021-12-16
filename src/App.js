import React, {useEffect, useState} from "react";
import './App.scss';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./Components/AppRouter/AppRouter";
import {AuthContext} from "./Components/Context/Context";
import Header from "./Components/Header/Header";
import {firestore} from "./index";
import {getAuth} from "firebase/auth";


function App() {
    const auth = getAuth();
    const [isAuth, setIsAuth] = useState(false);
    useEffect(() => {
        if (localStorage.getItem('isAuth')) {
            setIsAuth(true)
        }
    }, [])
    return (
        <AuthContext.Provider value={{
            isAuth,
            setIsAuth,
            firestore,
            auth
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
