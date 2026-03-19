import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <div className="contenitore">
        {/* Logo */}
        {/* <p className="header" >
          NETFLIX
        </p> */}

        {/* Links */}
        <div className="links">
          <Link className="link-home" to="/home">
            Home
          </Link>
          <Link className="link-generi-footer" to="/genres">
            Generi
          </Link>
          <Link className="link-watchlist" to="/watchlist">
            Watchlist
          </Link>
          <Link className="link-profili-footer" to="/profiles">
            Profili
          </Link>
        </div>

        {/* Copyright */}
        <p className="copyright">
          © {new Date().getFullYear()}
          Netflix Clone — Progetto portfolio di Nicola Pasqua
        </p>
      </div>
    </footer>
  );
}
