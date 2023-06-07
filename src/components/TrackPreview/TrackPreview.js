import React from "react";

import "./TrackPreview.css";

const TrackPreview = () => {
  return (
    <div className="track-preview">
      <h3>Playing:</h3>
      <div className="track-info">
        <p>Track Name</p>
        <p className="subtext">Artist | Album</p>
      </div>
    </div>
  );
};

export default TrackPreview;
