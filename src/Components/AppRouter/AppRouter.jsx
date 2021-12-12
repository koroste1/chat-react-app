import {useContext} from "react";
import {AuthContext} from "../Context/Context";

import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {privateRoutes, publicRoutes} from "../Router";

const AppRouter = () => {
    const {isAuth} = useContext(AuthContext);
    return (
        isAuth
            ?
            <Switch>
                {publicRoutes.map(route =>
                    <Route
                        component={route.component}
                        path={route.path}
                        exact={route.exact}
                        key={route.path}
                    />)}
                <Redirect to='/'/>
            </Switch>
            : <Switch>
                {
                    privateRoutes.map(route =>
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