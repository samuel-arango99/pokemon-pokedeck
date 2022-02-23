import { Fragment, useEffect, useState } from "react";

import PokeCard from "./PokeCard";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import "./PokeDeck.css";

const POKEMON_DUMMY = [
  {
    id: "p1",
    name: "Pikachu",
    img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/35.png",
  },
  {
    id: "p2",
    name: "Bulbasaur",
    img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/35.png",
  },
  {
    id: "p3",
    name: "Someone",
    img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/35.png",
  },
  {
    id: "p4",
    name: "Someone else",
    img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/35.png",
  },
  {
    id: "p5",
    name: "Even someone else",
    img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/35.png",
  },
];

const PokeDeck = () => {
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon")
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  }, []);
  return (
    <Fragment>
      <div className={"pagination-container"}>
        {hasPreviousPage && (
          <button className="pagination-btn">
            <GrLinkPrevious size={30}></GrLinkPrevious>
          </button>
        )}
        {hasNextPage && (
          <button className="pagination-btn">
            <GrLinkNext size={30}></GrLinkNext>
          </button>
        )}
      </div>
      <section className="deck-container">
        {POKEMON_DUMMY.map((pokemon) => (
          <PokeCard img={pokemon.img} name={pokemon.name} key={pokemon.id} />
        ))}
      </section>
    </Fragment>
  );
};

export default PokeDeck;
