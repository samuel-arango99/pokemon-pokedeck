import { POKEMON_PER_PAGE } from "./config";

export let store = { perType: [], perPage: [] };

export const fetchPokemons = async (page) => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=${
      (Number(page) - 1) * POKEMON_PER_PAGE
    }&limit=${POKEMON_PER_PAGE}`
  );
  const data = await response.json();

  const newStore = [...store.perPage, { page, data }];
  store.perPage = newStore;
};
