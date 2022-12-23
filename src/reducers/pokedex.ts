import { PayloadAction } from "@reduxjs/toolkit";
import { Actions, PokedexState, Pokemon } from "../types";
import { GET_POKEMON, HIDE_ERROR, SHOW_ERROR, SET_LOADING } from "../actionTypes";

const initialState: PokedexState = {
  error: false,
  pokemon: undefined,
  isLoading: false,
  history: []
};

export default function(state = initialState, action: PayloadAction<Pokemon, Actions>): PokedexState {
  switch (action.type) {
    case GET_POKEMON:
      return {
        ...state,
        history: [...(state.history || []), state.pokemon].filter(Boolean) as Pokemon[],
        pokemon: action.payload,
        isLoading: false,
        error: false
      };
    case SET_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case SHOW_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true
      };
    case HIDE_ERROR:
      return {
        ...state,
        isLoading: false,
        error: false
      };
    default:
      return state;
  }
}
