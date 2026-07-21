import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiRefreshCw } from "react-icons/fi";
import "./Enregistrement.css";

export default function File2() {
    const navigate = useNavigate();
    const [journals, setJournals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchJournals = async () => {
        setLoading(true);
        setError("");
        try {
            const response = await fetch("http://localhost:8080/api/journal");
            
            if (response.ok) {
                const data = await response.json();
                console.log("Journal API Data:", data); // Check browser console (F12) to verify data

                if (Array.isArray(data)) {
                    setJournals(data);
                } else if (data._embedded && data._embedded.journals) {
                    setJournals(data._embedded.journals);
                } else {
                    setJournals([]);
                }
            } else {
                setError("Impossible de charger le journal des actions.");
            }
        } catch (err) {
            console.error("Erreur lors de la récupération du journal:", err);
            setError("Erreur de connexion avec le serveur.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJournals();
    }, []);

    const formatDate = (dateTimeString) => {
        if (!dateTimeString) return "-";
        const date = new Date(dateTimeString);
        if (isNaN(date.getTime())) return dateTimeString;
        
        return date.toLocaleString("fr-FR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        });
    };

    return (
        <div className="enregistrement">
            <main className="enregistrement-main" style={{ paddingTop: "120px" }}>
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

                <div className="form-container" style={{ maxWidth: "1000px" }}>
                    <div className="form-header">
                        <h1>Journal d'Activités</h1>
                        <p>Historique et suivi des actions effectuées sur le système</p>
                    </div>

                    <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px" }}>
                        <button
                            type="button"
                            className="button button-secondary"
                            onClick={fetchJournals}
                            style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
                        >
                            <FiRefreshCw /> Actualiser
                        </button>
                    </div>

                    {error && (
                        <div className="message error">
                            <p>{error}</p>
                        </div>
                    )}

                    {loading ? (
                        <div style={{ textAlign: "center", padding: "40px", color: "var(--muted)" }}>
                            Chargement du journal...
                        </div>
                    ) : journals.length === 0 ? (
                        <div style={{ textAlign: "center", padding: "40px", color: "var(--muted)" }}>
                            Aucune action enregistrée pour le moment.
                        </div>
                    ) : (
                        <div style={{ overflowX: "auto" }}>
                            <table
                                style={{
                                    width: "100%",
                                    borderCollapse: "collapse",
                                    textAlign: "left",
                                    fontSize: "0.95rem",
                                }}
                            >
                                <thead>
                                    <tr
                                        style={{
                                            borderBottom: "2px solid var(--gray)",
                                            color: "var(--primary)",
                                            textTransform: "uppercase",
                                            fontSize: "0.85rem",
                                            letterSpacing: "0.05em",
                                        }}
                                    >
                                        <th style={{ padding: "12px 16px" }}>ID Log</th>
                                        <th style={{ padding: "12px 16px" }}>Date & Heure</th>
                                        <th style={{ padding: "12px 16px" }}>Utilisateur</th>
                                        <th style={{ padding: "12px 16px" }}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {journals.map((item, index) => (
                                        <tr
                                            key={item.idLog || index}
                                            style={{
                                                borderBottom: "1px solid var(--border)",
                                                transition: "background 0.2s ease",
                                            }}
                                        >
                                            <td style={{ padding: "14px 16px", fontWeight: "600", color: "var(--muted)" }}>
                                                #{item.idLog ?? (index + 1)}
                                            </td>
                                            <td style={{ padding: "14px 16px", whiteSpace: "nowrap" }}>
                                                {formatDate(item.dateAction)}
                                            </td>
                                            <td style={{ padding: "14px 16px", fontWeight: "600" }}>
                                                {item.utilisateur && typeof item.utilisateur === "object"
                                                    ? `${item.utilisateur.nom || ""} ${item.utilisateur.prenom || ""}`.trim() || item.utilisateur.email
                                                    : "Système"}
                                            </td>
                                            <td style={{ padding: "14px 16px", color: "var(--text)" }}>
                                                {item.action || "-"}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}