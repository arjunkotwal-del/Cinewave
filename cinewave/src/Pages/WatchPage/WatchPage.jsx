import "./WatchPage.scss";
import { useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import YouTube from "react-youtube";

const WatchPage = () => {
  const navigate = useNavigate();
  const data = useLoaderData();
  const { mediaType, title, id } = useParams();

  const isTV = mediaType === "tv";
  const [mode, setMode] = useState("stream");
  const [season, setSeason] = useState(1);
  const [episode, setEpisode] = useState(1);

  const safeTitle = encodeURIComponent(title || "CineWave");
  const vidriftParams = `title=${safeTitle}&brand=CineWave&showTitle=1`;
  const embedUrl = isTV
    ? `https://embed.vidrift.net/embed/tv/${id}/${season}/${episode}?${vidriftParams}`
    : `https://embed.vidrift.net/embed/movie/${id}?${vidriftParams}`;

  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div className="page watch">
      <header>
        <div className="watch-left">
          <FaChevronLeft
            className="return action_icon"
            onClick={() => {
              navigate(-1);
            }}
          />
          <h3>{title}</h3>
        </div>

        <div className="watch-controls">
          {mode === "stream" && isTV && (
            <div className="episode-picker">
              <label>
                S
                <input
                  type="number"
                  min={1}
                  value={season}
                  onChange={(e) => setSeason(Math.max(1, Number(e.target.value) || 1))}
                />
              </label>
              <label>
                E
                <input
                  type="number"
                  min={1}
                  value={episode}
                  onChange={(e) => setEpisode(Math.max(1, Number(e.target.value) || 1))}
                />
              </label>
            </div>
          )}

          <div className="mode-toggle" role="group" aria-label="Player source">
            <button
              type="button"
              className={mode === "stream" ? "active" : ""}
              onClick={() => setMode("stream")}
            >
              Watch Full
            </button>
            {data?.key && (
              <button
                type="button"
                className={mode === "trailer" ? "active" : ""}
                onClick={() => setMode("trailer")}
              >
                Trailer
              </button>
            )}
          </div>
        </div>
      </header>

      <div className="video-container">
        {mode === "stream" ? (
          <iframe
            key={embedUrl}
            className="vidrift-frame"
            src={embedUrl}
            title={title || "VidRift Player"}
            allowFullScreen
            allow="autoplay; fullscreen"
          />
        ) : (
          <YouTube className="yt" videoId={data?.key} opts={opts} loading="lazy" />
        )}
      </div>
    </div>
  );
};

export default WatchPage;
