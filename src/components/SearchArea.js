import React from "react";
import "./css/SearchArea.css";

const SearchArea = ({ searchTerm, setSearchTerm, onSearchClick }) => {
  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <section className="SearchArea">
      <input
        className="SearchBar"
        value={searchTerm}
        onChange={handleSearchTermChange}
        placeholder="Enter A Song, Album, or Artist"
      />
      <button onClick={onSearchClick} className="SearchButton">
        SEARCH
      </button>
    </section>
  );
};

export default SearchArea;
