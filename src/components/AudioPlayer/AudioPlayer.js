import React, { useRef, useEffect } from "react";
import "./AudioPlayer.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";

const AudioPlayer = ({ audioUrl }) => {
  const [isPlaying, setPlaying] = React.useState(true);

  const audioRef = useRef();

  const handlePlayPause = (e) => {
    setPlaying(!isPlaying);
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  return (
    <div className="audio-player">
      <div className="inner">
        <div>
          <audio src={audioUrl} autoPlay ref={audioRef} />
        </div>
        <div className="controls">
          <button className="play-pause-btn" onClick={handlePlayPause}>
            <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
          </button>
        </div>
        <div>ProgressBar will be here</div>
      </div>
    </div>
  );
};

export default AudioPlayer;
