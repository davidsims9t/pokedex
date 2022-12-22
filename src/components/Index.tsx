import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GET_POKEMON, SHOW_ERROR } from '../actionTypes';
import { searchPokemon } from '../utils/searchPokemon';
import {Dialog} from './Dialog';
import './Index.scss'

let timeout;

export default function Index() {
  const pokemon = useSelector((state) => {
    return state.pokedex.pokemon
  })
  const history = useSelector((state) => {
    return state.pokedex.history
  })
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');
  const [viewHistory, setViewHistory] = useState(false);

  async function updatePokemon(searchText: number | string) {
    try {
      const results = await searchPokemon(String(searchText));
      dispatch({
        type: GET_POKEMON,
        payload: results
      });
    } catch(err) {
      console.log(err);
      dispatch({
        type: SHOW_ERROR,
      });
    }
  }

  useEffect(() => {
    updatePokemon(1);
  }, [dispatch]);

  const updateSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) return;

    setSearchText(e.target.value);
  };

  const updateSearch = () => {
    clearTimeout(timeout);
    timeout = setTimeout(async () => {
      await updatePokemon(searchText as number | string);
    }, 100);
  };

  return (
    <main className="wrapper">
      <div className="search">
        <input className="search-text" type="text" onFocus={(e) => e.target.select()} onChange={updateSearchText} placeholder="Name / ID" />
        <button className="search-btn" onClick={updateSearch}>Search</button>
        <div className="search-history">
          <button className="search-history-btn" onClick={() => setViewHistory(!viewHistory)}>View History</button>
          {viewHistory && <div className="search-history-results">
            {history.map(pokemon => (
              <a href="javascript:void(0);" onClick={() => updatePokemon(pokemon.name as string | number)} className="search-history-result">
                {pokemon.name}
              </a>
            ))}
          </div>}
        </div>
      </div>
      <div className="pokedex">
        <div className="pokedex-device">
          <div className="pokemon-img">
            {pokemon && <img src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${String(pokemon?.id).padStart(3, '0')}.png`} alt="Pokemon" />}
          </div>
          <div className="pokemon-name">
            {pokemon && pokemon.name}
          </div>
        </div>
        <div className="pokedex-cover">
          <div className="pokemon-stats">
            {pokemon && (
              <>
                <div>Weight: {pokemon.weight} kg</div>
                <div>Height: {pokemon.height} cm</div>
              </>
            )}
          </div>
          <div className="pokemon-type">
            {pokemon && (
              <>
                <div>{pokemon.types?.[0]?.type?.name}</div>
              </>
            )}
          </div>
          <div className="pokemon-number">
            {pokemon && (
              <>
                <div>#{pokemon.id}</div>
              </>
            )}
          </div>
        </div>
      </div>
      <Dialog />
    </main>
  )
}