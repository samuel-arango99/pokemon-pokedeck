import classes from "./Searchbar.module.css";
import { GrSearch } from "react-icons/gr";

const Searchbar = () => {
  return (
    <form className={classes["search-form"]}>
      <input type="text" className={classes.search}></input>
      <button type="submit" className={classes.btn}>
        <GrSearch size={20}></GrSearch>
      </button>
    </form>
  );
};

export default Searchbar;
