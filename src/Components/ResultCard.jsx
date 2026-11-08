import React from 'react'

const ResultCard = ({results}) => {
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
  )
}

export default ResultCard