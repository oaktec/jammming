import React from "react";

import "./css/Track.css";

const Track = ({ track, action }) => {
  return (
    <div className="Track">
      <div class="track-info">
        <p>{track.name}</p>
        <p className="subtext">
          {track.artist} | {track.album}
        </p>
      </div>
      <button className="action-btn">{action}</button>
    </div>
  );
};

export default Track;
