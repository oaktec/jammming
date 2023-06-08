import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

import "./TrackPreview.css";
import AudioPlayer from "../AudioPlayer/AudioPlayer";
import VolumeSlider from "../VolumeSlider/VolumeSlider";

const TrackPreview = ({ track, clearPreviewTrack }) => {
  const [volume, setVolume] = React.useState(50);
  const [isMuted, setMuted] = React.useState(false);

  const handleMute = () => {
    setMuted(!isMuted);
    if (isMuted) {
      setVolume(50);
    } else {
      setVolume(0);
    }
  };

  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
    if (volume === 0) {
      setMuted(true);
    }
  };

  return (
    <>
      {track && (
        <div className="track-preview">
          <button onClick={clearPreviewTrack} className="close-btn">
            <FontAwesomeIcon icon={faX} />
          </button>
          {track.albumArt && <img src={track.albumArt} alt="album art" />}
          <div className="track-info">
            <p>{track.name}</p>
            <p className="subtext">
              {track.artist} | {track.album}
            </p>
          </div>
          <AudioPlayer audioUrl={track.previewUrl} volume={volume} />
          <VolumeSlider
            volume={volume}
            isMuted={isMuted}
            handleMute={handleMute}
            handleVolumeChange={handleVolumeChange}
          />
        </div>
      )}
    </>
  );
};

export default TrackPreview;
