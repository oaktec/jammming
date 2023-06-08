import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeUp, faVolumeMute } from "@fortawesome/free-solid-svg-icons";

import "./VolumeSlider.css";

const VolumeSlider = () => {
  const [volume, setVolume] = React.useState(100);
  const [isMuted, setMuted] = React.useState(false);

  const onVolumeChange = (e) => {
    setVolume(e.target.value);
  };

  const onMute = () => {
    setMuted(!isMuted);
  };

  return (
    <div className="volume-slider">
      <button onClick={onMute}>
        <FontAwesomeIcon icon={isMuted ? faVolumeMute : faVolumeUp} />
      </button>
      <input
        type="range"
        min="0"
        max="100"
        value={volume}
        onChange={onVolumeChange}
      />
    </div>
  );
};

export default VolumeSlider;
