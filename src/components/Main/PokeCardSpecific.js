import { Fragment, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  capitalizeName,
  getEvolutionChain,
  getPokemonName,
} from "../../store/config";
import { GrLinkPrevious } from "react-icons/gr";
import { AiOutlineStar } from "react-icons/ai";
import ReactLoading from "react-loading";

import "./PokeCardSpecific.css";

const PokeCardSpecific = () => {
  const location = useParams();
  const navigate = useNavigate();

  const [loaded, setLoaded] = useState(false);
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const [type, setType] = useState("");
  const [evolutionChain, setEvolutionChain] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setLoaded(false);

    if (localStorage.getItem("favorites")) {
      const favorites = String(localStorage.getItem("favorites")).split(" ");

      console.log(favorites);

      if (Number.isNaN(location.id)) {
        console.log("Not a number");
        if (favorites.includes(location.id)) setIsFavorite(true);
      } else {
        getPokemonName(location.id).then((name) =>
          favorites.includes(name) ? setIsFavorite(true) : ""
        );
      }
    }

    async function fetchData() {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${location.id}/`
      );
      const data = await res.json();
      setName(capitalizeName(data.name));
      setImg(data.sprites.front_default);
      setType(data.types);

      const resSpecies = await fetch(data.species.url);
      const dataSpecies = await resSpecies.json();
      const evolutionChainURL = dataSpecies.evolution_chain.url;

      getEvolutionChain(evolutionChainURL).then((res) => {
        setEvolutionChain(res);
      });
    }

    fetchData().then(() => {
      setLoaded(true);
    });
  }, [location]);

  const returnBtnHandler = () => {
    navigate(-1);
  };

  const addFavoriteHandler = () => {
    setIsFavorite(true);
    const stored = localStorage.getItem("favorites");
    const insert = stored ? stored + " " + location.id : location.id;
    localStorage.setItem("favorites", insert);
  };

  const removeFavoriteHandler = () => {
    const confirm = window.confirm(
      "Are you sure you want to remove this from your favorites?"
    );
    if (!confirm) return;

    const favorites = localStorage.getItem("favorites");
    if (favorites) {
      const data = favorites
        .replace(location.id, "")
        .replace(/\s+/g, " ")
        .trim();
      localStorage.setItem("favorites", data);
    }
    setIsFavorite(false);
  };

  return (
    <Fragment>
      <section className="pokemon-container">
        {loaded ? (
          <div className="pokemon-card">
            <div className="pokemon-name-div">{name}</div>

            <img className="pokemon-img" src={img} alt={name} />
            {isFavorite ? (
              <div
                className="pokemon-favorite__container"
                onClick={removeFavoriteHandler}
              >
                <AiOutlineStar className="pokemon-favorite" />
              </div>
            ) : (
              <button
                className="pokemon-add-favorite"
                onClick={addFavoriteHandler}
              >
                Add to favorites
              </button>
            )}

            <span className="pokemon-types__text">Types:</span>
            <ul className="pokemon-types">
              {type &&
                type.map((typ) => (
                  <li key={typ.slot}>{capitalizeName(typ.type.name)}</li>
                ))}
            </ul>
            <span className="pokemon-evolution-chain__text">
              Evolution chain:
            </span>
            <ul className="pokemon-evolution-chain">
              {evolutionChain &&
                evolutionChain.map((spec, i) => (
                  <li
                    key={i}
                    className={`pokemon-evolution-chain__item ${
                      spec.toLowerCase() === location.id ? "active" : ""
                    }`}
                  >
                    {spec}
                  </li>
                ))}
            </ul>
          </div>
        ) : (
          <ReactLoading type="spinningBubbles" height={200} width={200} />
        )}
      </section>

      <div className="get-back-div">
        <button onClick={returnBtnHandler} className="get-back-btn">
          <GrLinkPrevious size={30} />
        </button>
      </div>
    </Fragment>
  );
};

export default PokeCardSpecific;
