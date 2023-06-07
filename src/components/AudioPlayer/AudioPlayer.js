import React, { useRef, useEffect } from "react";
import "./AudioPlayer.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";

const AudioPlayer = ({ audioUrl }) => {
  const [isPlaying, setPlaying] = React.useState(true);

  const audioRef = useRef();
  const playbackBarRef = useRef();

  const onLoadedMetadata = () => {
    const refDuration = audioRef.current.duration;
    playbackBarRef.current.max = refDuration;
    setPlaying(true);
  };

  const onTimeUpdate = () => {
    playbackBarRef.current.value = audioRef.current.currentTime;
  };

  const onSeek = () => {
    audioRef.current.currentTime = playbackBarRef.current.value;
  };

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
          <audio
            src={audioUrl}
            autoPlay
            ref={audioRef}
            onLoadedMetadata={onLoadedMetadata}
            onTimeUpdate={onTimeUpdate}
          />
        </div>
        <div className="controls">
          <button className="play-pause-btn" onClick={handlePlayPause}>
            <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
          </button>
        </div>
        <div className="playback-bar">
          <input onChange={onSeek} ref={playbackBarRef} type="range" />
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
