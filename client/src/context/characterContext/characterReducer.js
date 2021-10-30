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

export default (state, { type, payload }) => {
    switch (type) {
        case GET_CHARACTERS:
            return {
                ...state,
                characters: payload,
                error: null,
            };
        case ADD_CHARACTER:
            return {
                ...state,
                characters: [...state.characters, payload],
            };
        case EDIT_CHARACTER:
            return {
                ...state,
                editCharacter: payload,
            };
        case UPDATE_CHARACTER:
            return {
                ...state,
                characters: state.characters.map((char) =>
                    char._id === payload._id ? payload : char
                ),
            };
        case REMOVE_CHARACTER:
            return {
                ...state,
                characters: state.characters.filter(
                    (char) => char._id !== payload
                ),
            };
        case CLEAR_EDIT:
            return {
                ...state,
                editCharacter: null,
            };
        case CHARACTERS_ERROR:
            return {
                ...state,
                error: payload,
            };
        case SET_EDIT_MODE:
            return {
                ...state,
                isEditMode: payload,
            };
        default:
            return state;
    }
};
