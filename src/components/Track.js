import React from "react";

import "./css/Track.css";

const Track = ({ track }) => {
  return (
    <div className="Track">
      <p>{track.name}</p>
      <p className="subtext">
        {track.artist} | {track.album}
      </p>
    </div>
  );
};

export default Track;
