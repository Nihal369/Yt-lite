import React, { useEffect, useState } from "react";
import { searchYouTube, getTrendingVideos } from "../utils/youtube"; // path may vary
import SongCard from "../components/SongCard";

const Home = () => {
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const data = await getTrendingVideos();
        setTrending(data);
      } catch (error) {
        console.error("Error fetching trending videos:", error);
      }
    };

    fetchTrending();
  }, []);

  const handlePlay = (videoId) => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, "_blank");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🔥 Trending Music</h2>
      {trending.map((song) => (
        <SongCard
          key={song.id}
          song={{
            id: song.id,
            title: song.snippet.title,
            artist: song.snippet.channelTitle,
            image: `https://i.ytimg.com/vi/${song.id}/hqdefault.jpg`,
          }}
          onPlay={() => handlePlay(song.id)}
        />
      ))}
    </div>
  );
};

export default Home;
