import { Fragment, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ReactLoading from "react-loading";

import { POKEMON_PER_PAGE, capitalizeName } from "../../store/config";
import { store, fetchPokemons } from "../../store/pokemonGlobal";

import PokeCard from "./PokeCard";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import "./PokeDeck.css";

const PokeDeck = () => {
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [pokemons, setPokemons] = useState([]);
  const [numberOfPages, setNumberOfPages] = useState();
  const [pageLoaded, setPageLoaded] = useState(false);
  const [types, setTypes] = useState([]);
  const [filterValue, setFilterValue] = useState("");

  const selectRef = useRef();
  const [searchParams, setSearchParams] = useSearchParams();

  const init = () => {
    setPageLoaded(false);
    setHasNextPage(true);
    setHasPreviousPage(false);
  };

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon")
      .then((res) => res.json())
      .then((data) => {
        setNumberOfPages(Math.ceil(data.count / POKEMON_PER_PAGE));
      })
      .then(() => fetch("https://pokeapi.co/api/v2/type"))
      .then((resType) => resType.json())
      .then((dataTypes) => {
        setTypes(dataTypes.results);
      });
  }, []);

  useEffect(() => {
    init();
    let page = searchParams.get("page");
    let type = searchParams.get("type");

    if (!page || Number(page) === 0) {
      if (!type) {
        setSearchParams({ page: "1", type: "All" });
      } else {
        setSearchParams({ page: "1", type: type });
      }

      return;
    }
    if (page >= 2) setHasPreviousPage(true);
    if (Number(page) === numberOfPages) setHasNextPage(false);

    const getPokemons = store.perPage.find((pokemon) => pokemon.page === page);
    if (getPokemons) {
      setPokemons(getPokemons.data.results);
      setPageLoaded(true);
    } else {
      fetchPokemons(page).then(() => {
        setPokemons(
          store.perPage.find((pokemon) => pokemon.page === page).data.results
        );
        setPageLoaded(true);
      });
    }

    return () => {};
  }, [searchParams, setSearchParams, numberOfPages]);

  const changePageHandler = (next = true) => {
    let page = searchParams.get("page");
    if (next) setSearchParams({ page: String(Number(page) + 1) });
    if (!next) setSearchParams({ page: String(Number(page) - 1) });
  };

  const selectChangeHandler = () => {
    setFilterValue(selectRef.current.value);
  };

  return (
    <Fragment>
      <h1 className="main-title">Poke-deck</h1>
      <div className={"pagination-container"}>
        <div className="pagination-select__container">
          <label className="pagination-select__label" htmlFor="select-type">
            Pokemon type
          </label>
          <select
            className="pagination-btn pagination-select"
            id="select-type"
            onChange={selectChangeHandler}
            ref={selectRef}
          >
            <option>All</option>
            {types.map((type, i) => (
              <option className="pagination-option" key={i}>
                {capitalizeName(type.name)}
              </option>
            ))}
          </select>
        </div>
        {hasPreviousPage && (
          <button
            className="pagination-btn"
            onClick={changePageHandler.bind(this, false)}
          >
            <GrLinkPrevious size={30} />
          </button>
        )}
        {hasNextPage && (
          <button className="pagination-btn" onClick={changePageHandler}>
            <GrLinkNext size={30} />
          </button>
        )}
      </div>
      <section className="deck-container">
        {!pageLoaded && (
          <ReactLoading type="spinningBubbles" height={100} width={100} />
        )}
        {pageLoaded &&
          pokemons.map((pokemon) => (
            <PokeCard
              key={pokemon.name}
              url={pokemon.url}
              name={pokemon.name}
              typeFilter={filterValue}
            />
          ))}
      </section>
    </Fragment>
  );
};

export default PokeDeck;
