import React from "react";

const Track = ({ track }) => {
  return (
    <div className="Track">
      <p>{track.name}</p>
      <p>
        {track.artist} | {track.album}
      </p>
    </div>
  );
};

export default Track;
