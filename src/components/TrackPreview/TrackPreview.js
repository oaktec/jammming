import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh, faX } from "@fortawesome/free-solid-svg-icons";

import "./TrackPreview.css";

const TrackPreview = () => {
  return (
    <div className="track-preview">
      <button className="mute-btn">
        <FontAwesomeIcon icon={faVolumeHigh} />
      </button>
      <button className="close-btn">
        <FontAwesomeIcon icon={faX} />
      </button>
      <div className="track-info">
        <p>Track Name</p>
        <p className="subtext">Artist | Album</p>
      </div>
    </div>
  );
};

export default TrackPreview;
