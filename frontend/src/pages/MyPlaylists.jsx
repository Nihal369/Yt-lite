import React, { useState, useEffect } from "react";

const MyPlaylists = ({ setPlayerSongs, setSongIndex }) => {
  const [playlists, setPlaylists] = useState({});
  const [selected, setSelected] = useState("");

  // Load playlists from localStorage on mount
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("playlists")) || {};
    setPlaylists(data);

    const firstPlaylist = Object.keys(data)[0];
    if (firstPlaylist) setSelected(firstPlaylist);
  }, []);

  const handlePlay = (index) => {
    const songs = playlists[selected];
    if (!songs || songs.length === 0) {
      alert("No songs to play");
      return;
    }
    setPlayerSongs(songs);
    setSongIndex(index);
  };

  const removeSong = (id) => {
    const updated = { ...playlists };
    updated[selected] = updated[selected].filter((song) => song.id !== id);
    localStorage.setItem("playlists", JSON.stringify(updated));
    setPlaylists(updated);
  };

  const selectedSongs = playlists[selected] || [];

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>🎵 My Playlists</h2>

      {Object.keys(playlists).length === 0 ? (
        <p>No playlists found.</p>
      ) : (
        <>
          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            style={{ padding: "10px", marginBottom: "20px", width: "100%" }}
          >
            <option value="">Select Playlist</option>
            {Object.keys(playlists).map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>

          {selected && selectedSongs.length === 0 ? (
            <p>No songs in this playlist.</p>
          ) : (
            selectedSongs.map((song, index) => (
              <div
                key={song.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                  marginBottom: "10px",
                  border: "1px solid #ccc",
                  padding: "10px",
                  borderRadius: "8px",
                }}
              >
                <img
                  src={song.image}
                  alt={song.title}
                  style={{ width: "60px", borderRadius: "6px" }}
                />
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: 0 }}>{song.title}</h4>
                  <p style={{ margin: 0, fontSize: "14px", color: "#666" }}>
                    {song.artist}
                  </p>
                </div>
                <button
                  onClick={() => handlePlay(index)}
                  disabled={!song.preview_url}
                  style={{
                    background: "#0f0",
                    border: "none",
                    borderRadius: "5px",
                    padding: "5px 10px",
                    cursor: song.preview_url ? "pointer" : "not-allowed",
                  }}
                >
                  ▶️
                </button>
                <button
                  onClick={() => removeSong(song.id)}
                  style={{
                    background: "#f00",
                    border: "none",
                    borderRadius: "5px",
                    padding: "5px 10px",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                >
                  ❌
                </button>
              </div>
            ))
          )}
        </>
      )}
    </div>
  );
};

export default MyPlaylists;
