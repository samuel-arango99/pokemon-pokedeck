import Card from "../UI/Card";
import "./PokeCard.css";

const PokeCard = (props) => {
  const name = props.name;
  const img = props.img;
  return (
    <div className="pokecard-container">
      <div className="pokecard-img__container">
        <img src={img} alt={name} className="pokecard-img"></img>
      </div>
      <span className="pokecard-name">{name}</span>
    </div>
  );
};

export default PokeCard;
