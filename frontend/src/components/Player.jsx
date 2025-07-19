import React, { useEffect, useRef, useState } from "react";
import "./Player.css";

const Player = ({ songs, currentIndex, setCurrentIndex }) => {
  const playerRef = useRef(null);
  const currentSong = songs[currentIndex];
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (playerRef.current) playerRef.current.destroy?.();

    const onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player("yt-player", {
        videoId: currentSong.id?.videoId || currentSong.videoId || currentSong.id,
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
    playerRef.current?.playVideo();
    setIsPlaying(true);
  };

  const pause = () => {
    playerRef.current?.pauseVideo();
    setIsPlaying(false);
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
    const t = playerRef.current?.getCurrentTime();
    playerRef.current?.seekTo(t + 10, true);
  };

  const skipBackward10 = () => {
    const t = playerRef.current?.getCurrentTime();
    playerRef.current?.seekTo(Math.max(t - 10, 0), true);
  };

  return (
    <div className="youtube-style-player">
      <div className="left">
        <div className="iframe-wrapper">
          <div id="yt-player" className="yt-frame" />
        </div>
        <div className="player-info">
          <h2>{currentSong.title}</h2>
          <p>{currentSong.artist}</p>
          <div className="controls">
            <button onClick={handlePrev}>⏮</button>
            <button onClick={skipBackward10}>⏪ 10s</button>
            <button onClick={togglePlay}>{isPlaying ? "⏸" : "▶️"}</button>
            <button onClick={skipForward10}>10s ⏩</button>
            <button onClick={handleNext}>⏭</button>
          </div>
        </div>
      </div>

      <div className="right">
        <h3>Up Next</h3>
        {songs
          .filter((_, i) => i !== currentIndex)
          .slice(0, 5)
          .map((song, i) => (
            <div key={i} className="suggested" onClick={() => setCurrentIndex(i)}>
              <img src={song.image} alt="thumb" />
              <div>
                <p className="title">{song.title}</p>
                <p className="artist">{song.artist}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Player;
