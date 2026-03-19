import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/fetch";

export default function SelezioneProfili() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    fetchProfiles();
  }, []);

  async function fetchProfiles() {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const data = await api.get(`/users/${user.id}/profiles`);
      setProfiles(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function handleSelectProfile(profile) {
    // Salva il profilo selezionato nel localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    localStorage.setItem(
      "user",
      JSON.stringify({
        ...user,
        profile_id: profile.id,
        profile_name: profile.name,
      }),
    );
    navigate("/home");
  }

  if (loading) {
    return <div className="caricamento">Caricamento...</div>;
  }

  return (
    <div className="selezione-profili">
      <h1>Chi sta guardando?</h1>

      <div className="contenitore">
        {profiles.map((profile) => (
          <div
            className="profili"
            key={profile.id}
            onClick={() => handleSelectProfile(profile)}
          >
            <div
              className="avatar"
              style={{
                background: profile.avatar ? "transparent" : "#e50914",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.border = "3px solid #fff")
              }
              onMouseLeave={(e) => (e.currentTarget.style.border = "none")}
            >
              {profile.avatar ? (
                <img src={profile.avatar} alt={profile.name} />
              ) : (
                "👤"
              )}
            </div>
            <span className="nome-profilo">{profile.name}</span>
            {profile.is_kids === 1 && <span className="kids">Kids</span>}
          </div>
        ))}

        {/* Aggiungi profilo */}
        <div
          className="aggiungi-profilo"
          onClick={() => navigate("/profiles/manage")}
        >
          <div
            className="nuovo-profilo"
            onMouseEnter={(e) =>
              (e.currentTarget.style.border = "3px solid #fff")
            }
            onMouseLeave={(e) => (e.currentTarget.style.border = "none")}
          >
            ➕
          </div>
          <span>Aggiungi profilo</span>
        </div>
      </div>

      <button onClick={() => navigate("/profiles/manage")}>
        Gestisci profili
      </button>
    </div>
  );
}
