import classes from "./Searchbar.module.css";
import { GrSearch } from "react-icons/gr";

const Searchbar = () => {
  const submitSearchHandler = () => {};
  return (
    <form className={classes["search-form"]} onSubmit={submitSearchHandler}>
      <input type="text" className={classes.search}></input>
      <button type="submit" className={classes.btn}>
        <GrSearch size={20}></GrSearch>
      </button>
    </form>
  );
};

export default Searchbar;
