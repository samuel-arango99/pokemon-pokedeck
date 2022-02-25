import Searchbar from "./Searchbar";
import { MdFavoriteBorder } from "react-icons/md";
import { GrHomeRounded } from "react-icons/gr";

import classes from "./Header.module.css";
import image from "./img/pokeball.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className={classes["main-header"]}>
      <Link to={"/pokemon"}>
        <div className={classes["main-header__img-container"]}>
          <img
            className={classes["main-header__img"]}
            src={image}
            alt="Pokemon-logo"
          ></img>
        </div>
      </Link>
      <ul>
        <li className={classes.item}>
          <Link to="/pokemon">
            <GrHomeRounded size={25} />
          </Link>
        </li>
        <li className={classes.item}>
          <Searchbar></Searchbar>
        </li>
        <li className={classes.item}>
          <Link to="/favorites" className={classes["main-header__link"]}>
            <div className={classes["favorite-logo__container"]}>
              <MdFavoriteBorder size={30}></MdFavoriteBorder>
            </div>
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
