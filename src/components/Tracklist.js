import React from "react";
import Track from "./Track";
import NotificationTrack from "./NotificationTrack";

const Tracklist = ({ tracks, listActionType, onActionClick, notification }) => {
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
      {notification && (
        <NotificationTrack msg={notification.msg} type={notification.type} />
      )}
    </div>
  );
};

export default Tracklist;
