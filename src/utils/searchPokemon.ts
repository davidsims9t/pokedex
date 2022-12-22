export const searchPokemon = async (pokemon: number | string) => {
    const results = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon?.toLowerCase()}`);
    const json = await results.json();

    return json;
};