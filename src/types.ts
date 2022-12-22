import { GET_POKEMON, GET_POKEMONS } from "./actionTypes";

export interface Action<T, P> {
    readonly type: T;
    readonly payload?: P;
};

export type GetPokemon = Action<typeof GET_POKEMON, void>;
export type GetPokemons = Action<typeof GET_POKEMONS, void>;

export type Actions = GetPokemon | GetPokemons;