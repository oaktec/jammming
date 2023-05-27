import React from "react";
import Tracklist from "./Tracklist";

import "./css/SearchResults.css";

const SearchResults = ({
  searchResults,
  playlistTracks,
  setPlaylistTracks,
}) => {
  return (
    <section className="SearchResults result-block">
      <h2>Results</h2>
      <Tracklist tracks={searchResults} listActionType="add" />
    </section>
  );
};

export default SearchResults;
