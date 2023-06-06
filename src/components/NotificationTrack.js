import React from "react";

import "./css/NotificationTrack.css";

const NotificationTrack = ({ msg, type }) => {
  return (
    <div className="track">
      <div className={`track-notification ${type}`}>
        <p>{msg}</p>
      </div>
    </div>
  );
};

export default NotificationTrack;
