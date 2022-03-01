import classes from "./Searchbar.module.css";
import { useNavigate } from "react-router-dom";
import { GrSearch } from "react-icons/gr";
import { useRef } from "react";

const Searchbar = () => {
  const searchRef = useRef();
  const navigation = useNavigate();

  const submitSearchHandler = (e) => {
    e.preventDefault();
    navigation(`/search?query=${searchRef.current.value}`);
    searchRef.current.value = "";
  };
  return (
    <form className={classes["search-form"]} onSubmit={submitSearchHandler}>
      <input type="text" className={classes.search} ref={searchRef}></input>
      <button type="submit" className={classes.btn}>
        <GrSearch size={20}></GrSearch>
      </button>
    </form>
  );
};

export default Searchbar;
