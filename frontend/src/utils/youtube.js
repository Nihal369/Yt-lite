// src/utils/youtube.js
import axios from "axios";

const YOUTUBE_API_KEY = "AIzaSyCWbQO_k4CSB1AV25Oxvws4CJ8aeEkuFEA";

// ✅ Named export (required for import { searchYouTube } ...)
export const searchYouTube = async (query) => {
  const response = await axios.get("https://www.googleapis.com/youtube/v3/search", {
    params: {
      part: "snippet",
      q: query,
      type: "video",
      videoDuration: "medium",
      maxResults: 50,
      key: YOUTUBE_API_KEY,
    },
  });

  return response.data.items;
};

// ✅ Export for Home trending page
export const getTrendingVideos = async () => {
  const response = await axios.get("https://www.googleapis.com/youtube/v3/videos", {
    params: {
      part: "snippet",
      chart: "mostPopular",
      regionCode: "IN", // You can change this as needed
      maxResults: 50,
      videoCategoryId: "10", // Category 10 = Music
      key: YOUTUBE_API_KEY,
    },
  });

  return response.data.items;
};
