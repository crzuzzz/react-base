import "./Accueil.css";
import logo from "../assets/logo.gif";

export default function TopBar({ items = [], scrolled = false, onLogout = () => {} }) {
  return (
    <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-inner">
        <a href="#hero" className="brand">
          <img className="brand-icon" src={logo} alt="AttijariBank logo" />
        </a>

        <nav className="nav-links">
          {items.map((item, index) => (
            <a href={item.route} key={index}>
              {item.Icon && <item.Icon className="nav-icon" />}
              {item.title}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <button className="button button-primary" type="button" onClick={onLogout}>
            Déconnexion
          </button>
        </div>
      </div>
    </header>
  );
}