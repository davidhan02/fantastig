import React, { useContext, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../../context/authContext/authContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const authContext = useContext(AuthContext);
    const { isAuthenticated, loading, loadUser, user } = authContext;

    useEffect(() => {
        if (!user || !isAuthenticated) {
            loadUser();
        }
    }, []);

    return (
        <Route
            {...rest}
            render={(props) =>
                !isAuthenticated && !loading ? (
                    <Redirect to="/login" />
                ) : (
                    <Component {...props} />
                )
            }
        />
    );
};

export default PrivateRoute;
