import React from "react";

import "./css/NotificationTrack.css";

const NotificationTrack = ({ msg, success }) => {
  const classes = success
    ? "track-notification success"
    : "track-notification error";

  return (
    <div className="track">
      <div className={classes}>
        <p>{msg}</p>
      </div>
    </div>
  );
};

export default NotificationTrack;
