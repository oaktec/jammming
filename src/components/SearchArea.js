import React, { useState } from "react";
import "./css/SearchArea.css";
import LoadingSpinner from "./LoadingSpinner";

const SearchArea = ({
  searchTerm,
  setSearchTerm,
  onSearchClick,
  searching,
}) => {
  const handleSearchTermChange = (e) => {
    if (e.target.value !== "") clearHighlightSearchInput();
    setSearchTerm(e.target.value);
  };

  const highlightSearchInput = () => {
    document.querySelector(".search-bar").classList.add("highlight-input");
  };

  const clearHighlightSearchInput = () => {
    document.querySelector(".search-bar").classList.remove("highlight-input");
  };

  return (
    <section className="search-area">
      <input
        className="search-bar"
        value={searchTerm}
        onChange={handleSearchTermChange}
        placeholder="Enter A Song, Album, or Artist"
      />
      <div
        class="btn-wrapper"
        onMouseEnter={() => {
          if (!searchTerm) highlightSearchInput();
        }}
        onMouseLeave={() => {
          clearHighlightSearchInput();
        }}
      >
        <button
          onClick={onSearchClick}
          className="search-button"
          disabled={!searchTerm}
        >
          {searching ? (
            <>
              SEARCHING.. <LoadingSpinner />
            </>
          ) : (
            "SEARCH"
          )}
        </button>
      </div>
    </section>
  );
};

export default SearchArea;
