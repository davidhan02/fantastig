import React, { Fragment, useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/authContext/authContext";

const Register = (props) => {
    const { register, isAuthenticated, error, clearErrors, setError } =
        useContext(AuthContext);

    useEffect(() => {
        console.log(isAuthenticated);
        if (isAuthenticated) {
            props.history.push("/");
        }
        clearErrors();
    }, [isAuthenticated, props.history]);

    const [user, setUser] = useState({
        name: "",
        username: "",
        password: "",
        password2: "",
    });

    const { name, username, password, password2 } = user;

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
        if (password !== password2) {
            setError("Password does not match");
        } else {
            register({
                name,
                username,
                password,
            });
        }
    };

    return (
        <main className="container-sm pt-4" style={{ maxWidth: "700px" }}>
            <h1>Register</h1>
            <form onSubmit={onFormSubmit}>
                <div className="form-group">
                    <label htmlFor="nameInput">Full Name</label>
                    <input
                        type="text"
                        id="nameInput"
                        className="form-control"
                        placeholder="Enter full name"
                        name="name"
                        onChange={onInputChange}
                        value={name}
                        required
                    />
                </div>
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
                <div className="form-group">
                    <label htmlFor="passwordInput2">Retype Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="passwordInput2"
                        name="password2"
                        placeholder="Enter password again"
                        onChange={onInputChange}
                        value={password2}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-2">
                    Register
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
                    Already have an account? <Link to="/register">Log In</Link>
                </p>
            </div>
        </main>
    );
};

export default Register;
