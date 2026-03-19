import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Toast from "../components/Toast";
import Modal from "../components/Modal";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const [showToast, setShowToast] = useState(false);
  const [showModal, setShowModal] = useState(false);

  function handleLogout() {
    setShowModal(true);
  }

  function confirmLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setShowToast(true);
    setShowModal(false);
    setTimeout(() => navigate("/"), 1500);
  }

  return (
    <>
      {showToast && (
        <Toast
          message="Hai effettuato il logout! Arrivederci! 👋"
          onClose={() => setShowToast(false)}
        />
      )}

      {showModal && (
        <Modal
          message="Sei sicuro di voler uscire?"
          onConfirm={confirmLogout}
          onCancel={() => setShowModal(false)}
        />
      )}

      <nav className="navbar">
        <Link className="navbar-link" to={token ? "/home" : "/"}>
          NETFLIX
        </Link>
        <div className="contenotore-login">
          {/* <Link
            className="link-profili"
            to="/genres"
            style={{
              color: "#fff",
              textDecoration: "none",
              marginLeft: "2rem",
              marginRight: "2rem",
            }}
          >
            Generi
          </Link> */}
          {/* <Link className="link-watchlist" to="/watchlist">
            Watchlist
          </Link>
          <Link
            className="link-profili"
            to="/profiles"
            style={{ marginLeft: "2rem", marginRight: "2rem" }}
          >
            I miei profili
          </Link> */}
          {token ? (
            <>
              {/* <Link className="home-link" to={"/home"}>
                home
              </Link> */}
              {/* <span>{user?.email}</span> */}
              <button onClick={handleLogout}>Esci</button>
            </>
          ) : (
            <Link className="navbar-link-login" to="/login">
              Accedi
            </Link>
          )}
        </div>
      </nav>
    </>
  );
}
