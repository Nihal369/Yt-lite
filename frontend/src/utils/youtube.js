// src/utils/youtube.js
import axios from "axios";

const YOUTUBE_API_KEY = "AIzaSyBHKatGy3uAY5cJZil1pxMagXI9feAHK1g";
// const BASE_URL = "https://www.googleapis.com/youtube/v3/videos";

// ✅ Named export (required for import { searchYouTube } ...)
export const searchYouTube = async (query) => {
  const res = await axios.get("https://www.googleapis.com/youtube/v3/search", {
    params: {
      part: "snippet",
      q: query,
      type: "video",
      maxResults: 55,
      key: YOUTUBE_API_KEY,
    },
  });

  // Return videoId inside a simple structure
  return res.data.items
    .filter((item) => item.id.kind === "youtube#video")
    .map((item) => ({
      id: item.id.videoId,
      snippet: item.snippet,
    }));
};



// ✅ Export for Home trending page
export const getTrendingVideos = async (regionCode = "IN", categoryId = "") => {
  const params = {
    part: "snippet",
    chart: "mostPopular",
    regionCode,
    maxResults: 100,
    key: YOUTUBE_API_KEY,
  };
  if (categoryId) {
    params.videoCategoryId = categoryId;  // ✅ apply the filter only if provided
  }

  const response = await axios.get(
    "https://www.googleapis.com/youtube/v3/videos",
    { params }
  );

  return response.data.items;
};
