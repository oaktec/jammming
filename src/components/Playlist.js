import React from "react";

import Track from "./Track";

import "./css/Playlist.css";

const Playlist = ({ playlistTracks }) => {
  return (
    <section className="Playlist result-block">
      <input className="playlist-name" placeholder="Enter Playlist Name" />
      <div className="Tracklist">
        {playlistTracks.map((track) => (
          <Track key={track.id} track={track} />
        ))}
      </div>

      <button className="save-playlist-btn">SAVE TO SPOTIFY</button>
    </section>
  );
};

export default Playlist;
