import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import "./Enregistrement.css";

export default function Enregistrement() {
  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState(false);
  const [messageType, setMessageType] = useState("");
  const [messageText, setMessageText] = useState("");

  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    cin: "",
    societe: "",
    visitePour: "",
    motif: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nom.trim()) newErrors.nom = "Le nom est requis";
    if (!formData.prenom.trim()) newErrors.prenom = "Le prénom est requis";
    if (!formData.cin.trim()) newErrors.cin = "CIN ou Passeport est requis";
    if (!formData.societe.trim()) newErrors.societe = "La société/organisme est requis";
    if (!formData.visitePour.trim()) newErrors.visitePour = "Personne à visiter est requise";
    if (!formData.motif.trim()) newErrors.motif = "Le motif de visite est requis";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setMessageType("error");
      setMessageText("Veuillez remplir tous les champs obligatoires correctement.");
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 5000);
      return;
    }

    // Simulate form submission
    console.log("Formulaire soumis:", formData);
    setMessageType("success");
    setMessageText("Enregistrement réussi ! Le visiteur a été enregistré avec succès.");
    setShowMessage(true);

    // Reset form after 2 seconds
    setTimeout(() => {
      setFormData({
        nom: "",
        prenom: "",
        cin: "",
        societe: "",
        visitePour: "",
        motif: "",
      });
      setShowMessage(false);
    }, 3000);
  };

  const handleReset = () => {
    setFormData({
      nom: "",
      prenom: "",
      cin: "",
      societe: "",
      visitePour: "",
      motif: "",
    });
    setErrors({});
    setShowMessage(false);
  };

  return (
    <div className="enregistrement">
      <main className="enregistrement-main">
        <div className="page-header">
          <button
            className="back-button"
            onClick={() => navigate("/")}
            title="Retour à l'accueil"
          >
            <FiArrowLeft />
          </button>
          <a href="#" className="brand">
            <img className="brand-icon" src="/src/assets/logo.gif" alt="AttijariBank logo" />
          </a>
        </div>

        <div className="form-container">
          <div className="form-header">
            <h1>Enregistrement d'un Visiteur</h1>
            <p>Veuillez remplir le formulaire ci-dessous pour enregistrer un visiteur</p>
          </div>

          {showMessage && (
            <div className={`message ${messageType}`}>
              <p>{messageText}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="visitor-form">
            <div className="form-section">
              <h2 className="section-title">Informations personnelles</h2>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="nom">Nom *</label>
                  <input
                    type="text"
                    id="nom"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    className={errors.nom ? "error" : ""}
                    placeholder="Entrez le nom"
                  />
                  {errors.nom && <span className="error-message">{errors.nom}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="prenom">Prénom *</label>
                  <input
                    type="text"
                    id="prenom"
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleChange}
                    className={errors.prenom ? "error" : ""}
                    placeholder="Entrez le prénom"
                  />
                  {errors.prenom && <span className="error-message">{errors.prenom}</span>}
                </div>
              </div>

              <div className="form-group full-width centered">
                <label htmlFor="cin">CIN ou Passeport *</label>
                <input
                  type="text"
                  id="cin"
                  name="cin"
                  value={formData.cin}
                  onChange={handleChange}
                  className={errors.cin ? "error" : ""}
                  placeholder="Entrez le CIN ou numéro de passeport"
                />
                {errors.cin && <span className="error-message">{errors.cin}</span>}
              </div>
            </div>

            <div className="form-section">
              <h2 className="section-title">Informations de visite</h2>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="societe">Société / Organisme *</label>
                  <input
                    type="text"
                    id="societe"
                    name="societe"
                    value={formData.societe}
                    onChange={handleChange}
                    className={errors.societe ? "error" : ""}
                    placeholder="Entrez la société ou l'organisme"
                  />
                  {errors.societe && <span className="error-message">{errors.societe}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="visitePour">Personne à visiter *</label>
                  <input
                    type="text"
                    id="visitePour"
                    name="visitePour"
                    value={formData.visitePour}
                    onChange={handleChange}
                    className={errors.visitePour ? "error" : ""}
                    placeholder="Nom de la personne à visiter"
                  />
                  {errors.visitePour && <span className="error-message">{errors.visitePour}</span>}
                </div>
              </div>

              <div className="form-group full-width">
                <label htmlFor="motif">Motif de la visite *</label>
                <textarea
                  id="motif"
                  name="motif"
                  value={formData.motif}
                  onChange={handleChange}
                  className={errors.motif ? "error" : ""}
                  placeholder="Décrivez le motif de la visite"
                  rows="4"
                />
                {errors.motif && <span className="error-message">{errors.motif}</span>}
              </div>


            </div>

            <div className="form-actions">
              <button type="submit" className="button button-primary">
                Enregistrer
              </button>
              <button type="button" className="button button-secondary" onClick={handleReset}>
                Réinitialiser
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
