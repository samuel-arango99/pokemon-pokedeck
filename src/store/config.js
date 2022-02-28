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
        console.log(data.types);
        for (let i = 0; i < data.types.length; i++)
          types.push(data.types[i].type.name);
      });

    console.log(types);
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
