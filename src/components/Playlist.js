import React from "react";

import Tracklist from "./Tracklist";

import "./css/Playlist.css";

const Playlist = ({
  playlistTracks,
  removeFromPlaylist,
  playlistName,
  setPlaylistName,
  onSaveClick,
}) => {
  const handleActionClick = (trackIndex) => {
    removeFromPlaylist(trackIndex);
  };

  const selectAllText = (e) => {
    if (e.target.value === "New Playlist") e.target.select();
  };

  return (
    <section className="Playlist result-block">
      <input
        value={playlistName}
        onChange={(e) => setPlaylistName(e.target.value)}
        onFocus={selectAllText}
        className="playlist-name"
        placeholder="Enter Playlist Name"
      />
      <Tracklist
        tracks={playlistTracks}
        listActionType="remove"
        onActionClick={handleActionClick}
      />

      <button
        onClick={(e) => {
          onSaveClick(e);
          setPlaylistName("New Playlist");
        }}
        className={
          playlistTracks.length > 0
            ? "save-playlist-btn"
            : "save-playlist-btn hide-btn"
        }
        disabled={!playlistName}
      >
        SAVE PLAYLIST TO SPOTIFY
      </button>
    </section>
  );
};

export default Playlist;
