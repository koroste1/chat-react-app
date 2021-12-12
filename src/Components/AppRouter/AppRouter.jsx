import {useContext} from "react";
import {AuthContext} from "../Context/Context";
import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {privateRoutes, publicRoutes} from "../Router";

import {useAuthState} from "react-firebase-hooks/auth";

const AppRouter = () => {
    const {isAuth} = useContext(AuthContext);
    console.log(isAuth);
    // const [user] = useAuthState(isAuth);
    return (
        isAuth
            ?
            <Switch>
                {privateRoutes.map(route =>
                    <Route
                        component={route.component}
                        path={route.path}
                        exact={route.exact}
                        key={route.path}
                    />)
                }
                <Redirect to='/'/>
            </Switch>
            : <Switch>
                {
                    publicRoutes.map(route =>
                        <Route
                            component={route.component}
                            path={route.path}
                            exact={route.exact}
                            key={route.path}
                        />)
                }
                <Redirect to='/'/>
            </Switch>

    )
        ;
};

export default AppRouter;