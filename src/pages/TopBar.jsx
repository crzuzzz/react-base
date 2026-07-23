import "./Accueil.css";
import LogoutButton from "./LogoutButton.jsx";


export default function TopBar({ items = [], scrolled = false }) {
  return (
    <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-inner">
        <a href="#hero" className="brand">
          <img className="brand-icon" src="/src/assets/logo.gif" alt="AttijariBank logo" />
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
          <LogoutButton />
        </div>
      </div>
    </header>
  );
}

