import React from "react";
import Tracklist from "./Tracklist";

import "./css/SearchResults.css";

const SearchResults = ({ searchResults, addToPlaylist }) => {
  const handleActionClick = (trackIndex) => {
    console.log(trackIndex);
    addToPlaylist(searchResults[trackIndex]);
  };

  return (
    <section className="SearchResults result-block">
      <h2>Results</h2>
      <Tracklist
        tracks={searchResults}
        listActionType="add"
        onActionClick={handleActionClick}
      />
    </section>
  );
};

export default SearchResults;
