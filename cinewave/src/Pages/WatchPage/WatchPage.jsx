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
  const [source, setSource] = useState("vidsrc");
  const [season, setSeason] = useState(1);
  const [episode, setEpisode] = useState(1);

  const vidsrcUrl = isTV
    ? `https://vidsrc.mov/embed/tv/${id}/${season}/${episode}`
    : `https://vidsrc.mov/embed/movie/${id}`;

  const vidmarioQuery = isTV
    ? "primarycolor=e50914&iconcolor=ffffff&autonext=true"
    : "primarycolor=e50914&iconcolor=ffffff";
  const vidmarioUrl = isTV
    ? `https://player.vidmario.net/embed/tv/${id}/${season}/${episode}?${vidmarioQuery}`
    : `https://player.vidmario.net/embed/movie/${id}?${vidmarioQuery}`;

  const embedUrl = source === "vidmario" ? vidmarioUrl : vidsrcUrl;

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
          {source !== "trailer" && isTV && (
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
              className={source === "vidsrc" ? "active" : ""}
              onClick={() => setSource("vidsrc")}
            >
              Server 1
            </button>
            <button
              type="button"
              className={source === "vidmario" ? "active" : ""}
              onClick={() => setSource("vidmario")}
            >
              Server 2
            </button>
            {data?.key && (
              <button
                type="button"
                className={source === "trailer" ? "active" : ""}
                onClick={() => setSource("trailer")}
              >
                Trailer
              </button>
            )}
          </div>
        </div>
      </header>

      <div className="video-container">
        {source !== "trailer" ? (
          <iframe
            key={embedUrl}
            className="player-frame"
            src={embedUrl}
            title={title || "Video Player"}
            allowFullScreen
            allow="autoplay; fullscreen; picture-in-picture"
          />
        ) : (
          <YouTube className="yt" videoId={data?.key} opts={opts} loading="lazy" />
        )}
      </div>
    </div>
  );
};

export default WatchPage;
