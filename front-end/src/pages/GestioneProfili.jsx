import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/fetch";
import Toast from "../components/Toast";
import Modal from "../components/Modal";

export default function GestioneProfili() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editProfile, setEditProfile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [profileToDelete, setProfileToDelete] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    avatar: "",
    is_kids: false,
  });
  const navigate = useNavigate();

  useEffect(() => {
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

  async function handleStore() {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      await api.post(`/users/${user.id}/profiles`, formData);
      setToast("Profilo creato con successo! 🎉");
      setShowForm(false);
      setFormData({ name: "", avatar: "", is_kids: false });
      fetchProfiles();
    } catch (err) {
      setToast("Errore durante la creazione del profilo");
    }
  }

  async function handleUpdate() {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      await api.patch(`/users/${user.id}/profiles/${editProfile.id}`, formData);
      setToast("Profilo aggiornato con successo! ✅");
      setEditProfile(null);
      setShowForm(false);
      setFormData({ name: "", avatar: "", is_kids: false });
      fetchProfiles();
    } catch (err) {
      setToast("Errore durante la modifica del profilo");
    }
  }

  async function confirmDestroy() {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      await api.delete(`/users/${user.id}/profiles/${profileToDelete}`);
      setToast("Profilo eliminato! 🗑️");
      setShowModal(false);
      setProfileToDelete(null);
      fetchProfiles();
    } catch (err) {
      setToast("Errore durante l'eliminazione del profilo");
    }
  }

  function handleDestroy(profileId) {
    setProfileToDelete(profileId);
    setShowModal(true);
  }

  {
    showModal && (
      <Modal
        message="Sei sicuro di voler eliminare questo profilo?"
        onConfirm={confirmDestroy}
        onCancel={() => setShowModal(false)}
      />
    );
  }

  function handleEdit(profile) {
    setEditProfile(profile);
    setFormData({
      name: profile.name,
      avatar: profile.avatar || "",
      is_kids: profile.is_kids === 1,
    });
    setShowForm(true);
  }

  if (loading) {
    return <div className="caricamento">Caricamento...</div>;
  }

  return (
    <div
      style={{
        background: "#141414",
        minHeight: "100vh",
        padding: "100px 60px 40px",
        color: "#fff",
      }}
    >
      {toast && <Toast message={toast} onClose={() => setToast("")} />}

      {showModal && (
        <Modal
          message="Sei sicuro di voler eliminare questo profilo?"
          onConfirm={confirmDestroy}
          onCancel={() => setShowModal(false)}
        />
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "40px",
        }}
      >
        <h1 style={{ fontSize: "2rem" }}>Gestisci profili</h1>
        <div style={{ display: "flex", gap: "15px" }}>
          <button
            onClick={() => {
              setShowForm(true);
              setEditProfile(null);
              setFormData({ name: "", avatar: "", is_kids: false });
            }}
            style={{
              padding: "10px 20px",
              background: "#e50914",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            + Nuovo profilo
          </button>
          <button
            onClick={() => navigate("/profiles")}
            style={{
              padding: "10px 20px",
              background: "transparent",
              color: "#aaa",
              border: "2px solid #aaa",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            ← Torna ai profili
          </button>
        </div>
      </div>

      {/* Form crea/modifica */}
      {showForm && (
        <div
          style={{
            background: "#222",
            padding: "30px",
            borderRadius: "10px",
            marginBottom: "40px",
            maxWidth: "500px",
          }}
        >
          <h2 style={{ marginBottom: "20px" }}>
            {editProfile ? "Modifica profilo" : "Nuovo profilo"}
          </h2>

          <div style={{ marginBottom: "15px" }}>
            <input
              type="text"
              placeholder="Nome profilo"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "5px",
                border: "none",
                background: "#333",
                color: "#fff",
                fontSize: "1rem",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <input
              type="text"
              placeholder="URL avatar (opzionale)"
              value={formData.avatar}
              onChange={(e) =>
                setFormData({ ...formData, avatar: e.target.value })
              }
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "5px",
                border: "none",
                background: "#333",
                color: "#fff",
                fontSize: "1rem",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div
            style={{
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <input
              type="checkbox"
              id="is_kids"
              checked={formData.is_kids}
              onChange={(e) =>
                setFormData({ ...formData, is_kids: e.target.checked })
              }
            />
            <label htmlFor="is_kids" style={{ color: "#aaa" }}>
              Profilo bambini
            </label>
          </div>

          <div style={{ display: "flex", gap: "15px" }}>
            <button
              onClick={editProfile ? handleUpdate : handleStore}
              style={{
                padding: "12px 25px",
                background: "#e50914",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              {editProfile ? "Salva modifiche" : "Crea profilo"}
            </button>
            <button
              onClick={() => {
                setShowForm(false);
                setEditProfile(null);
              }}
              style={{
                padding: "12px 25px",
                background: "transparent",
                color: "#aaa",
                border: "2px solid #aaa",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Annulla
            </button>
          </div>
        </div>
      )}

      {/* Lista profili */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {profiles.map((profile) => (
          <div
            key={profile.id}
            style={{
              background: "#222",
              borderRadius: "10px",
              padding: "20px",
              display: "flex",
              alignItems: "center",
              gap: "15px",
            }}
          >
            {/* Avatar */}
            <div
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "8px",
                background: profile.avatar ? "transparent" : "#e50914",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.8rem",
                overflow: "hidden",
                flexShrink: 0,
              }}
            >
              {profile.avatar ? (
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                "👤"
              )}
            </div>

            {/* Info */}
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: "bold", marginBottom: "5px" }}>
                {profile.name}
              </p>
              {profile.is_kids === 1 && (
                <span
                  style={{
                    background: "#e50914",
                    padding: "2px 8px",
                    borderRadius: "4px",
                    fontSize: "0.75rem",
                  }}
                >
                  Kids
                </span>
              )}
            </div>

            {/* Bottoni */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <button
                onClick={() => handleEdit(profile)}
                style={{
                  padding: "6px 12px",
                  background: "#333",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "0.85rem",
                }}
              >
                ✏️ Modifica
              </button>
              <button
                onClick={() => handleDestroy(profile.id)}
                style={{
                  padding: "6px 12px",
                  background: "#e50914",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "0.85rem",
                }}
              >
                🗑️ Elimina
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
