import React from "react";

import Tracklist from "./Tracklist";

import "./css/Playlist.css";
import LoadingSpinner from "./LoadingSpinner";

const Playlist = ({
  playlistTracks,
  removeFromPlaylist,
  playlistName,
  setPlaylistName,
  onSaveClick,
  saving,
  notification,
}) => {
  const handleActionClick = (trackIndex) => {
    removeFromPlaylist(trackIndex);
  };

  const selectAllText = (e) => {
    if (e.target.value === "New Playlist") e.target.select();
  };

  const highlightNameInput = () => {
    document.querySelector(".playlist-name").classList.add("highlight-input");
  };

  const clearHighlightNameInput = () => {
    document
      .querySelector(".playlist-name")
      .classList.remove("highlight-input");
  };

  const handlePlaylistNameChange = (e) => {
    setPlaylistName(e.target.value);
    if (e.target.value !== "") clearHighlightNameInput();
  };

  return (
    <section className="playlist result-block">
      <input
        value={playlistName}
        onChange={handlePlaylistNameChange}
        onFocus={selectAllText}
        className="playlist-name"
        placeholder="Enter Playlist Name"
      />
      <Tracklist
        tracks={playlistTracks}
        listActionType="remove"
        onActionClick={handleActionClick}
        notification={notification}
      />

      <div
        className="btn-wrapper"
        onMouseEnter={() => {
          if (!playlistName) highlightNameInput();
        }}
        onMouseLeave={() => {
          clearHighlightNameInput();
        }}
      >
        <button
          onClick={onSaveClick}
          className={
            playlistTracks.length > 0
              ? "save-playlist-btn"
              : "save-playlist-btn hide-btn"
          }
          disabled={!playlistName}
        >
          {saving ? (
            <>
              {" "}
              SAVING.. <LoadingSpinner />
            </>
          ) : (
            "SAVE PLAYLIST TO SPOTIFY"
          )}
        </button>
      </div>
    </section>
  );
};

export default Playlist;
