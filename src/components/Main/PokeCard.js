import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";
import { capitalizeName } from "../../store/config";
import "./PokeCard.css";

const PokeCard = ({ name, url, typeFilter }) => {
  const imageRef = useRef();
  const [img, setImg] = useState("");
  const [loadedImg, setLoadedImg] = useState(false);
  const [types, setTypes] = useState([]);

  useEffect(() => {
    setLoadedImg(false);
    const typesAux = [];
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setImg(data.sprites.front_default);
        for (let i = 0; i < data.types.length; i++)
          typesAux.push(data.types[i].type.name);
      })
      .finally(() => {
        setLoadedImg(true);
        setTypes(typesAux);
      });
  }, [url]);

  let className = "pokecard-link";
  if (typeFilter !== "All" && typeFilter !== "") {
    className = `pokecard-link ${
      types.includes(typeFilter.toLowerCase()) ? "" : "hidden"
    }`;
  }

  return (
    <Link className={className} to={`/pokemon/${name.toLowerCase()}`}>
      <div className={`pokecard-container`}>
        {!loadedImg && <ReactLoading type="spinningBubbles" />}
        {loadedImg && (
          <div className="pokecard-img__container">
            <img
              src={img}
              alt={name}
              className="pokecard-img"
              ref={imageRef}
            ></img>
          </div>
        )}
        <span className="pokecard-name">{capitalizeName(name)}</span>
      </div>
    </Link>
  );
};

export default PokeCard;
