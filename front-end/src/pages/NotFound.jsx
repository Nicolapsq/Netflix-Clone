import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="not-found">
      <h1>404</h1>
      <h2>Pagina non trovata</h2>
      <p>La pagina che stai cercando non esiste o è stata rimossa.</p>
      <div>
        <button className="btn-torna-indietro" onClick={() => navigate(-1)}>
          ← Torna indietro
        </button>
        <button className="btn-homepage" onClick={() => navigate("/")}>
          🏠 Homepage
        </button>
      </div>
    </div>
  );
}
