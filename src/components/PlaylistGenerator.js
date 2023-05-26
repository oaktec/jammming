import React from "react";

import "./css/PlaylistGenerator.css";

import SearchArea from "./SearchArea";
import Playlist from "./Playlist";
import SearchResults from "./SearchResults";

const PlaylistGenerator = () => {
  return (
    <div className="PlaylistGenerator">
      <SearchArea />
      <SearchResults />
      <Playlist />
    </div>
  );
};

export default PlaylistGenerator;
