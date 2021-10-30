import React, { useReducer } from "react";
import axios from "axios";
import CharacterContext from "./characterContext";
import characterReducer from "./characterReducer";
import {
    GET_CHARACTERS,
    ADD_CHARACTER,
    EDIT_CHARACTER,
    UPDATE_CHARACTER,
    REMOVE_CHARACTER,
    CLEAR_EDIT,
    CHARACTERS_ERROR,
    SET_EDIT_MODE,
} from "../types";

const CharacterState = (props) => {
    const initialState = {
        isEditMode: false,
        characters: [],
        editCharacter: null,
        error: null,
    };

    const [state, dispatch] = useReducer(characterReducer, initialState);

    // get characters
    const getCharacters = async () => {
        try {
            const res = await axios.get("/api/characters");
            dispatch({
                type: GET_CHARACTERS,
                payload: res.data,
            });
        } catch (err) {
            dispatch({
                type: CHARACTERS_ERROR,
                payload: err.response.msg,
            });
        }
    };

    // add character
    const addCharacter = async (character) => {
        const config = {
            "Content-Type": "application/json",
        };
        try {
            const res = await axios.post("/api/characters", character, config);
            dispatch({
                type: ADD_CHARACTER,
                payload: res.data,
            });
        } catch (err) {
            dispatch({
                type: CHARACTERS_ERROR,
                payload: err.response.msg,
            });
        }
    };

    // update character
    const updateCharacter = async (character) => {
        const config = {
            "Content-Type": "application/json",
        };
        try {
            const res = await axios.put(
                `/api/characters/${character._id}`,
                character,
                config
            );
            dispatch({
                type: UPDATE_CHARACTER,
                payload: res.data,
            });
            getCharacters();
        } catch (err) {
            dispatch({
                type: CHARACTERS_ERROR,
                payload: err.response.msg,
            });
        }
    };

    // delete character
    const deleteCharacter = async (id) => {
        try {
            await axios.delete(`/api/characters/${id}`);
            dispatch({
                type: REMOVE_CHARACTER,
                payload: id,
            });
        } catch (err) {
            dispatch({
                type: CHARACTERS_ERROR,
                payload: err.response.msg,
            });
        }
    };

    // edit character
    const editOneCharacter = (character) => {
        dispatch({
            type: EDIT_CHARACTER,
            payload: character,
        });
    };
    const clearEdit = () => {
        dispatch({
            type: CLEAR_EDIT,
        });
    };

    // set edit mode
    const setEditMode = (boolean) => {
        dispatch({
            type: SET_EDIT_MODE,
            payload: boolean,
        });
    };

    return (
        <CharacterContext.Provider
            value={{
                characters: state.characters,
                editCharacter: state.editCharacter,
                error: state.error,
                loading: state.loading,
                isEditMode: state.isEditMode,
                getCharacters,
                addCharacter,
                updateCharacter,
                deleteCharacter,
                editOneCharacter,
                clearEdit,
                setEditMode,
            }}
        >
            {props.children}
        </CharacterContext.Provider>
    );
};

export default CharacterState;
