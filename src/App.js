import React from "react";
import "./App.css";

import SpotifyLogo from "./img/Spotify_Logo_RGB_White.png";

import PlaylistGenerator from "./components/PlaylistGenerator/PlaylistGenerator";

function App() {
  return (
    <div className="App">
      <header>
        <img src={SpotifyLogo} alt="Spotify Logo" />
        <h1>
          Ja<span>mmm</span>ing
        </h1>
      </header>
      <main>
        <PlaylistGenerator />
      </main>
    </div>
  );
}

export default App;
