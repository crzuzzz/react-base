import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import "./Enregistrement.css";
import Popup from "../components/Popup";

export default function Enregistrement() {
    const navigate = useNavigate();
    const [showMessage, setShowMessage] = useState(false);
    const [messageType, setMessageType] = useState("");
    const [messageText, setMessageText] = useState("");
    const [showPopup, setShowPopup] = useState(false);

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
        const lettersRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ ]+$/;
        const lettersAndSpacesRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ ]+$/;
        const cinRegex = /^\d{8}$/;

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

        if (!formData.cin.trim()) {
            newErrors.cin = "CIN est requis";
        } else if (!cinRegex.test(formData.cin.trim())) {
            newErrors.cin = "CIN invalide : exactement 8 chiffres";
        }

        if (!formData.societe.trim()) {
            newErrors.societe = "La société/organisme est requis";
        } else if (!lettersRegex.test(formData.societe.trim())) {
            newErrors.societe = "Société/organisme invalide : uniquement des lettres";
        }

        if (!formData.visitePour.trim()) {
            newErrors.visitePour = "Personne à visiter est requise";
        } else if (!lettersAndSpacesRegex.test(formData.visitePour.trim())) {
            newErrors.visitePour = "Personne à visiter invalide : uniquement des lettres et des espaces";
        }

        if (!formData.motif.trim()) {
            newErrors.motif = "Le motif de visite est requis";
        } else if (!lettersAndSpacesRegex.test(formData.motif.trim())) {
            newErrors.motif = "Motif invalide : uniquement des lettres et des espaces";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        const fieldErrors = {};
        const lettersRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ ]+$/;
        const lettersAndSpacesRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ ]+$/;
        const cinRegex = /^\d{8}$/;
        const trimmedValue = value.trim();

        if (name === "nom") {
            if (!trimmedValue) fieldErrors.nom = "Le nom est requis";
            else if (!lettersRegex.test(trimmedValue)) fieldErrors.nom = "Nom invalide : uniquement des lettres";
        }

        if (name === "prenom") {
            if (!trimmedValue) fieldErrors.prenom = "Le prénom est requis";
            else if (!lettersRegex.test(trimmedValue)) fieldErrors.prenom = "Prénom invalide : uniquement des lettres";
        }

        if (name === "cin") {
            if (!trimmedValue) fieldErrors.cin = "CIN est requis";
            else if (!cinRegex.test(trimmedValue)) fieldErrors.cin = "CIN invalide : exactement 8 chiffres";
        }

        if (name === "societe") {
            if (!trimmedValue) fieldErrors.societe = "La société/organisme est requis";
            else if (!lettersRegex.test(trimmedValue)) fieldErrors.societe = "Société/organisme invalide : uniquement des lettres";
        }

        if (name === "visitePour") {
            if (!trimmedValue) fieldErrors.visitePour = "Personne à visiter est requise";
            else if (!lettersAndSpacesRegex.test(trimmedValue)) fieldErrors.visitePour = "Personne à visiter invalide : uniquement des lettres et des espaces";
        }

        if (name === "motif") {
            if (!trimmedValue) fieldErrors.motif = "Le motif de visite est requis";
            else if (!lettersAndSpacesRegex.test(trimmedValue)) fieldErrors.motif = "Motif invalide : uniquement des lettres et des espaces";
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

    const visiteur = {
        nom: formData.nom,
        prenom: formData.prenom,
        cin: formData.cin,
        societe: formData.societe,
        visitePour: formData.visitePour,
         motif: formData.motif,
    };

  try {
    const responseVisiteur = await fetch("http://localhost:8080/visiteurs", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(visiteur)
    });

    if (responseVisiteur.ok) {
        setShowPopup(true);

        setFormData({
            nom: "",
            prenom: "",
            cin: "",
            societe: "",
            visitePour: "",
            motif: "",
        });
    }

} catch (error) {
    console.log("Erreur connexion backend :", error);
}
};
    const closePopup = () => {
        setShowPopup(false);

        setFormData({
            nom: "",
            prenom: "",
            cin: "",
            societe: "",
            visitePour: "",
            motif: "",
        });

        setErrors({});

        navigate("/fonctionnalites");
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
                        onClick={() => navigate("/fonctionnalites")}
                        title="Retour aux fonctionnalités"
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
                                <label htmlFor="cin">Numéro de CIN *</label>
                                <input
                                    type="text"
                                    id="cin"
                                    name="cin"
                                    value={formData.cin}
                                    onChange={handleChange}
                                    className={errors.cin ? "error" : ""}
                                    placeholder="Entrez le numéro de CIN"
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
            <Popup
                isOpen={showPopup}
                onClose={closePopup}
                title="Visiteur enregistré avec succès !"
                message="Les informations du visiteur ont été enregistrées avec succès."
            />

        </div>
    );
}
