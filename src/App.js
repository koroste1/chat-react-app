import React, {useState} from "react";
import './App.scss';
import Input from "./Components/UI/Input/Input";
import Button from "./Components/UI/Button/Button";
import Login from "./Components/Pages/Login/Login";
import Header from "./Components/Header/Header";
import StartPage from "./Components/Pages/StartPage/StartPage";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./Components/AppRouter/AppRouter";
import {AuthContext} from "./Components/Context/Context";


function App() {
    const [isAuth, setIsAuth] = useState(false);
    return (
        <AuthContext.Provider value={{
            isAuth,
            setIsAuth,
        }}>
            <BrowserRouter>
                <div className="App">
                    <AppRouter/>
                    <StartPage/>
                    {/*<Header/>*/}
                    {/*<Login/>*/}
                </div>
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;
