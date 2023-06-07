import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

import "./TrackPreview.css";

const TrackPreview = ({ track }) => {
  return (
    <>
      {track && (
        <div className="track-preview">
          <button className="close-btn">
            <FontAwesomeIcon icon={faX} />
          </button>
          <div className="track-info">
            <p>Track Name</p>
            <p className="subtext">Artist | Album</p>
          </div>
          <audio src={track.previewUrl} autoPlay controls />
        </div>
      )}
    </>
  );
};

export default TrackPreview;
