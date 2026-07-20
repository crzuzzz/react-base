import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiLock, FiUser } from "react-icons/fi";
import { AiFillBank } from "react-icons/ai";
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
    window.alert("id non valid you must choose a id from the list below");
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
            0... admin page
            1... accueil
            2...security
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
