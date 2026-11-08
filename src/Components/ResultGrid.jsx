
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { fetchPhotos, fetchVideos } from "../api/mediaApi";

import {
  setLoading,
  setError,
  setResults,
} from "../app/features/searchSlice";

import ResultCard from "./ResultCard";

const ResultGrid = () => {
  const dispatch = useDispatch();

  const { query, activeTab, results, loading, error } = useSelector(
    (store) => store.search
  );

  useEffect(() => {
    const getData = async () => {
      if (!query.trim()) {
        dispatch(setResults([]));
        dispatch(setError(null));
        return;
      }

      try {
        dispatch(setLoading(true));
        dispatch(setError(null));

        let data = [];

        if (activeTab === "photos") {
          const response = await fetchPhotos(query);

          data = response.results.map((item) => ({
            id: item.id,
            type: "photos",
            title: item.alt_description || "Untitled Photo",
            thumbnail: item.urls.small,
            src: item.urls.full,
          }));

        } else if (activeTab === "videos") {
          const response = await fetchVideos(query);

          data = response.hits.map((item) => ({
            id: item.id,
            type: "videos",
            title: item.title || "Untitled Video",
            thumbnail: item.thumbnail || item.poster,
            views: item.views,
            videoUrl: item.urls?.mp4_preview || item.urls?.mp4,
          }));
        }

        dispatch(setResults(data));

      } catch (err) {
        console.error("API Error:", err);
        dispatch(setError(err.message || "Something went wrong"));
        dispatch(setResults([]));

      } finally {
        dispatch(setLoading(false));
      }
    };

    getData();
  }, [query, activeTab, dispatch]);

  return (
    <div>
      {loading && (
        <h3 style={{ textAlign: "center" }}>
          Loading...
        </h3>
      )}

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      <ResultCard results={results} />
    </div>
  );
};

export default ResultGrid;
