import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api/fetch.js";
import Toast from "../components/Toast";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [plan, setPlan] = useState("basic");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      await api.post("/auth/register", { email, password, plan });
      setShowToast(true);
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <>
      {showToast && (
        <Toast
          message="Registrazione avvenuta con successo! Benvenuto in Netflix! 🎉"
          onClose={() => setShowToast(false)}
        />
      )}
      <div className="register">
        <div className="overlay" />

        <div className="form">
          <h1 style={{ fontSize: "2rem", marginBottom: "30px" }}>Registrati</h1>

          {error && <p className="error">{error}</p>}

          <div style={{ marginBottom: "20px" }}>
            <input
              type="email"
              placeholder="Inserisci una e-mail falsa es: e-mail@esempio.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <input
              type="password"
              placeholder="Inserisci una password di almeno 6 caratteri o numeri"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <select value={plan} onChange={(e) => setPlan(e.target.value)}>
              <option value="basic">Basic</option>
              <option value="standard">Standard</option>
              <option value="premium">Premium</option>
            </select>
          </div>

          <button onClick={handleSubmit}>Registrati</button>

          <p>
            Hai già un account?{" "}
            <div className="contenitore" >
              <Link to="/login" className="link">
                Accedi
              </Link>
              <Link to="/" className="link-torna-alla-home">
                Torna alla home
              </Link>
            </div>
          </p>
        </div>
      </div>
    </>
  );
}
