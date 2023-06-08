import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

import "./TrackPreview.css";
import AudioPlayer from "../AudioPlayer/AudioPlayer";
import VolumeSlider from "../VolumeSlider/VolumeSlider";

const TrackPreview = ({ track, clearPreviewTrack }) => {
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
          <AudioPlayer audioUrl={track.previewUrl} />
          <VolumeSlider />
        </div>
      )}
    </>
  );
};

export default TrackPreview;
