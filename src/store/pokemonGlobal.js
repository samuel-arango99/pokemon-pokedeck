import { POKEMON_PER_PAGE } from "./config";

/* export const pokemonContext = createContext({ store: [] });

const PokemonProvider = ({ children }) => {
  const [store, setStore] = useState([]);
  const fetchPokemons = async (page) => {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=${
        (Number(page) - 1) * POKEMON_PER_PAGE
      }&limit=${POKEMON_PER_PAGE}`
    );
    const data = await response.json();

    setStore((prev) => [...prev, data]);
  };
  return (
    <pokemonContext.Provider value={{ store, fetchPokemons }}>
      {children}
    </pokemonContext.Provider>
  );
};

export default PokemonProvider; */

export let store = [];

export const fetchPokemons = async (page) => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=${
      (Number(page) - 1) * POKEMON_PER_PAGE
    }&limit=${POKEMON_PER_PAGE}`
  );
  const data = await response.json();

  const newStore = [...store, { page, data }];
  store = newStore;
};
