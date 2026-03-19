import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/fetch";
import Toast from "../components/Toast";

function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchWatchlist();
  }, []);

  async function fetchWatchlist() {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const profileId = user.profile_id;
      const data = await api.get(`/profiles/${profileId}/watchlist`);
      setWatchlist(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleRemove(movieId) {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const profileId = user.profile_id;
      await api.delete(`/profiles/${profileId}/watchlist/${movieId}`);
      setWatchlist(watchlist.filter((item) => item.movie_id !== movieId));
      setToast("Rimosso dalla watchlist! 🗑️");
    } catch (err) {
      console.error(err);
    }
  }

  if (loading) {
    return (
      <div className="caricamento">
        Caricamento...
      </div>
    );
  }

  return (
    <div className="contenitore-watchlist">
      {toast && <Toast message={toast} onClose={() => setToast("")} />}

      <h1>
        La mia Watchlist
      </h1>

      {watchlist.length === 0 ? (
        <div className="watchlist-vuota">
          <p>
            La tua watchlist è vuota
          </p>
          <button
            onClick={() => navigate("/home")}>
            Scopri tutti i film e le serie
          </button>
        </div>
      ) : (
        <div className="watchlist-piena">
          {watchlist.map((item) => (
            <div className="contenitore" key={item.id}
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
                  `https://placehold.co/200x120/222/fff?text=${encodeURIComponent(item.title || "Film")}`
                }
                alt={item.title}
                onClick={() => navigate(`/movie/${item.movie_id}`)}
              />
              <div style={{ padding: "10px" }}>
                <p>
                  {item.title || `Film #${item.movie_id}`}
                </p>
                <button
                  onClick={() => handleRemove(item.movie_id)}>
                  Rimuovi
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Watchlist;
