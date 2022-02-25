import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";
import { capitalizeName } from "../../store/config";
import "./PokeCard.css";

const PokeCard = ({ name, url }) => {
  const imageRef = useRef();
  const [img, setImg] = useState("");
  const [loadedImg, setLoadedImg] = useState(false);

  useEffect(() => {
    setLoadedImg(false);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setImg(data.sprites.front_default);
      })
      .finally(() => {
        setLoadedImg(true);
      });
  }, [url]);

  useEffect(() => {}, []);

  return (
    <Link className="pokecard-link" to={`/pokemon/${name.toLowerCase()}`}>
      <div className="pokecard-container">
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
