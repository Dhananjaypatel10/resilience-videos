
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { fetchPhotos, fetchVideos } from "../api/mediaApi";

import {
  setLoading,
  setError,
  setResults,
} from "../app/features/searchSlice";

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
          console.log("Calling API photos");

          const response = await fetchPhotos(query);

          data = response.results.map((item) => ({
            id: item.id,
            type: "photos",
            title: item.alt_description || "Untitled Photo",
            thumbnail: item.urls.small,
            src: item.urls.full,
          }));

        } else if (activeTab === "videos") {
          console.log("Calling API videos");

          const response = await fetchVideos(query);

          console.log("First video:", response.hits?.[0]);

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

  return (
    <div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          gap: "10px",
          flexWrap: "wrap",
          padding: "20px",
        }}
      >
        {results.map((item) => (
          <div
            key={item.id}
            style={{
              width: "250px",
              background: "#fff",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              padding: "10px",
            }}
          >
            {item.type === "photos" ? (
              <img
                src={item.src}
                alt={item.title}
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            ) : (
              <video
                autoPlay
                muted
                loop
                poster={item.thumbnail}
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              >
                <source
                  src={item.videoUrl}
                  type="video/mp4"
                />
                Your browser does not support video playback!
              </video>
            )}

            <p style={{ color: "#222" }}>
              {item.title}
            </p>

            {item.type === "videos" && (
              <p style={{ color: "#666" }}>
                Views: {item.views}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultGrid;
