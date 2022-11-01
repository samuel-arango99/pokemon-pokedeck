import { POKEMON_PER_PAGE } from "./config";

export let store = { perType: [], perPage: [] };

export const fetchPokemons = async (page, options) => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=${
      (Number(page) - 1) * POKEMON_PER_PAGE
    }&limit=${POKEMON_PER_PAGE}`,
    options
  );
  const data = await response.json();

  const newStore = [...store.perPage, { page, data }];
  store.perPage = newStore;

  return Math.ceil(data.count / POKEMON_PER_PAGE);
};

export const fetchPokemonType = async (page, type) => {
  const responseType = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
  const dataType = await responseType.json();
  const pagesPerType = Math.ceil(dataType.pokemon.length / POKEMON_PER_PAGE);
  const realPage = page > pagesPerType ? pagesPerType : page;
  const init = (realPage - 1) * POKEMON_PER_PAGE;

  const end =
    init + POKEMON_PER_PAGE - 1 > dataType.pokemon.length
      ? dataType.pokemon.length - 1
      : init + POKEMON_PER_PAGE - 1;

  const dataForTypeAndPage = [];

  for (let i = init; i <= end; i++)
    dataForTypeAndPage.push(dataType.pokemon[i].pokemon);

  const newStore = [
    ...store.perType,
    { type, pokemons: { page: realPage, data: dataForTypeAndPage } },
  ];
  store.perType = newStore;

  return pagesPerType;
};
