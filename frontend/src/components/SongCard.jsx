import React, { useEffect, useState } from "react";

const SongCard = ({ song, onPlay }) => {
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState("");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [thumbnail, setThumbnail] = useState("");

  // 1. Get high-quality thumbnail
  useEffect(() => {
    const getBestThumbnail = async () => {
      const videoId = song.id?.videoId || song.id; // Handle both id formats
      const maxRes = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
      const fallback = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

      const img = new Image();
      img.src = maxRes;
      img.onload = () => {
        if (img.naturalHeight < 200) {
          setThumbnail(fallback);
        } else {
          setThumbnail(maxRes);
        }
      };
      img.onerror = () => setThumbnail(fallback);
    };

    getBestThumbnail();
  }, [song]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("playlists")) || {};
    setPlaylists(Object.keys(data));

    const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    const exists = bookmarks.some((s) => s.id === song.id);
    setIsBookmarked(exists);
  }, [song.id]);

  const handleAddToPlaylist = () => {
    if (!selectedPlaylist) {
      alert("Please select a playlist.");
      return;
    }

    const all = JSON.parse(localStorage.getItem("playlists")) || {};
    if (!all[selectedPlaylist]) {
      all[selectedPlaylist] = [];
    }

    if (all[selectedPlaylist].find((s) => s.id === song.id)) {
      alert("Already in playlist.");
      return;
    }

    all[selectedPlaylist].push(song);
    localStorage.setItem("playlists", JSON.stringify(all));
    alert("Song added to playlist: " + selectedPlaylist);
  };

  const toggleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    const index = bookmarks.findIndex((s) => s.id === song.id);

    if (index !== -1) {
      bookmarks.splice(index, 1);
      setIsBookmarked(false);
      alert("Removed from bookmarks.");
    } else {
      bookmarks.push(song);
      setIsBookmarked(true);
      alert("Bookmarked!");
    }

    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  };

  return (
    <div style={styles.card}>
      <img src={thumbnail} alt={song.title} style={styles.image} />
      <div style={{ flexGrow: 1 }}>
        <h4>{song.title}</h4>
        <p>{song.artist || song.snippet?.channelTitle}</p>
        <button onClick={onPlay} style={styles.play}>▶️ Play</button>

        <div style={{ marginTop: "10px" }}>
          <select
            value={selectedPlaylist}
            onChange={(e) => setSelectedPlaylist(e.target.value)}
          >
            <option value="">➕ Add to Playlist</option>
            {playlists.map((name) => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
          {selectedPlaylist && <button onClick={handleAddToPlaylist}>✅</button>}
        </div>
      </div>

      {/* <button onClick={toggleBookmark} style={styles.bookmark}>
        {isBookmarked ? "🔖 Bookmarked" : "⭐ Bookmark"}
      </button> */}
    </div>
  );
};

const styles = {
  card: {
    border: "1px solid #ccc",
    padding: "15px",
    borderRadius: "8px",
    marginBottom: "15px",
    // display: "flex",
    gap: "15px",
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
    borderRadius: "8px",
  },
  play: {
    marginTop: "5px",
    background: "#111",
    color: "white",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  bookmark: {
    background: "#f0f0f0",
    border: "1px solid #aaa",
    borderRadius: "5px",
    padding: "5px 10px",
    cursor: "pointer",
    fontSize: "14px",
  },
};

export default SongCard;
