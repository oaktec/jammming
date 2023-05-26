import React from "react";

import "./css/PlaylistGenerator.css";

import SearchArea from "./SearchArea";
import Playlist from "./Playlist";
import Tracklist from "./Tracklist";

const PlaylistGenerator = () => {
  return (
    <div className="PlaylistGenerator">
      <SearchArea />
      <Tracklist />
      <Playlist />
    </div>
  );
};

export default PlaylistGenerator;
