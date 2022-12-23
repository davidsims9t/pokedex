import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GET_POKEMON, SET_LOADING, SHOW_ERROR } from '../actionTypes';
import { Pokemon, RootState } from '../types';
import { searchPokemon } from '../utils/searchPokemon';
import {Dialog} from './Dialog';
import './Index.scss'

let timeout;

export default function Index() {
  const pokemon = useSelector((state: RootState) => {
    return state.pokedex.pokemon;
  })
  const history = useSelector((state: RootState) => {
    return state.pokedex.history;
  })
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');
  const [viewHistory, setViewHistory] = useState(false);

  async function updatePokemon(searchText: number | string) {
    try {
      dispatch({
        type: SET_LOADING
      });

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
    if (!searchText) return;

    clearTimeout(timeout);
    timeout = setTimeout(async () => {
      await updatePokemon(searchText as number | string);
    }, 100);
  };

  const renderSprite = (obj: Pokemon["sprites"] = {}) => {
    return Object.values(obj)
      .filter(obj => typeof obj === "string")
      .map((sprite, i) => {
        return <img key={`sprite-${i}`} src={sprite as string | undefined} alt={`Sprite ${i}`} />;
      });
  };

  return (
    <main className="wrapper">
      <div className="search">
        <input className="search-text" data-testid="search-text" type="text" onFocus={(e) => e.target.select()} onChange={updateSearchText} placeholder="Name / ID" />
        <button className="search-btn" data-testid="search-btn" onClick={updateSearch}>Search</button>
        <div className="search-history">
          <button data-testid="search-history-btn" className="search-history-btn" onClick={() => setViewHistory(!viewHistory)}>View History</button>
          {viewHistory && <div data-testid="search-history-results" className="search-history-results">
            {!history.length && <>No history to show</>}
            {history.map((pokemon, i) => (
              <a key={`search-${i}`} data-testid={`search-${i}`} href="#" onClick={() => updatePokemon(pokemon.name as string | number)} className="search-history-result">
                {pokemon.name}
              </a>
            ))}
          </div>}
        </div>
      </div>
      <div className="pokedex">
        <div className="pokedex-device">
          <div className="pokedex-controls">
            <div className="pokedex-bubble" />
            <div className="pokedex-red" />
            <div className="pokedex-yellow" />
            <div className="pokedex-green" />
          </div>
          <div className="pokemon-img">
            {pokemon && (
              <>
                <img src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${String(pokemon?.id).padStart(3, '0')}.png`} alt={pokemon.name} />
                <div className="pokemon-sprites">
                  {renderSprite(pokemon.sprites)}
                </div>
              </>)}
          </div>
          <div data-testid="name" className="pokemon-name">
            {pokemon && pokemon.name}
          </div>
          <div className="pokedex-botton-controls">
            <div className="pokedex-buttons">
              <div className="pokedex-top-btn" />
              <div className="pokedex-left-btn" />
              <div className="pokedex-right-btn" />
              <div className="pokedex-bottom-btn" />
            </div>
            <div className="pokedex-speaker" />
          </div>
        </div>
        <div className="pokedex-cover">
          <div data-testid="stats" className="pokemon-stats">
            {pokemon && (
              <>
                <div>Weight: {pokemon.weight} kg</div>
                <div>Height: {pokemon.height} cm</div>
                <div>Abilities: {pokemon?.abilities?.map(({ability}) => ability?.name).join(', ')}</div>
                <div>Moves: {pokemon?.moves?.slice(0, 5).map(({move}) => move?.name).join(', ')}</div>
                <div>Species: {pokemon?.species?.name}</div>
              </>
            )}
          </div>
          <div className="pokedex-blue-btns">
            {[...Array(15)].map((btn, i) => <div key={`btn-${i}`} className="pokedex-blue-btn" />)}
          </div>
          <div className="pokedex-white-btns" />
          <div className="pokedex-yellow-btn" />
          <div data-testid="type" className="pokemon-type">
            {pokemon && (
              <>
                {pokemon.types?.slice(0, 2).map(({type}) => type.name).join(' / ')}
              </>
            )}
          </div>
          <div data-testid="number" className="pokemon-number">
            {pokemon && (
              <>
                #{pokemon.id}
              </>
            )}
          </div>
        </div>
      </div>
      <Dialog />
    </main>
  )
}