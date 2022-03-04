import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";
import { capitalizeName } from "../../store/config";
import "./PokeCard.css";

const PokeCard = ({ name, url }) => {
  const [img, setImg] = useState("");
  const [loadedImg, setLoadedImg] = useState(false);

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
      });
  }, [url]);

  let className = "pokecard-link";

  return (
    <Link className={className} to={`/pokemon/${name.toLowerCase()}`}>
      <div className={`pokecard-container`}>
        {!loadedImg ? (
          <ReactLoading type="spinningBubbles" />
        ) : (
          <div className="pokecard-img__container">
            <img src={img} alt={name} className="pokecard-img"></img>
          </div>
        )}
        <span className="pokecard-name">{capitalizeName(name)}</span>
      </div>
    </Link>
  );
};

export default PokeCard;
