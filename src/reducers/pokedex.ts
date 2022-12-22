import { GET_POKEMON, SHOW_ERROR, HIDE_ERROR } from "../actionTypes";
import { Actions } from "../types";

const initialState = {
  error: false,
  pokemon: null,
  isLoading: false,
  history: []
};

export default function(state = initialState, action: Actions) {
  switch (action.type) {
    case GET_POKEMON: {
      return {
        ...state,
        history: [...state.history, state.pokemon].filter(Boolean),
        pokemon: action.payload,
        isLoading: false,
        error: null
      };
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
