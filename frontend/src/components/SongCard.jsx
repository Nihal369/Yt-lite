import React, { useEffect, useState } from "react";
import axios from "axios";
import "../components/SongCard.css";

const YOUTUBE_API_KEY = "AIzaSyCN8HMS3qM1pK1gN7Vbfc6F_T8e47WhOQk";

// Format views
export const formatViews = (num) => {
  if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1) + "B";
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
  if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
  return num;
};

// Format time ago
export const timeAgo = (dateString) => {
  const now = new Date();
  const then = new Date(dateString);
  const seconds = Math.floor((now - then) / 1000);

  const units = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "week", seconds: 604800 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];

  for (let unit of units) {
    const value = Math.floor(seconds / unit.seconds);
    if (value > 0) return `${value} ${unit.label}${value > 1 ? "s" : ""} ago`;
  }

  return "Just now";
};

// Format ISO 8601 duration (e.g. PT4M13S) to mm:ss or h:mm:ss
const formatDuration = (isoDuration) => {
  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return "";

  const hours = parseInt(match[1]) || 0;
  const minutes = parseInt(match[2]) || 0;
  const seconds = parseInt(match[3]) || 0;

  const padded = (n) => String(n).padStart(2, "0");

  if (hours > 0) {
    return `${hours}:${padded(minutes)}:${padded(seconds)}`;
  }
  return `${minutes}:${padded(seconds)}`;
};

const SongCard = ({ song, onPlay }) => {
  const [thumbnail, setThumbnail] = useState("");
  const [channelImage, setChannelImage] = useState("");
  const [viewCount, setViewCount] = useState("");
  const [duration, setDuration] = useState("");

  useEffect(() => {
    const getBestThumbnail = async () => {
      const videoId = song.id?.videoId || song.videoId || song.id;

      if (!videoId) {
        setThumbnail(song.image || "https://via.placeholder.com/320x180?text=No+Thumbnail");
        return;
      }

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
    const fetchExtraDetails = async () => {
      try {
        const videoId = song.id?.videoId || song.videoId || song.id;
        if (!videoId) return;

        const videoRes = await axios.get("https://www.googleapis.com/youtube/v3/videos", {
          params: {
            part: "statistics,snippet,contentDetails",
            id: videoId,
            key: YOUTUBE_API_KEY,
          },
        });

        const video = videoRes.data.items[0];
        if (!video) return;

        setViewCount(video.statistics?.viewCount || "0");

        const channelId = video.snippet?.channelId;
        if (channelId) {
          const channelRes = await axios.get("https://www.googleapis.com/youtube/v3/channels", {
            params: {
              part: "snippet",
              id: channelId,
              key: YOUTUBE_API_KEY,
            },
          });

          const channelPic = channelRes.data.items[0]?.snippet?.thumbnails?.default?.url;
          setChannelImage(channelPic || "");
        }

        const rawDuration = video.contentDetails?.duration;
        if (rawDuration) {
          setDuration(formatDuration(rawDuration));
        }
      } catch (err) {
        console.error("Error fetching video/channel data", err);
      }
    };

    fetchExtraDetails();
  }, [song]);

  return (
    <div style={styles.card}>
      <a href="#" onClick={onPlay} style={{ position: "relative" }}>
        {thumbnail && <img src={thumbnail} alt={song.title} style={styles.image} />}
        {duration && <span style={styles.duration}>{duration}</span>}
      </a>

      <div style={{ flexGrow: 1 }}>
        <h4 className=" two-line-clamp">{song.title}</h4>

        <div style={styles.channelRow}>
          {channelImage && (
            <img src={channelImage} alt="Channel" style={styles.channelImage} />
          )}
          <p style={styles.artist}>{song.artist}</p>
        </div>

        {viewCount && (
          <p style={styles.views}>
            👁️ {formatViews(viewCount)} views • ⏱️{" "}
            {timeAgo(song.snippet?.publishedAt)}
          </p>
        )}
      </div>
    </div>
  );
};

const styles = {
  card: {
    padding: "15px",
    borderRadius: "8px",
    // marginBottom: "15px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    background: "#000000",
  },
  image: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
    borderRadius: "8px",
  },
  duration: {
    position: "absolute",
    bottom: "8px",
    right: "8px",
    background: "rgba(0, 0, 0, 0.6)",
    color: "#fff",
    padding: "2px 6px",
    fontSize: "12px",
    fontWeight: "500",
    borderRadius: "4px",
  },
  channelRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginTop: "8px",
  },
  channelImage: {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
  },
  artist: {
    fontSize: "14px",
    fontWeight: "700",
    color: "#aaa",
    margin: 0,
  },
  views: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#aaa",
    marginTop: "4px",
  },
};

export default SongCard;
