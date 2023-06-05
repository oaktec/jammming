import React from "react";
import Track from "./Track";

const Tracklist = ({ tracks, listActionType, onActionClick }) => {
  return (
    <div className="tracklist">
      {tracks.map((track, index) => (
        <Track
          key={index}
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
