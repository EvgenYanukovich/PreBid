import { useState } from "react";
import Button from "../Button/Button";
import styles from "./SearchBar.module.scss";

const SearchBar = () => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    console.log("Поиск:", query);
    // Логику поиска реализую потом
  };

  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Поиск"
        className={styles.input}
      />
      <Button styleButton="greenButton" onClick={handleSearch}>
        <img
          src="/src/assets/images/icons/search_icon.svg"
          alt="Иконка поиска"
          className={styles.icon}
        />
      </Button>
    </div>
  );
};

export default SearchBar;
