import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/authContext/authContext";
import CharacterList from "../../components/characters/CharacterList";

const Home = () => {
    const { loadUser, isAuthenticated } = useContext(AuthContext);

    useEffect(() => {
        loadUser();
    }, []);

    const loggedInMessage = <Link to="/form">Create a character</Link>;
    const regularMessage = (
        <Link to="/login">Login to create or edit a character</Link>
    );
    return (
        <main>
            <h1 className="m-4 mb-0">Characters</h1>
            <span style={{ marginLeft: "25px" }}>
                {isAuthenticated ? loggedInMessage : regularMessage}
            </span>
            <CharacterList />
        </main>
    );
};

export default Home;
