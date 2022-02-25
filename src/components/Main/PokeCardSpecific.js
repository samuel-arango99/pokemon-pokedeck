import { Fragment, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { capitalizeName } from "../../store/config";
import { GrLinkPrevious } from "react-icons/gr";
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

  useEffect(() => {
    setLoaded(false);
    async function fetchData() {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${location.id}/`
      );
      const data = await res.json();
      //console.log(data);
      setName(capitalizeName(data.name));
      setImg(data.sprites.front_default);
      setType(data.types);

      const resChain = await fetch(
        `https://pokeapi.co/api/v2/evolution-chain/${data.id}/`
      );
      const dataChain = await resChain.json();

      console.log(dataChain);

      setEvolutionChain(dataChain.chain.evolves_to);

      //console.log(evolutionChain);
    }

    fetchData().then(() => {
      setLoaded(true);
      console.log(evolutionChain);
    });
  }, [location]);

  const returnBtnHandler = () => {
    navigate(-1);
  };

  return (
    <Fragment>
      <section className="pokemon-container">
        {loaded && (
          <div className="pokemon-card">
            <span className="pokemon-name">{name}</span>

            <img className="pokemon-img" src={img} alt={name} />

            <span className="pokemon-types__text">Types:</span>
            <ul className="pokemon-types">
              {type &&
                type.map((typ) => (
                  <li key={typ.slot}>{capitalizeName(typ.type.name)}</li>
                ))}
            </ul>
          </div>
        )}
        {!loaded && (
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
