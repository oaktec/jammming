import React from "react";
import Track from "./Track";

const Tracklist = ({ tracks, listActionType, onActionClick }) => {
  return (
    <div className="Tracklist">
      {tracks.map((track) => (
        <Track
          key={track.id}
          track={track}
          action={listActionType === "add" ? "+" : "-"}
        />
      ))}
    </div>
  );
};

export default Tracklist;
