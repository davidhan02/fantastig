import React, { Fragment, useContext, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import CharacterContext from "../../context/characterContext/characterContext";

const CharacterForm = (props) => {
    const context = useContext(CharacterContext);
    const { error, addCharacter, editCharacter, clearEdit, updateCharacter } =
        context;
    const initialState = {
        characterName: "",
        race: "",
        strength: "",
        dexterity: "",
        constitution: "",
        intelligence: "",
        wisdom: "",
        charisma: "",
    };
    const [character, setCharacter] = useState(initialState);

    useEffect(() => {
        if (editCharacter !== null) {
            setCharacter(editCharacter);
        } else {
            setCharacter(initialState);
        }
    }, [editCharacter, context]);

    const {
        characterName,
        race,
        strength,
        dexterity,
        constitution,
        intelligence,
        wisdom,
        charisma,
    } = character;

    const onInputChange = (e) => {
        setCharacter({
            ...character,
            [e.target.name]: e.target.value,
        });
    };

    const onFormSubmit = (e) => {
        e.preventDefault();
        if (editCharacter === null) {
            addCharacter(character);
        } else {
            updateCharacter(character);
            clearEdit();
        }
        props.history.push("/");
        setCharacter(initialState);
    };

    return (
        <main className="container-sm pt-4" style={{ maxWidth: "700px" }}>
            <h1>{editCharacter !== null ? "Edit" : "Create"} Character</h1>
            <form onSubmit={onFormSubmit}>
                <div className="form-group">
                    <label htmlFor="nameInput">Character Name</label>
                    <input
                        type="text"
                        id="nameInput"
                        className="form-control"
                        placeholder="Enter character name"
                        name="characterName"
                        onChange={onInputChange}
                        value={characterName}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="nameInput">Race</label>
                    <input
                        type="text"
                        id="nameInput"
                        className="form-control"
                        placeholder="Enter race"
                        name="race"
                        onChange={onInputChange}
                        value={race}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="nameInput">Strength</label>
                    <input
                        type="number"
                        min="1"
                        max="20"
                        id="nameInput"
                        className="form-control"
                        placeholder="Enter strength"
                        name="strength"
                        onChange={onInputChange}
                        value={strength}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="nameInput">Dexterity</label>
                    <input
                        type="number"
                        min="1"
                        max="20"
                        id="nameInput"
                        className="form-control"
                        placeholder="Enter dexterity"
                        name="dexterity"
                        onChange={onInputChange}
                        value={dexterity}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="nameInput">Constitution</label>
                    <input
                        type="number"
                        min="1"
                        max="20"
                        id="nameInput"
                        className="form-control"
                        placeholder="Enter constitution"
                        name="constitution"
                        onChange={onInputChange}
                        value={constitution}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="nameInput">Intelligence</label>
                    <input
                        type="number"
                        min="1"
                        max="20"
                        id="nameInput"
                        className="form-control"
                        placeholder="Enter intelligence"
                        name="intelligence"
                        onChange={onInputChange}
                        value={intelligence}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="nameInput">Wisdom</label>
                    <input
                        type="number"
                        min="1"
                        max="20"
                        id="nameInput"
                        className="form-control"
                        placeholder="Enter wisdom"
                        name="wisdom"
                        onChange={onInputChange}
                        value={wisdom}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="nameInput">Charisma</label>
                    <input
                        type="number"
                        min="1"
                        max="20"
                        id="nameInput"
                        className="form-control"
                        placeholder="Enter charisma"
                        name="charisma"
                        onChange={onInputChange}
                        value={charisma}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-2">
                    {editCharacter !== null ? "Edit" : "Create"}
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
            </div>
        </main>
    );
};

export default withRouter(CharacterForm);
