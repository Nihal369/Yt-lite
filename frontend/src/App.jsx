import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Search from "./pages/Search";
import Player from "./components/Player";
import CreatePlaylist from "./pages/CreatePlaylist";
import MyPlaylists from "./pages/MyPlaylists";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import PlayerPage from "./pages/PlayerPage"; // ⬅️ import here
import "./index.css";

const App = () => {
  const [playerSongs, setPlayerSongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  return (
    <Router>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              setPlayerSongs={setPlayerSongs}
              setSongIndex={setCurrentSongIndex}
            />
          }
        />
        <Route
          path="/search"
          element={
            <Search
              setPlayerSongs={setPlayerSongs}
              setSongIndex={setCurrentSongIndex}
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
        <Route
          path="/player"
          element={
            <PlayerPage
              songs={playerSongs}
              currentIndex={currentSongIndex}
              setCurrentIndex={setCurrentSongIndex}
            />
          }
        />
      </Routes>

      {/* Optional: remove below if you want player only in the /player page */}
      
      {/* {playerSongs.length > 0 && (
        <Player
          songs={playerSongs}
          currentIndex={currentSongIndex}
          setCurrentIndex={setCurrentSongIndex}
        />
      )}  */}
     
    </Router>
  );
};

export default App;
