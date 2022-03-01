import { useSearchParams } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import ReactLoading from "react-loading";
import "./PokeDeck.css";
import "./SearchResult.css";
import PokeCard from "./PokeCard";

const SearchResult = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageLoaded, setPageLoaded] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [url, setURL] = useState("");

  useEffect(() => {
    setError(false);
    setURL("");
    setName("");
    setPageLoaded(false);
    const search = searchParams.get("query");
    if (!search) {
      setSearchParams({ query: "" });
      return;
    }

    async function fetchData() {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${search}`);
        const data = await res.json();

        if (data) {
          setURL(`https://pokeapi.co/api/v2/pokemon/${search}`);
          setName(data.name);
        }
      } catch (err) {
        setError(true);
      }
    }

    fetchData().then(() => setPageLoaded(true));
  }, [searchParams, setSearchParams]);

  const contentError = (
    <h1 className="search-title">{`We couldn't find a pokemon with name or id: '${searchParams.get(
      "query"
    )}', please try something different!`}</h1>
  );

  const content = <PokeCard url={url} name={name} typeFilter="All" />;

  return (
    <Fragment>
      {searchParams.get("query") !== "" ? (
        <Fragment>
          <h1 className="search-title">{`Searching for: ${searchParams.get(
            "query"
          )}...`}</h1>
          <section className="deck-container">
            {!pageLoaded && (
              <ReactLoading type="spinningBubbles" height={100} width={100} />
            )}
            {pageLoaded && !error && content}
            {pageLoaded && error && contentError}
          </section>
        </Fragment>
      ) : (
        <h1 className="main-title">You're not searching anything</h1>
      )}
    </Fragment>
  );
};

export default SearchResult;
