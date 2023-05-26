import React from "react";
import Track from "./Track";

const SearchResults = ({ searchResults }) => {
  return (
    <div className="SearchResults">
      {searchResults.map((track) => (
        <Track key={track.id} track={track} />
      ))}
    </div>
  );
};

export default SearchResults;
