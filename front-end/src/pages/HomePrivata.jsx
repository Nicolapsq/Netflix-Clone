import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/fetch";

function debaunce(func, delay) {
    let timeout;
    return function (value) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func(value);
        }, delay);
    };
}

export default function HomePrivata() {
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [featured, setFeatured] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const debouncedSearch = useCallback(
    debaunce((value) => {
      setSearch(value);
    }, 1000), []);
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    fetchMovies();
  }, []);

  async function fetchMovies() {
    try {
      const data = await api.get("/movies");
      const allMovies = data.filter((m) => m.type === "movie");
      const allSeries = data.filter((m) => m.type === "series");
      const featuredMovie =
        data.find((m) => m.is_featured === 1) || allMovies[0];
      setMovies(allMovies);
      setSeries(allSeries);
      setFeatured(featuredMovie);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div className="caricamento">Caricamento...</div>;
  }

  // Filtra i risultati in base alla ricerca
  const filteredMovies = movies.filter((m) =>
    m.title.toLowerCase().includes(search.toLowerCase()),
  );
  const filteredSeries = series.filter((s) =>
    s.title.toLowerCase().includes(search.toLowerCase()),
  );



  return (
    <div className="home-privata">
      {/* sezione in primo piano */}
      {featured && (
        <div
          className="featured"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.8), transparent), url(${featured.banner || featured.thumbnail})`,
          }}
        >
          <div className="contenitore">
            <h1>{featured.title}</h1>
            <p>{featured.description}</p>
            <div>
              <button className="play-button">▶ Play</button>
              <button className="info-button">ℹ️ Info</button>
            </div>
          </div>
        </div>
      )}

      {/* Barra di ricerca */}
      <div className="search">
        <input
          type="text"
          placeholder="🔍 Cerca film o serie..."
          onChange={(e) => debouncedSearch(e.target.value)}
        />
      </div>

      {/* Risultati ricerca */}
      {search && (
        <div className="risultati-ricerca">
          <h2>Risultati per "{search}"</h2>
          <div className="contenitore">
            {[...filteredMovies, ...filteredSeries].map((item) => (
              <div
                key={item.id}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <img
                  src={
                    item.thumbnail ||
                    `https://via.placeholder.com/200x120?text=${item.title}`
                  }
                  alt={item.title}
                />
                <p> {item.title} </p>
              </div>
            ))}
            {filteredMovies.length === 0 && filteredSeries.length === 0 && (
              <p style={{ color: "#aaa" }}>Nessun risultato trovato</p>
            )}
          </div>
        </div>
      )}

      {/* Sezione Film */}
      {!search && (
        <div className="sezione-film">
          <h2>Film</h2>
          <div className="contenitore-film">
            {filteredMovies.map((movie) => (
              <div
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
                    "https://via.placeholder.com/200x120?text=" + movie.title
                  }
                  alt={movie.title}
                />
                <p>{movie.title}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sezione Serie TV */}
      {!search && (
        <div className="sezione-serie">
          <h2>Serie TV</h2>
          <div className="contenitore-serie">
            {series.map((serie) => (
              <div
                key={serie.id}
                onClick={() => navigate(`/movie/${serie.id}`)}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <img
                  src={
                    serie.thumbnail ||
                    "https://via.placeholder.com/200x120?text=" + serie.title
                  }
                  alt={serie.title}
                />
                <p>{serie.title}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
