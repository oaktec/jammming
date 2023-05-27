import React from "react";

import Tracklist from "./Tracklist";
import Track from "./Track";

import "./css/Playlist.css";

const Playlist = ({ playlistTracks }) => {
  return (
    <section className="Playlist result-block">
      <input className="playlist-name" placeholder="Enter Playlist Name" />
      <Tracklist tracks={playlistTracks} />

      <button className="save-playlist-btn">SAVE TO SPOTIFY</button>
    </section>
  );
};

export default Playlist;
