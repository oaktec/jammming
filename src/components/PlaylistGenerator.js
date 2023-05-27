import React from "react";
import { useState } from "react";

import "./css/PlaylistGenerator.css";

import SearchArea from "./SearchArea";
import Playlist from "./Playlist";
import SearchResults from "./SearchResults";

const PlaylistGenerator = () => {
  const [searchResults, setSearchResults] = useState([
    {
      id: 1,
      name: "Track 1",
      artist: "Artist 1",
      album: "Album 1",
    },
    {
      id: 2,
      name: "Track 2",
      artist: "Artist 2",
      album: "Album 2",
    },
    {
      id: 3,
      name: "Track 3",
      artist: "Artist 3",
      album: "Album 3",
    },
  ]);

  const [playlistTracks, setPlaylistTracks] = useState([
    {
      id: 1,
      name: "Track 1",
      artist: "Artist 1",
      album: "Album 1",
    },
    {
      id: 2,
      name: "Track 2",
      artist: "Artist 2",
      album: "Album 2",
    },
  ]);

  const addToPlaylist = (track) => {
    const newPlaylistTracks = [...playlistTracks, track];
    setPlaylistTracks(newPlaylistTracks);
  };

  const removeFromPlaylist = (trackIndex) => {
    const newPlaylistTracks = playlistTracks.filter(
      (t, index) => index !== trackIndex
    );
    setPlaylistTracks(newPlaylistTracks);
  };

  return (
    <div className="PlaylistGenerator">
      <SearchArea />
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
