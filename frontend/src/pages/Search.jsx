import React, { useState, useEffect } from "react";
import SongCard from "../components/SongCard";
import "./Search.css";
import { searchYouTube } from "../utils/youtube";

const Search = ({ setPlayerSongs, setSongIndex }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchYouTubeSongs = async () => {
      if (!query.trim()) return;

      try {
        const results = await searchYouTube(query);
        setResults(results);
      } catch (err) {
        console.error("YouTube search error:", err);
        setResults([]);
      }
    };

    const debounce = setTimeout(fetchYouTubeSongs, 500);
    return () => clearTimeout(debounce);
  }, [query]);

  const handlePlay = (index) => {
    const songs = results.map((item) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      artist: item.snippet.channelTitle,
      image: item.snippet.thumbnails.default.url,
      videoId: item.id.videoId,
    }));

    setPlayerSongs(songs);
    setSongIndex(index);
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
        {results.length === 0 ? (
          <p>No results or start typing...</p>
        ) : (
          results.map((item, index) => (
            <SongCard
              key={item.id.videoId}
              song={{
                id: item.id.videoId,
                title: item.snippet.title,
                artist: item.snippet.channelTitle,
                image: item.snippet.thumbnails.default.url,
                videoId: item.id.videoId,
              }}
              onPlay={() => handlePlay(index)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Search;
