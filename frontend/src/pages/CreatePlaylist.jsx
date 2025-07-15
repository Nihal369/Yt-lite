import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreatePlaylist.css";

const CreatePlaylist = () => {
  const [playlistName, setPlaylistName] = useState("");
  const navigate = useNavigate();

  const handleCreate = () => {
    if (!playlistName.trim()) {
      alert("Please enter a playlist name");
      return;
    }

    const allPlaylists = JSON.parse(localStorage.getItem("playlists")) || {};
    if (allPlaylists[playlistName]) {
      alert("Playlist already exists!");
      return;
    }

    allPlaylists[playlistName] = [];
    localStorage.setItem("playlists", JSON.stringify(allPlaylists));
    alert(`Playlist '${playlistName}' created`);
    navigate("/my-playlists");
  };

  return (
    <div className="create-playlist">
      <h2>Create Playlist</h2>
      <input
        type="text"
        placeholder="Enter playlist name"
        value={playlistName}
        onChange={(e) => setPlaylistName(e.target.value)}
      />
      <button onClick={handleCreate}>Create</button>
    </div>
  );
};

export default CreatePlaylist;
