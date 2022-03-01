import { Fragment, useEffect, useState } from "react";
import ReactLoading from "react-loading";
import PokeCard from "./PokeCard";

import "./PokeDeck.css";
import "./Favorites.css";

const Favorites = () => {
  const [pageLoaded, setPageLoaded] = useState(false);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setPageLoaded(false);
    if (localStorage.getItem("favorites")) {
      setFavorites(localStorage.getItem("favorites").split(" "));
    }

    setPageLoaded(true);
  }, []);

  let content = (
    <span className="empty-message">
      You don't have any favorites yet. Save some and come back later!
    </span>
  );

  if (!pageLoaded) {
    content = <ReactLoading type="spinningBubbles" height={100} width={100} />;
  } else {
    if (favorites.length > 0) {
      content = favorites.map((fav) => (
        <PokeCard
          key={fav}
          name={fav}
          url={`https://pokeapi.co/api/v2/pokemon/${fav}`}
        />
      ));
    }
  }

  return (
    <Fragment>
      <section className="deck-container">{content}</section>
    </Fragment>
  );
};

export default Favorites;
