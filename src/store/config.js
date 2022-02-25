export const POKEMON_PER_PAGE = 20;

export function capitalizeName(name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

export function getPokemonTypes(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => resolve(data.types));
  });
}
