import React from "react";
import Tracklist from "../Tracklist/Tracklist";

import "./SearchResults.css";

const SearchResults = ({
  searchResults,
  addToPlaylist,
  notification,
  previewTrack,
}) => {
  const handleActionClick = (trackIndex) => {
    addToPlaylist(searchResults[trackIndex]);
  };

  const handlePreviewClick = (trackIndex) => {
    previewTrack(searchResults[trackIndex]);
  };

  return (
    <section className="search-results result-block">
      <h2>Results</h2>
      <Tracklist
        tracks={searchResults}
        listActionType="add"
        onActionClick={handleActionClick}
        onPreviewClick={handlePreviewClick}
        notification={notification}
      />
    </section>
  );
};

export default SearchResults;
