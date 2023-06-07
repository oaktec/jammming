import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinus,
  faPlus,
  faVolumeHigh,
} from "@fortawesome/free-solid-svg-icons";

import "./Track.css";

const Track = ({ track, index, actionDisplay, onActionClick }) => {
  const handleActionClick = (e) => {
    onActionClick(index);
  };

  return (
    <div className="track">
      <div className="track-info">
        <p>{track.name}</p>
        <p className="subtext">
          {track.artist} | {track.album}
        </p>
      </div>
      <button className="preview-track-btn">
        <FontAwesomeIcon icon={faVolumeHigh} />
      </button>
      <button onClick={handleActionClick} className="action-btn">
        <FontAwesomeIcon icon={actionDisplay === "add" ? faPlus : faMinus} />
      </button>
    </div>
  );
};

export default Track;
