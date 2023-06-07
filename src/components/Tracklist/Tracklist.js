import React from "react";
import Track from "../Track/Track";
import NotificationTrack from "../NotificationTrack/NotificationTrack";

import "./Tracklist.css";

const Tracklist = ({ tracks, listActionType, onActionClick, notification }) => {
  return (
    <div className="tracklist">
      {tracks.map((track, index) => (
        <Track
          key={index}
          track={track}
          index={index}
          actionDisplay={listActionType}
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
