import React, { Fragment, useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/authContext/authContext";

const Login = (props) => {
    const { login, isAuthenticated, error, clearErrors } =
        useContext(AuthContext);

    useEffect(() => {
        console.log(error);
        if (isAuthenticated) {
            props.history.push("/");
        }
        clearErrors();
    }, [isAuthenticated, props.history]);

    const [user, setUser] = useState({
        username: "",
        password: "",
    });

    const { username, password } = user;

    const onInputChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
        if (error !== null) {
            clearErrors();
        }
    };

    const onFormSubmit = (e) => {
        e.preventDefault();
        login({ username, password });
        console.log(isAuthenticated);
        clearErrors();
    };

    return (
        <main className="container-sm pt-4" style={{ maxWidth: "700px" }}>
            <h1>Login</h1>
            <form onSubmit={onFormSubmit}>
                <div className="form-group">
                    <label htmlFor="usernameInput">Username</label>
                    <input
                        type="text"
                        id="usernameInput"
                        className="form-control"
                        placeholder="Enter username"
                        name="username"
                        onChange={onInputChange}
                        value={username}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="passwordInput">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="passwordInput"
                        name="password"
                        placeholder="Enter password"
                        onChange={onInputChange}
                        value={password}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-2">
                    Login
                </button>
            </form>
            <div>
                {error && error !== null && (
                    <Fragment>
                        {error.map((error) => (
                            <div>{error.msg}</div>
                        ))}
                    </Fragment>
                )}
                <p>
                    Don't have an account? <Link to="/register">Sign Up</Link>
                </p>
            </div>
        </main>
    );
};

export default Login;
