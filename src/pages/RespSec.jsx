import { useEffect, useState } from "react";
import "./RespSec.css";
import TopBar from "./TopBar.jsx";
import { useNavigate } from "react-router-dom";

const statistics = [
    { label: "Présents sur site", value: "12 visiteurs" },
    { label: "Total visites aujourd'hui", value: "45 visites" },
    { label: "Visites en attente", value: "8 planifiées" },
    { label: "Alertes de sécurité", value: "0 anomalie" },
];

function NbPresentVisitors({ visits }) {
    const presentCount = visits.filter(visit => visit.status.toUpperCase() === "PRESENT").length;
    return <span>{presentCount} visiteurs</span>;
}

function NbTotalVisitsToday({ visits }) {
    const today = new Date().toISOString().split("T")[0];
    const totalToday = visits.filter(visit => visit.dateVisite === today).length;
    return <span>{totalToday} visites</span>;
}




const topBarItems = [
    { title: "Espace Responsable Sécurité", route: "" },
];


function DisplayTables({ visits }) {
    if (visits.length === 0) {
        return (
            <tbody>
            <tr>
                <td colSpan="8" style={{ textAlign: "center", padding: "20px", color: "#888" }}>
                    Aucune visite trouvée.
                </td>
            </tr>
            </tbody>
        );
    }

    return (
        <tbody>
        {visits.map((visit) => (
            <tr key={visit.idVisite}>
                <td>{visit.visiteur.nom} {visit.visiteur.prenom}</td>
                <td>{visit.visiteur.cin}</td>
                <td>{visit.visiteur.societe}</td>
                <td>{visit.dateVisite}</td>
                <td>{visit.heureDebut}</td>
                <td>{visit.heureFin ? visit.heureFin : "-"}</td>
                <td>{visit.personneVisite}</td>
                <td>
                        <span className={`resp-sec-status resp-sec-status-${visit.status.toLowerCase().replace(/\s+/g, "-")}`}>
                            {visit.status}
                        </span>
                </td>
            </tr>
        ))}
        </tbody>
    );
}

export default function RespSec({ onLogout = () => {} }) {
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);
    const [visits, setVisits] = useState([]);

    // Search and filter states
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedDate, setSelectedDate] = useState("");

    // Fetch visits from the backend
    useEffect(() => {
        fetch("http://localhost:8080/visites")
            .then((response) => response.json())
            .then((data) => {
                setVisits(data);
            })
            .catch((error) => {
                console.error("Erreur de récupération des visites:", error);
            });
    }, []);

    // Handle scroll behavior for TopBar
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 24);
        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        document.title = "Espace Responsable Sécurité - AttijariBank";
    }, []);

    // Optional: If you want the submit button to explicitly apply the date from the input
    const handleFilterSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        setSelectedDate(formData.get("date-visite"));
    };

    // Reset date filter
    const handleResetDate = () => {
        setSelectedDate("");
    };

    // Combine both Search & Filter operations
    const filteredVisits = visits.filter((visit) => {
        // 1. Filter by Date (if a date is selected)
        if (selectedDate && visit.dateVisite !== selectedDate) {
            return false;
        }

        // 2. Filter by Search Query (Nom, Prénom, CIN, or Société)
        if (searchQuery.trim() !== "") {
            const query = searchQuery.toLowerCase();
            const fullName = `${visit.visiteur.nom} ${visit.visiteur.prenom}`.toLowerCase();
            const cin = visit.visiteur.cin.toLowerCase();
            const societe = visit.visiteur.societe.toLowerCase();

            return fullName.includes(query) || cin.includes(query) || societe.includes(query);
        }

        return true;
    });

    return (
        <div className="resp-sec">
            <TopBar
                items={topBarItems}
                scrolled={scrolled}
                onLogout={() => {
                    onLogout();
                }}
            />

            <main className="resp-sec-main">

                <section className="resp-sec-section" id="statistiques">
                    <div className="section-card">
                        <div className="resp-sec-section-head">
                            <span className="section-label">Consulter les statistiques</span>
                            <h2>Tableau de bord de sécurité</h2>
                            <p>Les indicateurs clés donnent une lecture rapide de l’activité du jour et des points d’attention.</p>
                        </div>

                        <div className="resp-sec-stats-grid">
                            <article className="resp-sec-stat" >
                                <span className="resp-sec-stat-label">Nombre De Visiteur peresent</span>
                                <strong> <NbPresentVisitors visits={visits} /> </strong>
                            </article>

                            <article className="resp-sec-stat" >
                                <span className="resp-sec-stat-label">Nombre De Visiteur Aujourd'hui</span>
                                <strong> <NbTotalVisitsToday visits={visits} /> </strong>
                            </article>

                        </div>
                    </div>
                </section>

                <section className="resp-sec-section" id="recherche">
                    <div className="section-card">
                        <div className="resp-sec-section-head">
                            <span className="section-label">Rechercher et filtrer</span>
                            <h2>Filtrer rapidement les visites</h2>
                            <p>Recherchez un visiteur ou sélectionnez une date spécifique.</p>
                        </div>

                        {/* Combined Search Bar & Date Filter Form */}
                        <form className="resp-sec-form" onSubmit={handleFilterSubmit} style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
                            <label className="resp-sec-field" htmlFor="search-visite" style={{ flex: '1', minWidth: '200px' }}>
                                <span>Rechercher par nom, CIN, société...</span>
                                <input
                                    type="text"
                                    id="search-visite"
                                    placeholder="Ex: Ahmed, 12345678..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </label>

                            <label className="resp-sec-field" htmlFor="date-visite" style={{ minWidth: '180px' }}>
                                <span>Sélectionner une date</span>
                                <input
                                    type="date"
                                    id="date-visite"
                                    name="date-visite"
                                    value={selectedDate}
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                />
                            </label>

                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button className="button button-primary" type="submit">
                                    Filtrer
                                </button>
                                {selectedDate && (
                                    <button className="button" type="button" onClick={handleResetDate} style={{ background: '#eee', border: '1px solid #ccc', cursor: 'pointer', padding: '10px 15px', borderRadius: '4px' }}>
                                        Réinitialiser la date
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </section>

                <section className="resp-sec-section" id="liste-visites">
                    <div className="section-card">
                        <div className="resp-sec-section-head">
                            <span className="section-label">Consulter toutes les visites</span>
                            <h2>Historique complet {filteredVisits.length !== visits.length && `(${filteredVisits.length} trouvé(s))` }</h2>
                            <p>Un aperçu structuré de toutes les visites enregistrées avec leur statut actuel.</p>
                        </div>

                        <div className="resp-sec-table-wrap">
                            <table className="resp-sec-table">
                                <thead>
                                <tr>
                                    <th>Nom du visiteur</th>
                                    <th>CIN</th>
                                    <th>Société</th>
                                    <th>Date de visite</th>
                                    <th>Heure début</th>
                                    <th>Heure fin</th>
                                    <th>Employé référent</th>
                                    <th>Statut</th>
                                </tr>
                                </thead>
                                <DisplayTables visits={filteredVisits} />
                            </table>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="resp-sec-footer">
                <p>&copy; 2026 AttijariBank - Système de Gestion des Visiteurs</p>
            </footer>
        </div>
    );

}