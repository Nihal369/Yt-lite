import React, { useEffect, useRef, useState } from "react";
import "./Player.css";

const Player = ({ songs, currentIndex, setCurrentIndex }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const playerRef = useRef(null);
  const currentSong = songs[currentIndex];

  useEffect(() => {
    if (playerRef.current) playerRef.current.destroy();

    const onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player("yt-player", {
        videoId: currentSong.videoId,
        events: {
          onReady: () => {
            playerRef.current.playVideo();
            setIsPlaying(true);
          },
        },
      });
    };

    if (window.YT && window.YT.Player) {
      onYouTubeIframeAPIReady();
    } else {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
      window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
    }
  }, [currentSong]);

  const play = () => {
    if (playerRef.current) {
      playerRef.current.playVideo();
      setIsPlaying(true);
    }
  };

  const pause = () => {
    if (playerRef.current) {
      playerRef.current.pauseVideo();
      setIsPlaying(false);
    }
  };

  const togglePlay = () => {
    isPlaying ? pause() : play();
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % songs.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + songs.length) % songs.length);
  };

  const skipForward10 = () => {
    if (playerRef.current) {
      const currentTime = playerRef.current.getCurrentTime();
      playerRef.current.seekTo(currentTime + 10, true);
    }
  };

  const skipBackward10 = () => {
    if (playerRef.current) {
      const currentTime = playerRef.current.getCurrentTime();
      playerRef.current.seekTo(Math.max(currentTime - 10, 0), true);
    }
  };

  return (
    <div className={`player-bar ${isExpanded ? "expanded" : "minimized"}`}>
      <div className="left">
        <img src={currentSong.image} alt={currentSong.title} />
        <div>
          <h4>{currentSong.title}</h4>
          <p>{currentSong.artist}</p>
        </div>
      </div>

      <div className="middle-controls">
        <button onClick={handlePrev}>⏮</button>
        <button onClick={skipBackward10}>⏪ 10s</button>
        <button onClick={togglePlay}>{isPlaying ? "⏸" : "▶️"}</button>
        <button onClick={skipForward10}>10s ⏩</button>
        <button onClick={handleNext}>⏭</button>
      </div>

      <div className="right-toggle">
        <button onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? "🔽 Minimize" : "🔼 Expand"}
        </button>
      </div>

      <div className={`iframe-wrapper ${isExpanded ? "show" : "hide"}`}>
        <div id="yt-player" ></div>
      </div>
    </div>
  );
};

export default Player;
