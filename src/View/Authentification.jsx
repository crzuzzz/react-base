import { useState } from "react";
import { FiLock, FiUser } from "react-icons/fi";
import { AiFillBank } from "react-icons/ai";
import logo from "../assets/logo.gif";
import Accueil from "./Accueil";
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

function authenticateUser(formData, setIsAuthenticated) {
  window.alert(`Identifiant: ${formData.id}\nMot de passe: ${formData.password}`);
  setIsAuthenticated(true);
}


export default function Authentification() {
  const [formData, setFormData] = useState({
    id: "",
    password: "",
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    authenticateUser(formData, setIsAuthenticated);
  };

  if (isAuthenticated) {
    return <Accueil />;
  }

  return (
    <center>
    <div className="accueil auth-page">
      <main className="auth-main">
        <section className="auth-card section-card">
          <div className="auth-brand">
            
            <div>
              <img className="auth-logo" src={logo} alt="Logo Attijari" />
            </div>
          </div>

          <p className="auth-subtitle">
            Connectez-vous pour accéder à la gestion sécurisée des visiteurs.
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
