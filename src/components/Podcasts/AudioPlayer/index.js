import React from "react";
import "./style.css";
import { useRef, useState, useEffect } from "react";
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from "react-icons/fa";

function AudioPlayer({ audioSrc, imageSrc }) {
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMute, setIsMute] = useState(true);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef();

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (isMute) {
      audioRef.current.volume = 1;
      setVolume(1);
    } else {
      audioRef.current.volume = 0;
      setVolume(0);
    }
  }, [isMute]);

  

  useEffect(() => {
    const audio = audioRef.current;
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata",handleLoadedMetaData );
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata",handleLoadedMetaData);
      audio.removeEventListener("ended", handleEnded);
    };
  },[] );

  function handleTimeUpdate(){
    setCurrentTime((audioRef.current.currentTime));
  }

  function handleLoadedMetaData(){
    setDuration((audioRef.current.duration));
    
  }

  function handleEnded(){
    setCurrentTime(0);
    setIsPlaying(false);
  }

  function handleDuration(e) {
    setCurrentTime(e.target.value);
    
    audioRef.current.currentTime = (e.target.value);
  }

  function handleVolume(e) {
    setVolume(e.target.value);
    audioRef.current.volume = e.target.value;
  }

  function togglePlayMute() {
    if (isMute) {
      setIsMute(false);
    } else {
      setIsMute(true);
    }
  }
  function togglePlay() {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  }

  const timeFormat=(time)=>{
    const min = Math.floor(time/60);
    const sec = Math.floor(time%60);
     return `${min}:${sec < 10? 0: ""}${sec}`;
  }

 
  return (
    <div className="custom-audio-player">
      <img className="custom-image-player" src={imageSrc} alt="audio-img" />
      <audio ref={audioRef} src={audioSrc}></audio>
      <p style={{cursor: "pointer"}} onClick={togglePlay}>{isPlaying ? <FaPause /> : <FaPlay />}</p>

      <div className="duration-flex">
        <p>{timeFormat(currentTime)}</p>
        <input
          type="range"
          className="duration-range"
          value={currentTime}
          max={duration}
          min="0"
          step={0.01}
          onChange={handleDuration}
        />
        <p>-{timeFormat(duration-currentTime)}</p>
      </div>

      <p style={{cursor: "pointer"}} onClick={togglePlayMute}>
        {isMute ? <FaVolumeUp /> : <FaVolumeMute />}
      </p>

      <input
        type="range"
        value={volume}
        max="1"
        min={0}
        step={0.01}
        className="volume-range"
        onChange={handleVolume}
      />
    </div>
  );
}

export default AudioPlayer;
