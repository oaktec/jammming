import React from "react";
import Track from "./Track";

const Tracklist = ({ tracks }) => {
  return (
    <div className="Tracklist">
      {tracks.map((track) => (
        <Track key={track.id} track={track} />
      ))}
    </div>
  );
};

export default Tracklist;
