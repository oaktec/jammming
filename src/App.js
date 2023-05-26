import React from "react";
import "./App.css";

import PlaylistGenerator from "./components/PlaylistGenerator";

function App() {
  return (
    <div className="App">
      <header>
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
