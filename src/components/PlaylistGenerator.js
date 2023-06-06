import React from "react";
import { useState, useEffect } from "react";

import "./css/PlaylistGenerator.css";

import SearchArea from "./SearchArea";
import LoginArea from "./LoginArea";
import Playlist from "./Playlist";
import SearchResults from "./SearchResults";

import Spotify from "../services/spotifyService";

const PlaylistGenerator = () => {
  const [searching, setSearching] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [playlistName, setPlaylistName] = useState("");
  const [playlistTracks, setPlaylistTracks] = useState([]);

  // Initialize Spotify API wrapper
  useEffect(() => {
    Spotify.init(() => {
      setLoggedIn(true);
    });
  }, []);

  const search = async () => {
    if (!searchTerm) {
      alert("Please enter a search term!");
      return;
    }
    setSearching(true);

    try {
      const results = await Spotify.search(searchTerm);
      setSearchResults(results);
      setSearching(false);
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

  const savePlaylist = async () => {
    const trackURIs = playlistTracks.map((track) => track.uri);
    setSaving(true);

    try {
      await Spotify.createPlaylist(playlistName, trackURIs);
      setPlaylistTracks([]);
      setPlaylistName("");
      setSaving(false);

      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLoginClick = () => {
    Spotify.login();
  };

  return (
    <div className="playlist-generator">
      {loggedIn ? (
        <SearchArea
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSearchClick={search}
          searching={searching}
        />
      ) : (
        <LoginArea login={handleLoginClick} />
      )}
      <SearchResults
        addToPlaylist={addToPlaylist}
        searchResults={searchResults}
      />
      <Playlist
        removeFromPlaylist={removeFromPlaylist}
        playlistTracks={playlistTracks}
        playlistName={playlistName}
        setPlaylistName={setPlaylistName}
        onSaveClick={savePlaylist}
        saving={saving}
        saveSuccess={saveSuccess}
      />
    </div>
  );
};

export default PlaylistGenerator;
