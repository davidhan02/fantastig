import React, { Fragment, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import AuthContext from "../../context/authContext/authContext";
import CharacterContext from "../../context/characterContext/characterContext";

const Navbar = ({ title }) => {
    const { user, logout, isAuthenticated, clearErrors } =
        useContext(AuthContext);
    const { clearEdit } = useContext(CharacterContext);
    const [toggled, setToggle] = useState(false);

    const onToggle = () => {
        setToggle(!toggled);
    };

    const onLogout = () => {
        logout();
        clearErrors();
    };

    const authLinks = (
        <Fragment>
            <li className="nav-item">
                <span className="nav-link">Hello, {user && user.name}</span>
            </li>
            <li className="nav-item">
                <Link
                    className="nav-link"
                    to="/form"
                    onClick={() => {
                        clearEdit();
                    }}
                >
                    Create
                </Link>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#!" onClick={onLogout}>
                    <span className="sm-hide">Logout</span>
                </a>
            </li>
        </Fragment>
    );

    const guestLinks = (
        <Fragment>
            <li className="nav-item">
                <Link className="nav-link" to="/register">
                    Register
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/login">
                    Login
                </Link>
            </li>
        </Fragment>
    );

    return (
        <nav
            className="navbar navbar-expand-lg navbar-light bg-light p-3 mx-auto"
            style={{ maxWidth: "1200px" }}
        >
            <Link className="navbar-brand" to="/">
                {title}
            </Link>
            <button
                className="navbar-toggler"
                type="button"
                aria-controls="navbarNav"
                aria-expanded={toggled ? "true" : "false"}
                aria-label="Toggle navigation"
                onClick={onToggle}
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div
                className={`collapse navbar-collapse ${toggled ? "show" : ""}`}
                id="navbarNav"
            >
                <ul className="navbar-nav">
                    {isAuthenticated ? authLinks : guestLinks}
                </ul>
            </div>
        </nav>
    );
};

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
};

Navbar.defaultProps = {
    title: "FANTASTIG",
};

export default Navbar;
