import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../api/fetch";

export default function GenereDettaglio() {
  const { id } = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMoviesByGenre();
  }, [id]);

  async function fetchMoviesByGenre() {
    try {
      const data = await api.get(`/genres/${id}`);
      setMovies(data);
      console.log(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div className="caricamento">Caricamento...</div>;
  }

  return (
    <div className="dettaglio-generi">
      <button onClick={() => navigate("/genres")}>← Torna ai generi</button>

      {movies.length === 0 ? (
        <p style={{ color: "#aaa", fontSize: "1.2rem" }}>
          Nessun film trovato per questo genere
        </p>
      ) : (
        <div className="contenitore">
          {movies.map((movie) => (
            <div
              className="movie-per-dettaglio"
              key={movie.id}
              onClick={() => navigate(`/movie/${movie.id}`)}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <img
                src={
                  movie.thumbnail ||
                  `https://placehold.co/200x120/222/fff?text=${encodeURIComponent(movie.title)}`
                }
                alt={movie.title}
              />
              <p>{movie.title}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
