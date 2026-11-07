import axios from "axios";

const unplash_key = import.meta.env.VITE_UNPLASH_KEY;
const coverr_key = import.meta.env.VITE_COVERR_KEY;

export async function fetchPhotos(query, page = 1, per_page = 20) {
  const response = await axios.get("https://api.unsplash.com/search/photos", {
    params: { query, page, per_page },
    headers: { Authorization: `Client-ID ${unplash_key}` },
  });
  return response.data;
}

export async function fetchVideos(query, per_page = 15) {
  const response = await axios.get("https://api.coverr.co/videos", {
    params: { query, per_page },
    headers: { Authorization: coverr_key },
  });
  return response.data;
}
