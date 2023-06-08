import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeUp, faVolumeMute } from "@fortawesome/free-solid-svg-icons";

import "./VolumeSlider.css";

const VolumeSlider = ({ volume, handleVolumeChange, isMuted, handleMute }) => {
  return (
    <div className="volume-slider">
      <button onClick={handleMute}>
        <FontAwesomeIcon icon={isMuted ? faVolumeMute : faVolumeUp} />
      </button>
      <input
        type="range"
        min="0"
        max="100"
        value={volume}
        onChange={handleVolumeChange}
      />
    </div>
  );
};

export default VolumeSlider;
