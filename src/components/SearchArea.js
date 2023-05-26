import React from "react";
import "./css/SearchArea.css";

const SearchArea = () => {
  return (
    <section className="SearchArea">
      <input
        className="SearchBar"
        placeholder="Enter A Song, Album, or Artist"
      />
      <button className="SearchButton">SEARCH</button>
    </section>
  );
};

export default SearchArea;
