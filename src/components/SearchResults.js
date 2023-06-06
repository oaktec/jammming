import React from "react";
import Tracklist from "./Tracklist";

import "./css/SearchResults.css";

const SearchResults = ({ searchResults, addToPlaylist, notification }) => {
  const handleActionClick = (trackIndex) => {
    addToPlaylist(searchResults[trackIndex]);
  };

  return (
    <section className="search-results result-block">
      <h2>Results</h2>
      <Tracklist
        tracks={searchResults}
        listActionType="add"
        onActionClick={handleActionClick}
        notification={notification}
      />
    </section>
  );
};

export default SearchResults;
