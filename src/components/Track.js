import React from "react";

import "./css/Track.css";

const Track = ({ track, index, actionDisplay, onActionClick }) => {
  const handleActionClick = (e) => {
    onActionClick(index);
  };

  return (
    <div className="track">
      <div className="track-info">
        <p>{track.name}</p>
        <p className="subtext">
          {track.artist} | {track.album}
        </p>
      </div>
      <button onClick={handleActionClick} className="action-btn">
        {actionDisplay}
      </button>
    </div>
  );
};

export default Track;
