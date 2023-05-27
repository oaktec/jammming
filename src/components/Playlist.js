import React from "react";

import Tracklist from "./Tracklist";

import "./css/Playlist.css";

const Playlist = ({ playlistTracks, removeFromPlaylist }) => {
  const handleActionClick = (trackIndex) => {
    removeFromPlaylist(trackIndex);
  };

  return (
    <section className="Playlist result-block">
      <input className="playlist-name" placeholder="Enter Playlist Name" />
      <Tracklist
        tracks={playlistTracks}
        listActionType="remove"
        onActionClick={handleActionClick}
      />

      <button className="save-playlist-btn">SAVE TO SPOTIFY</button>
    </section>
  );
};

export default Playlist;
