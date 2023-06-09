import React from "react";

import Tracklist from "../Tracklist/Tracklist";

import "./Playlist.css";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const Playlist = ({
  playlistTracks,
  removeFromPlaylist,
  previewTrack,
  playlistName,
  setPlaylistName,
  onSaveClick,
  saving,
  notification,
}) => {
  const handleActionClick = (trackIndex) => {
    removeFromPlaylist(trackIndex);
  };

  const handlePreviewClick = (trackIndex) => {
    previewTrack(playlistTracks[trackIndex]);
  };

  const selectAllText = (e) => {
    if (e.target.value === "New Playlist") e.target.select();
  };

  const highlightNameInput = () => {
    document.querySelector(".playlist-name").classList.add("highlight-input");
    if (window.matchMedia("(pointer: coarse)").matches) {
      // mobile device
      document.querySelector(".playlist-name").scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
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
      <Tracklist
        tracks={playlistTracks}
        listActionType="remove"
        onActionClick={handleActionClick}
        onPreviewClick={handlePreviewClick}
        notification={notification}
      />
    </section>
  );
};

export default Playlist;
