import React from "react";
import Track from "./Track";

const Tracklist = ({ tracks, listActionType, onActionClick }) => {
  console.log(tracks);
  return (
    <div className="Tracklist">
      {tracks.map((track, index) => (
        <Track
          key={track.id}
          track={track}
          index={index}
          actionDisplay={listActionType === "add" ? "+" : "-"}
          onActionClick={onActionClick}
        />
      ))}
    </div>
  );
};

export default Tracklist;
