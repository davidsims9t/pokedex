// @ts-nocheck
import { fireEvent, screen, render } from '@testing-library/react';
import { test, expect, vi } from 'vitest';
import Index from "./Index";
import reducer from "../reducers";
import { configureStore } from '@reduxjs/toolkit';
import {Provider} from "react-redux";

const searchPokemon = vi.fn().mockImplementation((pokemon) => {
    switch (pokemon) {
        case "1":
        case "bulbasaur":
            return {
                name: "bulbasaur",
                id: 1,
                weight: 100,
                height: 100,
                types: [
                    {
                        type: {
                            name: "grass"
                        }
                    }
                ]
            };
        case "2":
        case "ivysaur":
            return {
                name: "ivysaur",
                id: 2,
                weight: 200,
                height: 200,
                types: [
                    {
                        type: {
                            name: "poison"
                        }
                    }
                ]
            };
        default:
            throw new Error("Unknown pokemon");
    }
});

vi.mock("../utils/searchPokemon", () => {
    return {
        default: null,
        searchPokemon: (pokemon) => {
            return searchPokemon(pokemon);
        }
    };
});

test('fetches from pokeapi initially', async () => {
    const store = configureStore({ reducer });

    const App = () => (
        <Provider store={store}>
            <Index />
        </Provider>
    );

    render(<App />);

    expect(searchPokemon).toHaveBeenCalledWith("1");

    const img = await screen.findByAltText('bulbasaur');
    expect(img.src).toBe('https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png');

    const name = await screen.findByTestId('name');
    expect(name.innerHTML).toBe('bulbasaur');

    const stats = await screen.findByTestId('stats');
    expect(stats.innerHTML).toBe('<div>Weight: 100 kg</div><div>Height: 100 cm</div>');

    const type = await screen.findByTestId('type');
    expect(type.innerHTML).toBe('grass');

    const number = await screen.findByTestId('number');
    expect(number.innerHTML).toBe('#1');
});

test('can search for pokemon', async () => {
    const store = configureStore({ reducer });

    const App = () => (
        <Provider store={store}>
            <Index />
        </Provider>
    );

    render(<App />);

    const search = await screen.findByTestId('search-text');
    fireEvent.change(search, {target:{value:"2"}});

    const searchBtn = await screen.findByTestId('search-btn');
    fireEvent.click(searchBtn);

    await (new Promise((resolve, reject) => setTimeout(resolve, 100)));

    expect(searchPokemon).toHaveBeenCalledWith("2");

    const img = await screen.findByAltText('ivysaur');
    expect(img.src).toBe('https://assets.pokemon.com/assets/cms2/img/pokedex/full/002.png');

    const name = await screen.findByTestId('name');
    expect(name.innerHTML).toBe('ivysaur');

    const stats = await screen.findByTestId('stats');
    expect(stats.innerHTML).toBe('<div>Weight: 200 kg</div><div>Height: 200 cm</div>');

    const type = await screen.findByTestId('type');
    expect(type.innerHTML).toBe('poison');

    const number = await screen.findByTestId('number');
    expect(number.innerHTML).toBe('#2');
});

test('has search history that can be revisited', async () => {
    const store = configureStore({ reducer });

    const App = () => (
        <Provider store={store}>
            <Index />
        </Provider>
    );

    render(<App />);

    const search = await screen.findByTestId('search-text');
    fireEvent.change(search, {target:{value:"2"}});

    const searchBtn = await screen.findByTestId('search-btn');
    fireEvent.click(searchBtn);

    await (new Promise((resolve, reject) => setTimeout(resolve, 100)));

    const searchHistoryBtn = await screen.findByTestId('search-history-btn');
    fireEvent.click(searchHistoryBtn);

    const searchHistoryResults = await screen.findByTestId('search-history-results');
    expect(searchHistoryResults).toBeVisible();

    const lastSearch = await screen.findByTestId('search-0');
    fireEvent.click(lastSearch);

    await (new Promise((resolve, reject) => setTimeout(resolve, 100)));

    expect(searchPokemon).toHaveBeenCalledWith("1");

    const img = await screen.findByAltText('bulbasaur');
    expect(img.src).toBe('https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png');

    const name = await screen.findByTestId('name');
    expect(name.innerHTML).toBe('bulbasaur');

    const stats = await screen.findByTestId('stats');
    expect(stats.innerHTML).toBe('<div>Weight: 100 kg</div><div>Height: 100 cm</div>');

    const type = await screen.findByTestId('type');
    expect(type.innerHTML).toBe('grass');

    const number = await screen.findByTestId('number');
    expect(number.innerHTML).toBe('#1');
});