import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiLock, FiMail } from "react-icons/fi";
import logo from "../assets/logo.gif";
import "./Accueil.css";
import "./Auth.css";

function AuthButton({ text, type = "button", disabled }) {
  return (
    <button className="button button-primary auth-submit" type={type} disabled={disabled}>
      {text}
    </button>
  );
}

function AuthInput({ label, type = "text", name, value, onChange, placeholder, required = true }) {
  return (
    <label className="auth-field">
      <span>{label}</span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
    </label>
  );
}

export default function Authentification() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleNavigation = (idRole) => {
    switch (idRole) {
      case 1:
        navigate("/accueil");
        break;
      case 2:
        navigate("/admin");
        break;
      case 3:
        navigate("/repsec");
        break;
      default:
        setError("Rôle non reconnu. Veuillez contacter l'administrateur.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Direct POST request to Spring Boot authentication endpoint
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (response.ok) {
        const user = await response.json();

        // Save session state locally
        window.localStorage.setItem("isAuthenticated", "true");
        window.localStorage.setItem("user", JSON.stringify(user));

        // Redirect based on idRole
        handleNavigation(user.idRole);
      } else {
        const errorMessage = await response.text();
        setError(errorMessage || "E-mail ou mot de passe incorrect.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Impossible de contacter le serveur. Assurez-vous que le backend est démarré.");
    } finally {
      setLoading(false);
    }
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
            </p>

            {error && (
              <div className="auth-error-message" style={{ color: "#d32f2f", marginBottom: "1rem", fontWeight: "bold" }}>
                {error}
              </div>
            )}

            <form className="auth-form" onSubmit={handleSubmit}>
              <AuthInput
                label={<><FiMail /> Adresse E-mail</>}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="votre.email@attijari.com"
              />

              <AuthInput
                label={<><FiLock /> Mot de passe</>}
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Votre mot de passe"
              />

              <AuthButton 
                text={loading ? "Connexion en cours..." : "Se connecter"} 
                type="submit" 
                disabled={loading}
              />
            </form>
          </section>
        </main>
      </div>
    </center>
  );
}