import React, { useContext, useEffect } from "react";
import { withRouter } from "react-router-dom";
import CharacterContext from "../../context/characterContext/characterContext";
import AuthContext from "../../context/authContext/authContext";

const CharacterList = (props) => {
    const { characters, getCharacters, editOneCharacter, deleteCharacter } =
        useContext(CharacterContext);
    const { user, loading, isAuthenticated } = useContext(AuthContext);

    useEffect(() => {
        getCharacters();
    }, []);

    const handleRemove = (id) => {
        let confirmAction = window.confirm(
            "Are you sure you want to delete this character?"
        );
        if (confirmAction) {
            deleteCharacter(id);
        }
    };

    const handleEdit = (character) => {
        editOneCharacter(character);
        props.history.push("/form");
    };

    if (characters === null || characters.length === 0) {
        return (
            <h3>
                {loading ? "Loading characters..." : "Please add a character"}
            </h3>
        );
    }

    return (
        <div className="d-flex flex-wrap">
            {characters.map((character) => (
                <div
                    className="card m-4"
                    style={{ width: "18rem" }}
                    key={character._id}
                >
                    <div className="card-header d-flex justify-content-between pt-3">
                        <h5 className="card-title">
                            {character.characterName}
                        </h5>
                        <p className="card-text">created by {character.name}</p>
                    </div>

                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            Race: {character.race}
                        </li>
                        <li className="list-group-item">
                            Strength: {character.strength}
                        </li>
                        <li className="list-group-item">
                            Dexterity: {character.dexterity}
                        </li>
                        <li className="list-group-item">
                            Constitution: {character.constitution}
                        </li>
                        <li className="list-group-item">
                            Intelligence: {character.intelligence}
                        </li>
                        <li className="list-group-item">
                            Wisdom: {character.wisdom}
                        </li>
                        <li className="list-group-item">
                            Charisma: {character.charisma}
                        </li>
                    </ul>
                    {isAuthenticated && (
                        <div className="card-footer d-flex justify-content-between">
                            <button
                                type="button"
                                className="btn btn-primary"
                                disabled={!user || user._id !== character.user}
                                onClick={() => handleEdit(character)}
                            >
                                Edit
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger"
                                disabled={!user || user._id !== character.user}
                                onClick={() => handleRemove(character._id)}
                            >
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default withRouter(CharacterList);
