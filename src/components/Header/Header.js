import Searchbar from "./Searchbar";
import { MdFavoriteBorder } from "react-icons/md";

import classes from "./Header.module.css";
import image from "./img/pokeball.png";

const Header = () => {
  return (
    <header className={classes["main-header"]}>
      <div className={classes["main-header__img-container"]}>
        <img
          className={classes["main-header__img"]}
          src={image}
          alt="Pokemon-logo"
        ></img>
      </div>
      <ul>
        <li className={classes.item}>
          <Searchbar></Searchbar>
        </li>
        <li className={classes.item}>
          <a>
            <div className={classes["favorite-logo__container"]}>
              <MdFavoriteBorder size={30}></MdFavoriteBorder>
            </div>
          </a>
        </li>
      </ul>
    </header>
  );
};

export default Header;
