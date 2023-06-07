import React, { useState, useEffect, useRef } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

import "./TrackPreview.css";

const TrackPreview = ({ track }) => {
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [track]);

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
          <audio
            ref={audioRef}
            src={track.previewUrl}
            autoPlay
            controls
            onVolumeChange={(e) => setVolume(e.target.volume)}
          />
        </div>
      )}
    </>
  );
};

export default TrackPreview;
