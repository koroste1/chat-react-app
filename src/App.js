import React, {useState} from "react";
import './App.scss';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./Components/AppRouter/AppRouter";
import {AuthContext} from "./Components/Context/Context";
import Header from "./Components/Header/Header";


function App() {
    const [isAuth, setIsAuth] = useState(false);
    return (
        <AuthContext.Provider value={{
            isAuth,
            setIsAuth,
        }}>
            <BrowserRouter>

                <div className="App">
                    <Header/>
                    <AppRouter/>
                    {/*<StartPage/>*/}
                    {/*<Header/>*/}
                    {/*<Login/>*/}
                </div>
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;
