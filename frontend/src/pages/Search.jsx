import React, { useState, useEffect } from "react";
import SongCard from "../components/SongCard";
import "./Search.css";
import { searchYouTube } from "../utils/youtube";
import { useNavigate } from "react-router-dom";
import Player from "../components/Player"; // Add this line


const Search = ({ setPlayerSongs, setSongIndex }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState(null); // For player

  const navigate = useNavigate();

  useEffect(() => {
    const fetchYouTubeSongs = async () => {
      if (!query.trim()) return;

      setLoading(true);
      try {
        const data = await searchYouTube(query);
        setResults(data);
      } catch (err) {
        console.error("YouTube search error:", err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(fetchYouTubeSongs, 500);
    return () => clearTimeout(debounce);
  }, [query]);

  const handlePlay = (index) => {
    const songs = results.map((item) => ({
      id: item.id,
      title: item.snippet.title,
      artist: item.snippet.channelTitle,
      image:
        item.snippet.thumbnails?.maxres?.url ||
        item.snippet.thumbnails?.high?.url ||
        item.snippet.thumbnails?.default?.url ||
        "",
      publishedAt: item.snippet.publishedAt,
    }));

    setPlayerSongs(songs);
    setSongIndex(index);
    setSelectedVideoId(results[index].id); // play selected video
    navigate("/player");
  };

  return (
    <div className="search-page">
      <h2>Search Songs</h2>
      <input
        type="text"
        placeholder="Type song or artist name..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="results">
        {loading ? (
          <p>Loading...</p>
        ) : results.length === 0 ? (
          <p>No results or start typing...</p>
        ) : (
          results.map((item, index) => (
            <SongCard
              key={item.id}
              song={{
                id: item.id,
                title: item.snippet.title,
                artist: item.snippet.channelTitle,
                image:
                  item.snippet.thumbnails?.maxres?.url ||
                  item.snippet.thumbnails?.high?.url ||
                  item.snippet.thumbnails?.default?.url ||
                  "",
                publishedAt: item.snippet.publishedAt,
              }}
              onPlay={() => handlePlay(index)}
            />
          ))
        )}
      </div>

      {selectedVideoId && (
        <Player
          // songs={results.map((item) => ({
          //   id: item.id,
          //   title: item.snippet.title,
          //   artist: item.snippet.channelTitle,
          //   image:
          //     item.snippet.thumbnails?.maxres?.url ||
          //     item.snippet.thumbnails?.high?.url ||
          //     item.snippet.thumbnails?.default?.url ||
          //     "",
          //   publishedAt: item.snippet.publishedAt,
          // }))}
          // currentIndex={results.findIndex((item) => item.id === selectedVideoId)}
          // setCurrentIndex={(index) =>
          //   setSelectedVideoId(results[index]?.id || null)
          // }
        />
      )}

    </div>
  );
};

export default Search;
