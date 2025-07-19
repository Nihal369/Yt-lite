// src/pages/PlayerPage.jsx
import React from "react";
import Player from "../components/Player";

const PlayerPage = ({ songs, currentIndex, setCurrentIndex }) => {
  return (
    <div>
      <h2>Now Playing</h2>
      <Player
        songs={songs}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />
    </div>
  );
};

export default PlayerPage;
