import React from "react";

import "./css/NotificationTrack.css";

const NotificationTrack = ({ msg, type }) => {
  const classes = "track-notification " + type;

  return (
    <div className="track">
      <div className={classes}>
        <p>{msg}</p>
      </div>
    </div>
  );
};

export default NotificationTrack;
