import React, { useEffect, useState } from "react";
import { getTrendingVideos } from "../utils/youtube";
import SongCard from "../components/SongCard";
import { useNavigate } from "react-router-dom";

const categories = {
  now: { name: "Now", id: "" },
  music: { name: "Music", id: "10" },
  gaming: { name: "Gaming", id: "20" },
  movies: { name: "Movies", id: "30" },
  news: { name: "News", id: "25" },
};

const Home = ({ setPlayerSongs, setSongIndex }) => {
  const [activeCategory, setActiveCategory] = useState("now");
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrending = async () => {
      setLoading(true);
      try {
        const category = categories[activeCategory];
        const data = await getTrendingVideos("IN", category.id);
        setVideos(data);
      } catch (error) {
        console.error("Error fetching videos:", error);
        setVideos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, [activeCategory]);

  const handlePlay = (index) => {
    const songs = videos.map((video) => ({
      id: video.id,
      videoId: video.id,
      title: video.snippet.title,
      artist: video.snippet.channelTitle,
      image: `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`,
    }));

    setPlayerSongs(songs);
    setSongIndex(index);
    navigate("/player");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>MiniTube – Trending</h1>

      <div style={styles.tabs}>
        {Object.entries(categories).map(([key, value]) => (
          <button
            key={key}
            style={{
              ...styles.tab,
              ...(activeCategory === key ? styles.activeTab : {}),
            }}
            onClick={() => setActiveCategory(key)}
          >
            {value.name}
          </button>
        ))}
      </div>

      <h2 style={styles.subheading}>
        🔥 Trending {categories[activeCategory].name}
      </h2>

      <div style={styles.results}>
        {loading ? (
          <p style={styles.message}>Loading...</p>
        ) : videos.length === 0 ? (
          <p style={styles.message}>No videos found for this category.</p>
        ) : (
          videos.map((video, idx) => (
            <SongCard
              key={video.id}
              song={{
                id: video.id,
                videoId: video.id,
                title: video.snippet.title,
                artist: video.snippet.channelTitle,
                image: `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`,
              }}
              onPlay={() => handlePlay(idx)}
            />
          ))
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    backgroundColor: "#000",
    minHeight: "100vh",
  },
  heading: {
    color: "#fff",
    fontSize: "28px",
    marginBottom: "20px",
    textAlign: "center",
  },
  tabs: {
    display: "flex",
    gap: "10px",
    // justifyContent: "center",
    flexWrap: "wrap",
    marginBottom: "20px",
  },
  tab: {
    padding: "10px 20px",
    border: "1px solid #ccc",
    borderRadius: "20px",
    cursor: "pointer",
    background: "#fff",
    fontWeight: "600",
    fontSize: "14px",
  },
  activeTab: {
    background: "#e50914",
    color: "#fff",
    border: "1px solid #e50914",
  },
  subheading: {
    color: "#fff",
    marginBottom: "10px",
    fontSize: "22px",
    // textAlign: "center",
  },
  results: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "20px",
    marginTop: "20px",
  },
  message: {
    color: "#fff",
    textAlign: "center",
    fontSize: "16px",
  },
};

export default Home;
