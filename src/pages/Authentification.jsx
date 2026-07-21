import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiLock, FiUser } from "react-icons/fi";
import logo from "../assets/logo.gif";
import "./Accueil.css";
import "./Auth.css";

function AuthButton({ text, type = "button" }) {
  return (
    <button className="button button-primary auth-submit" type={type}>
      {text}
    </button>
  );
}

function AuthInput({ label, type, name, value, onChange, placeholder }) {
  return (
    <label className="auth-field">
      <span>{label}</span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </label>
  );
}

function authenticateUser(formData, setIsAuthenticated, setSelectedId, navigate) {
  const allowedIds = ["0", "1", "2"];

  if (!allowedIds.includes(formData.id)) {
    window.alert("ID non valide ! Vous devez choisir un identifiant parmi la liste.");
    setIsAuthenticated(false);
    setSelectedId("");
    return;
  }

  window.localStorage.setItem("isAuthenticated", "true");
  window.localStorage.setItem("selectedId", formData.id);
  window.alert(`Identifiant: ${formData.id}\nMot de passe: ${formData.password}`);
  setSelectedId(formData.id);
  setIsAuthenticated(true);
  if (formData.id === "0") {
    navigate("/Admin");
  } else if (formData.id === "1") {
    navigate("/accueil");
  } else if (formData.id === "2") {
    navigate("/repsec");
  }
}

export default function Authentification() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: "",
    password: "",
  });
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => window.localStorage.getItem("isAuthenticated") === "true"
  );
  const [selectedId, setSelectedId] = useState(
    () => window.localStorage.getItem("selectedId") || ""
  );

  const handleLogout = () => {
    alert("Step 3: Authentification is clearing localStorage and resetting state!");
    window.localStorage.removeItem("isAuthenticated");
    window.localStorage.removeItem("selectedId");
    setSelectedId("");
    setIsAuthenticated(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    authenticateUser(formData, () => {}, () => {}, navigate);
  };

  // Safe navigation fallback: if authenticated, render based on selected ID with matching keys
  if (isAuthenticated) {
    switch (selectedId) {
      case "0":
        return <Accueil key="admin-view" onLogout={handleLogout} />;
      case "1":
        return <Accueil key="user-view" onLogout={handleLogout} />;
      case "2":
        return <RespSec key="security-view" onLogout={handleLogout} />;
      default:
        return <Accueil key="default-view" onLogout={handleLogout} />;
    }
  }

  return (
    <center>
      <div className="accueil auth-page">
        <main className="auth-main">
          <section className="auth-card section-card">
            <div className="auth-brand">
              <img className="auth-logo" src={logo} alt="Logo Attijari" />
            </div>

            <p className="auth-subtitle">
              Connectez-vous pour accéder à la gestion sécurisée des visiteurs.
              <br />
              <small style={{ opacity: 0.7 }}>0: Admin | 1: Accueil | 2: Security</small>
            </p>

            <form className="auth-form" onSubmit={handleSubmit}>
              <AuthInput
                label={<><FiUser /> Identifiant</>}
                type="text"
                name="id"
                value={formData.id}
                onChange={handleChange}
                placeholder="Votre identifiant"
              />

              <AuthInput
                label={<><FiLock /> Mot de passe</>}
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Votre mot de passe"
              />

              <AuthButton text="Se connecter" type="submit" />
            </form>
          </section>
        </main>
      </div>
    </center>
  );
}