import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { api } from "../api/fetch.js";
import Toast from "../components/Toast.jsx";

export default function DettaglioFilm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inWatchlist, setInWatchlist] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    fetchMovie();
    checkWatchlist();
  }, [id]);

  async function fetchMovie() {
    try {
      const data = await api.get(`/movies/${id}`);
      setMovie(data);
      if (data.type === "series") {
        const eps = await api.get(`/movies/${id}/episode`);
        setEpisodes(eps);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function checkWatchlist() {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log(`user:`, user);
      const profileId = user.profile_id;
      console.log(`profile id:`, user.profile_id);
      const data = await api.get(`/profiles/${profileId}/watchlist`);
      console.log(`watchlist data:`, data);
      const isInWatchlist = data.some((item) => item.movie_id === parseInt(id));
      console.log(`isInWatchlist:`, isInWatchlist);
      setInWatchlist(isInWatchlist);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleWatchlist() {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const profileId = user.profile_id;
      await api.post(`/profiles/${profileId}/watchlist`, {
        movie_id: parseInt(id),
      });
      setInWatchlist(true);
      setToast("Aggiunto alla watchlist! ❤️");
    } catch (err) {
      setToast("Film già nella watchlist!");
    }
  }

  if (loading) {
    return <div className="caricamento">Caricamento...</div>;
  }

  if (!movie) {
    return (
      <div className="film-non-trovato">
        <p>Film non trovato</p>
        <Link className="link" to="/home">
          Clicca qui per tornare alla Home
        </Link>
      </div>
    );
  }

  return (
    <div className="dettaglio-film">
      {/* Banner */}
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
        <h1>{movie.title}</h1>
      </div>

      {/* Dettagli */}
      <div className="contenitore">
        <div className="dettaglio">
          {/* Thumbnail */}
          <img
            src={
              movie.thumbnail ||
              `https://placehold.co/300x450/222/fff?text=${encodeURIComponent(movie.title)}`
            }
            alt={movie.title}
          />

          {/* Info */}
          <div>
            <div className="info">
              <span>{movie.release_year}</span>
              <span>{movie.rating}</span>
              <span>
                {movie.type === "movie" ? `${movie.duration} min` : "Serie TV"}
              </span>
            </div>

            <p>{movie.description}</p>

            <div className="bottoni">
              <button>▶ Play</button>
              {toast && <Toast message={toast} onClose={() => setToast("")} />}
              <button
                onClick={() => handleWatchlist()}
                style={{
                  background: inWatchlist ? "#e50914" : "rgba(109,109,110,0.7)",
                  color: "#fff",
                }}
              >
                {inWatchlist ? "✓ In Watchlist" : "+ Watchlist"}
              </button>
              <button
                onClick={() => navigate(`/home/`)}
                style={{
                  background: "transparent",
                  color: "#fff",
                  border: "2px solid #fff",
                }}
              >
                ← Torna alla home
              </button>
            </div>
          </div>
        </div>

        {/* Episodi — solo per le serie */}
        {movie.type === "series" && episodes.length > 0 && (
          <div className="dettaglio-serie">
            <h2>Episodi</h2>
            <div className="contenitore-episodi">
              {episodes.map((ep) => (
                <div
                  className="episodi"
                  key={ep.id}
                  onClick={() =>
                    navigate(`/movie/${id}/episode/${ep.episode_number}`)
                  }
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#333")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "#222")
                  }
                >
                  <span className="span-1">{ep.episode_number}</span>
                  <div>
                    <p className="p-1">{ep.title}</p>
                    <p className="p-2">{ep.description}</p>
                  </div>
                  <span className="span-2">{ep.duration} min</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
