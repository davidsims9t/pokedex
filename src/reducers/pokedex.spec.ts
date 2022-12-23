import { expect, test } from "vitest";
import { GET_POKEMON, HIDE_ERROR, SET_LOADING, SHOW_ERROR } from "../actionTypes";
import reducer from "./pokedex";

test("reducer returns expected state after searching for pokemon", () => {
    expect(reducer(undefined, {})).toEqual({
        error: false,
        history: [],
        isLoading: false,
        pokemon: undefined
    });
    const action = {
        type: GET_POKEMON,
        payload: {
            id: 1,
            name: "bulbasaur",

        }
    };
    const state = reducer(undefined, action);
    expect(state).toEqual({
        error: false,
        history: [],
        isLoading: false,
        pokemon: {
            id: 1,
            name: "bulbasaur"
        }
    });
});

test("reducer sets loading state to true", () => {
    expect(reducer(undefined, {})).toEqual({
        error: false,
        history: [],
        isLoading: false,
        pokemon: undefined
    });
    const action = {
        type: SET_LOADING,
    };
    const state = reducer(undefined, action);
    expect(state).toEqual({
        error: false,
        history: [],
        isLoading: true,
        pokemon: undefined
    });
});

test("reducer sets error to true or false correctly", () => {
    expect(reducer(undefined, {})).toEqual({
        error: false,
        history: [],
        isLoading: false,
        pokemon: undefined
    });
    const showAction = {
        type: SHOW_ERROR,
    };
    const state = reducer(undefined, showAction);
    expect(state).toEqual({
        error: true,
        history: [],
        isLoading: false,
        pokemon: undefined
    });

    const hideAction = {
        type: HIDE_ERROR,
    };
    const newState = reducer(undefined, hideAction);
    expect(newState).toEqual({
        error: false,
        history: [],
        isLoading: false,
        pokemon: undefined
    });
});