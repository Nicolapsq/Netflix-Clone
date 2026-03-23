import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { api } from "../api/fetch";

export default function DettaglioEpisodio() {
  const { movieId, episodeNumber } = useParams();
  const navigate = useNavigate();
  const [episode, setEpisode] = useState(null);
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEpisode();
  }, [episodeNumber]);

  async function fetchEpisode() {
    try {
      const [episodeData, movieData] = await Promise.all([
        api.get(`/movies/${movieId}/episode/${episodeNumber}`),
        api.get(`/movies/${movieId}`),
      ]);
      setEpisode(episodeData);
      setMovie(movieData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div className="caricamento">Caricamento...</div>;
  }

  if (!episode) {
    return (
      <>
        <div className="episodio-non-trovato">
          <p>Episodio non trovato</p>
          <Link className="link" to="/home">
            Clicca qui per tornare alla Home
          </Link>
        </div>
      </>
    );
  }

  return (
    <div className="dettaglio-episodio">
      {/* Banner episodio */}
      <div
        className="banner"
        style={{
          background: movie.banner
            ? `url(${movie.banner})`
            : "linear-gradient(to bottom, #333, #141414)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "60vh",
          display: "flex",
          alignItems: "flex-end",
          padding: "40px 60px",
        }}
      >
        <div>
          <p>
            {movie?.title} · Stagione {episode.season}
          </p>
          <h1>
            {episode.episode_number}. {episode.title}
          </h1>
        </div>
      </div>

      {/* Dettagli episodio */}
      <div className="contenitore-info">
        {/* Info */}
        <div className="info">
          <span>Stagione {episode.season}</span>
          <span>Episodio {episode.episode_number}</span>
          <span>{episode.duration} min</span>
        </div>

        <p
          style={{
            fontSize: "1.1rem",
            color: "#ccc",
            marginBottom: "30px",
            maxWidth: "700px",
          }}
        >
          {episode.description}
        </p>

        {/* Bottoni */}
        <div className="bottoni">
          <button>▶ Play</button>
          <button
            onClick={() => navigate(`/movie/${movieId}`)}
            style={{
              background: "transparent",
              color: "#fff",
              border: "2px solid #fff",
            }}
          >
            ← Torna alla serie
          </button>
        </div>

        {/* Video player placeholder */}
        {episode.video_url ? (
          <video className="video" controls src={episode.video_url} />
        ) : (
          <div className="video-non-disponibile">▶ Video non disponibile</div>
        )}
      </div>
    </div>
  );
}
