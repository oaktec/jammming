import React from "react";
import Track from "./Track";
import NotificationTrack from "./NotificationTrack";

const Tracklist = ({ tracks, listActionType, onActionClick, saveSuccess }) => {
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
      {saveSuccess && <NotificationTrack msg="Playlist Saved" success={true} />}
    </div>
  );
};

export default Tracklist;
