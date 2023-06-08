import React, { useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

import "./TrackPreview.css";
import AudioPlayer from "../AudioPlayer/AudioPlayer";
import VolumeSlider from "../VolumeSlider/VolumeSlider";

const TrackPreview = ({ track, clearPreviewTrack }) => {
  const [volume, setVolume] = React.useState(50);
  const [isMuted, setMuted] = React.useState(false);
  const [savedVolume, setSavedVolume] = React.useState(50);

  const handleMute = () => {
    if (isMuted) {
      setVolume(savedVolume);
    } else {
      setSavedVolume(volume);
      setVolume(0);
    }
  };

  const handleResume = () => {
    if (isMuted) setVolume(savedVolume);
  };

  const handleVolumeChange = (e) => {
    setVolume(Number.parseInt(e.target.value));
  };

  useEffect(() => {
    if (volume === 0) {
      setMuted(true);
      if (savedVolume === 0) setSavedVolume(50);
    } else {
      setMuted(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [volume]);

  useEffect(() => {
    handleResume();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [track]);

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
          <AudioPlayer
            audioUrl={track.previewUrl}
            volume={volume}
            handleResume={handleResume}
          />
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
