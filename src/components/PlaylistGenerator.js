import React from "react";
import { useState } from "react";

import "./css/PlaylistGenerator.css";

import SearchArea from "./SearchArea";
import Playlist from "./Playlist";
import SearchResults from "./SearchResults";

import Spotify from "../services/spotifyService";

const PlaylistGenerator = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [playlistTracks, setPlaylistTracks] = useState([]);

  const search = async () => {
    if (!searchTerm) {
      alert("Please enter a search term!");
      return;
    }

    try {
      const results = await Spotify.search(searchTerm);
      setSearchResults(results);
    } catch (err) {
      console.log(err);
    }
  };

  const addToPlaylist = (track) => {
    const newPlaylistTracks = [...playlistTracks, track];
    setPlaylistTracks(newPlaylistTracks);
  };

  const removeFromPlaylist = (trackIndex) => {
    const newPlaylistTracks = [...playlistTracks];
    newPlaylistTracks.splice(trackIndex, 1);
    setPlaylistTracks(newPlaylistTracks);
  };

  return (
    <div className="PlaylistGenerator">
      <SearchArea
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSearchClick={search}
      />
      <SearchResults
        addToPlaylist={addToPlaylist}
        searchResults={searchResults}
      />
      <Playlist
        removeFromPlaylist={removeFromPlaylist}
        playlistTracks={playlistTracks}
      />
    </div>
  );
};

export default PlaylistGenerator;
