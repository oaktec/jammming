import React, { useRef, useEffect } from "react";
import "./AudioPlayer.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";

const AudioPlayer = ({ audioUrl }) => {
  const [isPlaying, setPlaying] = React.useState(true);

  const audioRef = useRef();
  const playbackBarRef = useRef();

  const onLoadedMetadata = () => {
    const refDuration = Math.floor(audioRef.current.duration);
    playbackBarRef.current.max = refDuration;
    setPlaying(true);
  };

  const onEnded = () => {
    setPlaying(false);
    playbackBarRef.current.value = 0;
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
      <audio
        src={audioUrl}
        autoPlay
        ref={audioRef}
        onLoadedMetadata={onLoadedMetadata}
        onTimeUpdate={onTimeUpdate}
        onEnded={onEnded}
      />
      <button className="play-pause-btn" onClick={handlePlayPause}>
        <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
      </button>
      <div className="playback-bar">
        <input onChange={onSeek} ref={playbackBarRef} type="range" />
      </div>
    </div>
  );
};

export default AudioPlayer;
