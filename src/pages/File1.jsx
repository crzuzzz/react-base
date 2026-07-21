import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import "./Enregistrement.css";
import Popup from "../components/Popup";

export default function File1() {
    const navigate = useNavigate();
    const [showMessage, setShowMessage] = useState(false);
    const [messageType, setMessageType] = useState("");
    const [messageText, setMessageText] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    const [formData, setFormData] = useState({
        nom: "",
        prenom: "",
        email: "",
        motDePass: "",
        idRole: 1, // Default preset role ID
    });

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        const lettersRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ ]+$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formData.nom.trim()) {
            newErrors.nom = "Le nom est requis";
        } else if (!lettersRegex.test(formData.nom.trim())) {
            newErrors.nom = "Nom invalide : uniquement des lettres";
        }

        if (!formData.prenom.trim()) {
            newErrors.prenom = "Le prénom est requis";
        } else if (!lettersRegex.test(formData.prenom.trim())) {
            newErrors.prenom = "Prénom invalide : uniquement des lettres";
        }

        if (!formData.email.trim()) {
            newErrors.email = "L'adresse e-mail est requise";
        } else if (!emailRegex.test(formData.email.trim())) {
            newErrors.email = "Adresse e-mail invalide";
        }

        if (!formData.motDePass) {
            newErrors.motDePass = "Le mot de passe est requis";
        } else if (formData.motDePass.length < 6) {
            newErrors.motDePass = "Le mot de passe doit contenir au moins 6 caractères";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        const fieldErrors = {};
        const lettersRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ ]+$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const trimmedValue = value.trim();

        if (name === "nom") {
            if (!trimmedValue) fieldErrors.nom = "Le nom est requis";
            else if (!lettersRegex.test(trimmedValue)) fieldErrors.nom = "Nom invalide : uniquement des lettres";
        }

        if (name === "prenom") {
            if (!trimmedValue) fieldErrors.prenom = "Le prénom est requis";
            else if (!lettersRegex.test(trimmedValue)) fieldErrors.prenom = "Prénom invalide : uniquement des lettres";
        }

        if (name === "email") {
            if (!trimmedValue) fieldErrors.email = "L'adresse e-mail est requise";
            else if (!emailRegex.test(trimmedValue)) fieldErrors.email = "Adresse e-mail invalide";
        }

        if (name === "motDePass") {
            if (!value) fieldErrors.motDePass = "Le mot de passe est requis";
            else if (value.length < 6) fieldErrors.motDePass = "Le mot de passe doit contenir au moins 6 caractères";
        }

        setErrors((prev) => ({
            ...prev,
            [name]: fieldErrors[name] || "",
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            setMessageType("error");
            setMessageText("Veuillez remplir tous les champs obligatoires correctement.");
            setShowMessage(true);
            return;
        }

        const utilisateur = {
            nom: formData.nom,
            prenom: formData.prenom,
            email: formData.email,
            motDePass: formData.motDePass,
            idRole: Number(formData.idRole),
        };

        try {
            const response = await fetch("http://localhost:8080/utilisateurs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(utilisateur),
            });

            if (response.ok) {
                setShowPopup(true);
                setShowMessage(false);
                setFormData({
                    nom: "",
                    prenom: "",
                    email: "",
                    motDePass: "",
                    idRole: 1,
                });
            } else {
                setMessageType("error");
                setMessageText("Une erreur est survenue lors de l'enregistrement de l'utilisateur.");
                setShowMessage(true);
            }
        } catch (error) {
            console.error("Erreur connexion backend :", error);
            setMessageType("error");
            setMessageText("Impossible de se connecter au serveur.");
            setShowMessage(true);
        }
    };

    const closePopup = () => {
        setShowPopup(false);
        setFormData({
            nom: "",
            prenom: "",
            email: "",
            motDePass: "",
            idRole: 1,
        });
        setErrors({});
        navigate("/admin");
    };

    const handleReset = () => {
        setFormData({
            nom: "",
            prenom: "",
            email: "",
            motDePass: "",
            idRole: 1,
        });
        setErrors({});
        setShowMessage(false);
    };

    return (
        <div className="enregistrement">
            <main className="enregistrement-main" style={{ padding: "100px", maxWidth: "800px", margin: "0 auto" }}>
                <div className="page-header">
                    <button
                        className="back-button"
                        onClick={() => navigate("/admin/fonctionnalites")}
                        title="Retour aux fonctionnalités"
                    >
                        <FiArrowLeft />
                    </button>
                    <a href="#" className="brand" onClick={(e) => { e.preventDefault(); navigate("/admin"); }}>
                        <img className="brand-icon" src="/src/assets/logo.gif" alt="AttijariBank logo" />
                    </a>
                </div>

                <div className="form-container">
                    <div className="form-header">
                        <h1>Ajouter un Nouvel Utilisateur</h1>
                        <p>Veuillez remplir le formulaire ci-dessous pour inscrire un utilisateur</p>
                    </div>

                    {showMessage && (
                        <div className={`message ${messageType}`}>
                            <p>{messageText}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="visitor-form">
                        <div className="form-section">
                            <h2 className="section-title">Informations Personnelles</h2>

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
                        </div>

                        <div className="form-section">
                            <h2 className="section-title">Informations du Compte</h2>

                            <div className="form-group full-width">
                                <label htmlFor="email">Adresse E-mail *</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={errors.email ? "error" : ""}
                                    placeholder="exemple@attijari.com"
                                />
                                {errors.email && <span className="error-message">{errors.email}</span>}
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="motDePass">Mot de passe *</label>
                                    <input
                                        type="password"
                                        id="motDePass"
                                        name="motDePass"
                                        value={formData.motDePass}
                                        onChange={handleChange}
                                        className={errors.motDePass ? "error" : ""}
                                        placeholder="••••••••"
                                    />
                                    {errors.motDePass && <span className="error-message">{errors.motDePass}</span>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="idRole">Rôle Utilisateur *</label>
                                    <select
                                        id="idRole"
                                        name="idRole"
                                        value={formData.idRole}
                                        onChange={handleChange}
                                        style={{
                                            padding: "12px 16px",
                                            border: "1.5px solid var(--gray)",
                                            borderRadius: "12px",
                                            fontSize: "0.95rem",
                                            backgroundColor: "var(--white)",
                                            color: "var(--text)",
                                        }}
                                    >
                                        <option value={1}>Agent Accueil (1)</option>
                                        <option value={2}>Administrateur (2)</option>
                                        <option value={3}>Responsable Sécurité (3)</option>
                                    </select>
                                </div>
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

            <Popup
                isOpen={showPopup}
                onClose={closePopup}
                title="Utilisateur créé avec succès !"
                message="Les informations de l'utilisateur ont été enregistrées avec succès dans la base de données."
            />
        </div>
    );
}