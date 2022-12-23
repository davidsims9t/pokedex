import * as actionTypes from "./actionTypes";
import store from "./reducers";

export type Pokemon = {
    id: number;
    name: string;
    weight: number;
    height: number;
    types: {
        type: {
            name: string
        }
    }[];
    abilities: {
        ability: {
            name: string
        }
    }[];
    moves: {
        move: {
            name: string
        }
    }[];
    species: {
        name: string
    };
    sprites: {
        [key: string]: string | null | Object;
    };
};

export interface PokedexState {
    error?: boolean;
    history: Pokemon[];
    isLoading: boolean;
    pokemon?: Pokemon;
};

export type Actions = keyof typeof actionTypes;
export type RootState = ReturnType<typeof store>;