export const POKEMON_PER_PAGE = 20;

export function capitalizeName(name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

export function getPokemonTypes(url) {
  return new Promise((resolve, reject) => {
    const types = [];
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        for (let i = 0; i < data.types.length; i++)
          types.push(data.types[i].type.name);
      });

    resolve(types);
  });
}

export function getEvolutionChain(url) {
  return new Promise((resolve, reject) => {
    const evolutionChain = [];
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        evolutionChain.push(capitalizeName(data.chain.species.name));

        let level = data.chain;
        while (level.evolves_to.length > 0) {
          level = level.evolves_to[0];
          evolutionChain.push(capitalizeName(level.species.name));
        }
        resolve(evolutionChain);
      });
  });
}

export function getPokemonName(id) {
  return new Promise((resolve) => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((res) => res.json())
      .then((data) => resolve(data.name));
  });
}
