import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

import "./TrackPreview.css";
import AudioPlayer from "../AudioPlayer/AudioPlayer";

const TrackPreview = ({ track }) => {
  return (
    <>
      {track && (
        <div className="track-preview">
          <button className="close-btn">
            <FontAwesomeIcon icon={faX} />
          </button>
          <div className="track-info">
            {track.albumArt && <img src={track.albumArt} alt="album art" />}
            <p>{track.name}</p>
            <p className="subtext">
              {track.artist} | {track.album}
            </p>
          </div>
          <AudioPlayer audioUrl={track.previewUrl} />
        </div>
      )}
    </>
  );
};

export default TrackPreview;
