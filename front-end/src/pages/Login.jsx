import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api/fetch.js";
import Toast from "../components/Toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      const data = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setShowToast(true);
      setTimeout(() => navigate("/profiles"), 1500);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <>
      {showToast && (
        <Toast message="Bentornato! 🎬" onClose={() => setShowToast(false)} />
      )}
      <div className="login">
        <div className="overlay" />

        <div className="form">
          <h1>Accedi</h1>

          {error && <p className="error">{error}</p>}

          <div style={{ marginBottom: "20px" }}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button onClick={handleSubmit}>Accedi</button>

          <p>
            Nuovo su Netflix?{" "}
            <div className="contenitore">
              <Link className="link" to="/register">
                Registrati ora
              </Link>
              <Link className="link" to="/">
                Torna alla home
              </Link>
            </div>
          </p>
        </div>
      </div>
    </>
  );
}
