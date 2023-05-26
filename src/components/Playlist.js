import React from "react";
import "./css/Playlist.css";

const Playlist = () => {
  return (
    <section className="Playlist result-block">
      <input className="playlist-name" placeholder="Enter Playlist Name" />

      <button className="save-playlist-btn" disabled>
        SAVE TO SPOTIFY
      </button>
    </section>
  );
};

export default Playlist;
