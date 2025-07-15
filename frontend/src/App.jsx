import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Search from "./pages/Search";
import Player from "./components/Player";
import CreatePlaylist from "./pages/CreatePlaylist";
import MyPlaylists from "./pages/MyPlaylists";
import Navbar from "./components/Navbar";
import Home from "./pages/Home"
import "./index.css"

const App = () => {
  const [playerSongs, setPlayerSongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home setPlayerSongs={setPlayerSongs}
              setSongIndex={setCurrentSongIndex}s />} />
        <Route
          path="/search"
          element={
            <Search
              
            />
          }
        />
        <Route path="/create-playlist" element={<CreatePlaylist />} />
        <Route
          path="/my-playlists"
          element={
            <MyPlaylists
              setPlayerSongs={setPlayerSongs}
              setSongIndex={setCurrentSongIndex}
            />
          }
        />
      </Routes>

      {playerSongs.length > 0 && (
        <Player
          songs={playerSongs}
          currentIndex={currentSongIndex}
          setCurrentIndex={setCurrentSongIndex}
        />
      )}
    </Router>
  );
};

export default App;
