import React from 'react'
import { Redirect, Route, RouteComponentProps, RouteProps } from 'react-router-dom';
import { useStore } from '../stores/store'

interface Props extends RouteProps {
    component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
}

export function PrivateRoute({component: Component, ...rest}: Props) {
    const {userStore} = useStore();
    const {isLoggedIn} = userStore;

    return (
        <Route
            {...rest}
            render={(props) => isLoggedIn ? <Component {...props} /> : <Redirect to='/' />}
        />
    )
}
