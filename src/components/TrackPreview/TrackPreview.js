import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

import "./TrackPreview.css";

const TrackPreview = ({ audioUrl }) => {
  return (
    <div className="track-preview">
      <button className="close-btn">
        <FontAwesomeIcon icon={faX} />
      </button>
      <div className="track-info">
        <p>Track Name</p>
        <p className="subtext">Artist | Album</p>
      </div>
      <audio autoplay controls>
        <source src={audioUrl} type="audio/mpeg" />
      </audio>
    </div>
  );
};

export default TrackPreview;
