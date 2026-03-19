import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../api/fetch";

export default function Generi() {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchGenres();
  }, []);

  async function fetchGenres() {
    try {
      const data = await api.get("/genres");
      setGenres(data);
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
    <div className="generi-profili">
      <h1>Generi</h1>
      <div className="contenitore">
        {genres.map((genre) => (
          <div
            className="generi"
            key={genre.id}
            onClick={() => navigate(`/genres/${genre.id}`)}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            {genre.name}
          </div>
        ))}
      </div>
      <div className="link">
        <Link className="torna-alla-home" to="/home/">
          Torna alla home
        </Link>
      </div>
    </div>
  );
}
